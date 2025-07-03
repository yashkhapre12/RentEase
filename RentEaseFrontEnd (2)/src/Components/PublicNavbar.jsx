import React from "react";
import { Link } from "react-router-dom";
import "../styles/PublicNavBar.css"; // Import the CSS file for custom styles

const PublicNavBar = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand text-white">RentEase</Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link text-white">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link text-white">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link text-white">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default PublicNavBar;