import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Welcome to PrognosisIQ</h1>

      <nav>
        <Link to="/features">Features</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/contact">Contact</Link> |{" "}
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </div>
  );
}

export default Home;
