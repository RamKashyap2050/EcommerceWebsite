import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Buffer } from "buffer";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";

const ManageUsers = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const adminDataString = localStorage.getItem("AdminData");
  const adminData = adminDataString ? JSON.parse(adminDataString) : null;
  useEffect(() => {
    console.log("useEffect triggered with user:", adminData);
    if (!adminData) {
      navigate("/loginadmin");
    }
  }, [adminData, navigate]);

  // This will fetch all users for Admin for Blocking and Unblocking Purposes
  useEffect(() => {
    Axios.get("http://localhost:3030/Admin/getusers").then((response) => {
      setResults(response.data);
      console.log(response.data);
    });
  }, []);

  const imageUrls = results.map((user) => {
    const imageBuffer = user?.image?.data;
    if (!imageBuffer) {
      return null;
    }
    const base64String = Buffer.from(imageBuffer).toString("base64");
    const imageUrl = `data:image/jpeg;base64,${base64String}`;
    return imageUrl;
  });

  const handleBlockUser = (id) => {
    // Handle blocking user with the given id
    console.log("Block user with id:", id);
  };

  const handleUnblockUser = (id) => {
    // Handle unblocking user with the given id
    console.log("Unblock user with id:", id);
  };

  return (
    <>
      <AdminNavbar />
      <div className="results">
        <h1 className="brand">List of Users</h1>
        Total Users {results.length} :-
        <div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Profile Photo</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((val, key) => (
                  <TableRow key={key}>
                    {imageUrls.map((imageUrl, index) =>
                      index === key ? (
                        <TableCell key={index}>
                          {imageUrl && (
                            <img
                              className="Dashboardprofilephoto"
                              src={imageUrl}
                              alt="User profile"
                            />
                          )}
                        </TableCell>
                      ) : null
                    )}
                    <TableCell>{val.user_name}</TableCell>
                    <TableCell>{val.email}</TableCell>
                    <TableCell>{val.phone}</TableCell>
                    <TableCell>
                      {val.AccountStatus ? (
                        <Button
                          className="btn-danger"
                          variant="contained"
                          color="secondary"
                          onClick={() => handleBlockUser(val._id)}
                        >
                          Block
                        </Button>
                      ) : (
                        <Button
                          className="btn-primary"
                          variant="contained"
                          color="primary"
                          onClick={() => handleUnblockUser(val._id)}
                        >
                          Unblock
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <br />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ManageUsers;
