import React from "react";
import { FaUser } from "react-icons/fa";
import Logo from '../error.jpg'
const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h1 className="title"><FaUser /> Guest Mode.</h1>
      <p className="description">
        Please Login to view your Details
      </p>
      <img src={Logo} alt="404 Error" className="image" />
      <a href="/" className="home-link">
        Go back to the homepage
      </a>
    </div>
  );
};

export default NotFoundPage;
