import React from "react";
import AdminSidebar from "../components/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../components/Footer";
const AdminDashboard = () => {
    const AdminData = localStorage.getItem("AdminData")
    console.log(AdminData)
    const navigate = useNavigate()
    useEffect(() => {
        if (!AdminData) {
          navigate('/loginadmin');
        }
      }, [AdminData, navigate]);

  return (
    <div>
        <AdminSidebar/>
      <h1>Admin Dashboard</h1>
      <Footer/>
    </div>
  );
};

export default AdminDashboard;
