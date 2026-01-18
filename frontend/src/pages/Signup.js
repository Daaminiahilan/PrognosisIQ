import React, { useState } from 'react';

const Signup = () => {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '' });

  const handleChange = e => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Signed up as ${credentials.name}`);
  };

  return (
    <div className="card">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={credentials.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={credentials.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={credentials.password} onChange={handleChange} required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
