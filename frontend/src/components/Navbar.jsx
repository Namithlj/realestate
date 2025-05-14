import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional CSS for styling and animation

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/" className="navbar-link">Home</Link></li>
        <li><Link to="/add-property" className="navbar-link">Add Property</Link></li>
        <li><Link to="/buy-property" className="navbar-link">Buy Property</Link></li>
        <li><Link to="/customer-service" className="navbar-link">Customer Service</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
