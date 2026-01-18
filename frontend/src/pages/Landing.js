import React from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px" }}>
      <h1>PrognosisIQ</h1>
      <p>AI-powered disease prediction with explainability</p>

      <button onClick={() => navigate("/login")}>
        Get Started
      </button>
    </div>
  );
}

export default Landing;
