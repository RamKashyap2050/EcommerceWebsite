import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="mt-5 bg-light text-center text-lg-start">
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2020 Copyright:
          <a className="text-dark" href="https://mdbootstrap.com/">
            @EasyShop.com
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
