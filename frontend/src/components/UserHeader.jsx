import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaList,
  FaSignOutAlt,
  FaHeart,
  FaFileAlt,
} from "react-icons/fa";
import Logo from "../Logo.jpg";
import "../styles/AdminNavbar.css";

const UserHeader = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("UserData"));

  const handleLogout = () => {
    localStorage.removeItem("UserData");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-smoky-white">
      <a className="navbar-brand" href="/" style={{ fontWeight: "bolder" }}>
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
          <li className="nav-item">
            <a className="nav-link" href="/userprofile">
              <FaUser className="mr-1" />{" "}
              {userData ? userData.user_name : "Guest"}
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/userwishlist">
              <FaHeart className="mr-1" /> Wishlist
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/userorders">
              <FaFileAlt className="mr-1" /> Orders
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default UserHeader;
