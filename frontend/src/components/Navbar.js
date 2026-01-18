import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ backgroundColor: 'var(--primary-color)', padding: '15px' }}>
    <Link to="/" style={{ marginRight: '15px', color: 'white' }}>Home</Link>
    <Link to="/features" style={{ marginRight: '15px', color: 'white' }}>Features</Link>
    <Link to="/about" style={{ marginRight: '15px', color: 'white' }}>About</Link>
    <Link to="/contact" style={{ marginRight: '15px', color: 'white' }}>Contact</Link>
    <Link to="/login" style={{ marginRight: '15px', color: 'white' }}>Login</Link>
    <Link to="/signup" style={{ marginRight: '15px', color: 'white' }}>Signup</Link>
    <Link to="/mlforecast" style={{ marginRight: '15px', color: 'white' }}>Forecast</Link>
    <Link to="/dashboard" style={{ color: 'white' }}>Dashboard</Link> {/* New Dashboard link */}
  </nav>
);

export default Navbar;
