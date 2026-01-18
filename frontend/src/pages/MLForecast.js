import Papa from "papaparse";

// organName: "brain", "heart", "liver", "kidney", "lungs", "stomach"
export const getPatientForecast = async (organName = "brain") => {
  return new Promise((resolve, reject) => {
    const filePath = `${process.env.PUBLIC_URL}/datasets/${organName}.csv`;

    Papa.parse(filePath, {
      download: true,
      header: true,
      complete: (results) => {
        const now = new Date();

        const data = results.data.map((row) => {
          const currentScore = parseFloat(row.currentScore);
          const risk =
            currentScore > 70 ? "high" : currentScore > 40 ? "medium" : "low";

          const forecast = Array.from({ length: 7 }, () =>
            Math.max(0, Math.min(100, currentScore + Math.floor(Math.random() * 10 - 5)))
          );

          const forecastDates = Array.from({ length: 7 }, (_, i) =>
            new Date(now.getFullYear(), now.getMonth(), now.getDate() + i + 1).toISOString()
          );

          return {
            name: row.name,
            gender: row.gender,
            currentScore,
            risk,
            lastUpdate: now.toISOString(),
            forecast,
            forecastDates,
          };
        });

        resolve(data);
      },
      error: (err) => reject(err),
    });
  });
};
