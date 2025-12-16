import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slice"; // Import logout action
import { useNavigate, Link } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaComments, FaBuilding } from "react-icons/fa";
import "../styles/Navbar.css"; // Import the unified CSS file

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
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="navbar-brand">
          <FaBuilding className="text-primary" />
          RentEase
        </Link>

        <ul className="navbar-nav">
          <li className="nav-item">
            <div className="user-profile">
              <FaUserCircle size={18} />
              <span>{username}</span>
            </div>
          </li>
          <li className="nav-item">
            <button className="btn btn-primary" onClick={() => navigate("/chats")}>
              <FaComments /> My Chats
            </button>
          </li>
          <li className="nav-item">
            <button className="btn btn-danger" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default PrivateNavBar;