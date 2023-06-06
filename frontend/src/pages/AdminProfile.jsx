import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import Logo from "../Logo.jpg";
import "../styles/AdminProfile.css";
const AdminProfile = () => {
  const adminDataString = localStorage.getItem("AdminData");
  const adminData = adminDataString ? JSON.parse(adminDataString) : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminData) {
      navigate("/loginadmin");
    }
  }, [adminData, navigate]);

  return (
    <div>
      <AdminNavbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={Logo} alt="hello" className="admin-dashboard-photo" />
      </div>

      <div style={{ maxWidth: "60%", margin: "4rem auto" }}>
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">Admin Profile</h1>
            {adminData && (
              <>
                <p>
                  <strong>Name:</strong> {adminData.user_name}
                </p>
                <p>
                  <strong>Email:</strong> {adminData.email}
                </p>
                <p>
                  <strong>Phone:</strong> {adminData.phone}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
