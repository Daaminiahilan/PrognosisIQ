import React, { useEffect, useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./Dashboard.css";
import { getPatientForecast } from "../MLForecast";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [patientData, setPatientData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState("day");
  const [organ, setOrgan] = useState("brain");

  useEffect(() => {
    setLoading(true);
    getPatientForecast(organ)
      .then((data) => {
        setPatientData(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [organ]);

  if (loading) return <p>Loading dashboard data...</p>;

  const filterByTime = (data, filter) => {
    const now = new Date();
    return data.filter((p) => {
      const updated = new Date(p.lastUpdate);
      switch (filter) {
        case "day":
          return updated >= new Date(now.setDate(now.getDate() - 1));
        case "week":
          return updated >= new Date(now.setDate(now.getDate() - 7));
        case "month":
          return updated >= new Date(now.setMonth(now.getMonth() - 1));
        case "year":
          return updated >= new Date(now.setFullYear(now.getFullYear() - 1));
        default:
          return true;
      }
    });
  };

  const filteredData = filterByTime(patientData, timeFilter);

  // Line chart for disease progression
  const lineChartData = {
    labels: filteredData.map((p) => p.name),
    datasets: [
      {
        label: "Disease Progression Score",
        data: filteredData.map((p) => p.currentScore),
        borderColor: "#008080",
        backgroundColor: "rgba(0,128,128,0.2)",
        tension: 0.4,
      },
    ],
  };

  // Bar chart for risk distribution
  const barChartData = {
    labels: ["Low Risk", "Medium Risk", "High Risk"],
    datasets: [
      {
        label: "Patients",
        data: [
          filteredData.filter((p) => p.risk === "low").length,
          filteredData.filter((p) => p.risk === "medium").length,
          filteredData.filter((p) => p.risk === "high").length,
        ],
        backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
      },
    ],
  };

  // Pie chart for gender distribution
  const pieChartData = {
    labels: ["Male", "Female", "Other"],
    datasets: [
      {
        label: "Patient Gender",
        data: [
          filteredData.filter((p) => p.gender === "male").length,
          filteredData.filter((p) => p.gender === "female").length,
          filteredData.filter((p) => p.gender === "other").length,
        ],
        backgroundColor: ["#008080", "#26a69a", "#80cbc4"],
      },
    ],
  };

  // Forecast chart (next 7 days)
  const forecastLineData = {
    labels: filteredData[0]?.forecastDates.map((date) =>
      new Date(date).toLocaleDateString()
    ),
    datasets: filteredData.map((p, idx) => ({
      label: p.name,
      data: p.forecast,
      borderColor: `hsl(${idx * 50},70%,40%)`,
      backgroundColor: "transparent",
      tension: 0.4,
    })),
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Patient Dashboard</h1>

      {/* Filters */}
      <div className="filter-section">
        <label>Select Organ:</label>
        <select value={organ} onChange={(e) => setOrgan(e.target.value)}>
          <option value="brain">Brain</option>
          <option value="heart">Heart</option>
          <option value="kidney">Kidney</option>
          <option value="liver">Liver</option>
          <option value="lungs">Lungs</option>
          <option value="stomach">Stomach</option>
        </select>

        <label style={{ marginLeft: "20px" }}>View By:</label>
        <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card total-patients">
          <h3>Total Patients</h3>
          <p>{filteredData.length}</p>
        </div>
        <div className="card high-risk">
          <h3>High Risk</h3>
          <p>{filteredData.filter((p) => p.risk === "high").length}</p>
        </div>
        <div className="card medium-risk">
          <h3>Medium Risk</h3>
          <p>{filteredData.filter((p) => p.risk === "medium").length}</p>
        </div>
        <div className="card low-risk">
          <h3>Low Risk</h3>
          <p>{filteredData.filter((p) => p.risk === "low").length}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart">
          <h3>Disease Progression Over Patients</h3>
          <Line data={lineChartData} />
        </div>
        <div className="chart">
          <h3>Risk Distribution</h3>
          <Bar data={barChartData} />
        </div>
        <div className="chart">
          <h3>Patient Gender Distribution</h3>
          <Pie data={pieChartData} />
        </div>
        <div className="chart">
          <h3>Next 7 Days Forecast</h3>
          <Line data={forecastLineData} />
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="recent-table">
        <h3>Recent Patient Activity</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Progression Score</th>
              <th>Risk</th>
              <th>Last Update</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((p, index) => {
              let rowClass =
                p.risk === "high"
                  ? "high-risk-row"
                  : p.risk === "medium"
                  ? "medium-risk-row"
                  : "low-risk-row";

              return (
                <tr key={index} className={rowClass}>
                  <td>{p.name}</td>
                  <td>{p.currentScore}</td>
                  <td>{p.risk}</td>
                  <td>{new Date(p.lastUpdate).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
