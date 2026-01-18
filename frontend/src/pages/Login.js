import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Demo credentials
    if (username === "admin" && password === "admin123") {
      navigate("/home");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>🔐 Sign In</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Sign In</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p style={{ marginTop: "10px" }}>
        Demo login: <b>admin / admin123</b>
      </p>
    </div>
  );
}

export default Login;
