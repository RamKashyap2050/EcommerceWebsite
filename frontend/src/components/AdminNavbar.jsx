import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaList,
  FaClipboardList,
  FaPlus,
  FaSignOutAlt,
  FaUsers,
  FaCog
} from "react-icons/fa";
import Logo from "../Logo.jpg";
import "../styles/AdminNavbar.css";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("AdminData");
    navigate("/loginadmin");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-smoky-white">
      <a
        className="navbar-brand"
        href="/admindashboard"
        style={{ fontWeight: "bolder" }}
      >
        <img src={Logo} alt="Logo" className="mr-2 brand-logo-navbar" />
        EasyShop
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#admin-navbar-nav"
        aria-controls="admin-navbar-nav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="admin-navbar-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="/"
              id="admin-settings-dropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <FaCog className="mr-1" /> Options
            </a>
            <div
              className="dropdown-menu"
              aria-labelledby="admin-settings-dropdown"
            >
              <a className="dropdown-item" href="/adminprofile">
                <FaUser className="mr-1" /> Profile
              </a>
              <a className="dropdown-item" href="/adminaddcategory">
                <FaPlus className="mr-1" /> Add a Category
              </a>
              <a className="dropdown-item" href="/adminaddproduct">
                <FaPlus className="mr-1" /> Add a New Product
              </a>
              <a className="dropdown-item" href="/adminmanageinventory">
                <FaUsers className="mr-1" /> Manage Inventory
              </a>
              <a className="dropdown-item" href="/adminprofile">
                <FaUsers className="mr-1" /> Manage Users
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" onClick={handleLogout}>
                <FaSignOutAlt className="mr-1" /> Logout
              </a>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/adminDashboard">
              <FaList className="mr-1" /> Dashboard
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;
