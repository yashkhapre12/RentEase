import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSignInAlt, FaUserPlus, FaBuilding } from "react-icons/fa";
import "../styles/Navbar.css"; // Import the unified CSS file

const PublicNavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="navbar-brand">
          <FaBuilding className="text-primary" />
          RentEase
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="btn btn-secondary"> {/* Style as button */}
              <FaHome /> Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="btn btn-secondary">
              <FaSignInAlt /> Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="btn btn-primary">
              <FaUserPlus /> Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default PublicNavBar;