import React from "react";
import NotFoundPage from "../components/404";
import UserHeader from "../components/UserHeader";
import Footer from "../components/Footer";

const Wishlist = () => {
  const userData = JSON.parse(localStorage.getItem("UserData"));

  return (
    <div>
      <UserHeader />
      {userData ? null : <NotFoundPage />}
      <Footer />
    </div>
  );
};

export default Wishlist;
