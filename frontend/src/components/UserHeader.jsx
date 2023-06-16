import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaList,
  FaSignOutAlt,
  FaHeart,
  FaFileAlt,
  FaShoppingCart,
  FaSignInAlt,
} from "react-icons/fa";
import Logo from "../Logo.jpg";
import "../styles/AdminNavbar.css";

const UserHeader = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("UserData"));

  const handleLogout = () => {
    localStorage.removeItem("UserData");
    navigate("/")
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
              {userData ? (
                <>
                  <FaUser className="mr-1" />
                  {userData.user_name}
                </>
              ) : null}
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/userwishlist">
              <FaHeart className="mr-1" /> Wishlist
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/usercart">
              <FaShoppingCart className="mr-1" /> Cart
            </a>
          </li>
          <li className="nav-item">
            {userData ? (
              <a className="nav-link" onClick={handleLogout}>
                <FaSignOutAlt className="mr-1" /> Logout
              </a>
            ) : (
              <a className="nav-link" href="/login">
                <FaSignInAlt className="mr-1" /> Login
              </a>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default UserHeader;
