import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slice"; // Import logout action
import { useNavigate } from "react-router-dom";
import "../styles/PrivateNavBar.css"; // Import the CSS file

const PrivateNavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.logged.username) || "User"; // Get username

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      dispatch(logout());
      navigate("/"); // Redirect to home after logout
    }
  };

  return (
    <nav className="navbar navbar-expand-sm bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand">Welcome, {username}!</span>
        <ul className="navbar-nav">
          <li className="nav-item">
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default PrivateNavBar;