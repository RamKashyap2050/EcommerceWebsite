import React, { useState, useEffect } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { Card, CardContent, Typography } from "@material-ui/core";
import UserHeader from "../components/UserHeader";
import Footer from "../components/Footer";
import ProfilePhoto from "../ProfilePhoto.jpg";
import AddAPhotoSharpIcon from "@mui/icons-material/AddAPhotoSharp";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  AccountCircle,
  ShoppingCart,
  Favorite,
  LocalOffer,
  Mail,
  ExitToApp,
} from "@mui/icons-material";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import NotFoundPage from "../components/404";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("UserData"));
    setUserData(storedUserData);
  }, []);

  function handleLogout() {
    localStorage.removeItem("UserData");
    navigate("/login");
  }
  const [selectedFile, setSelectedFile] = useState(null);
  console.log(selectedFile);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const formData = new FormData();
      formData.append("profilePhoto", file);

      try {
        const response = await axios.put(
          `http://localhost:3030/Users/updateprofilephoto/${userData._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data) {
          const updatedUserData = { ...userData, ...response.data };
          console.log(updatedUserData);
          setUserData(updatedUserData, () => {
            console.log(userData);
            localStorage.setItem("UserData", JSON.stringify(updatedUserData));
          });
        }
        return response.data;
      } catch (error) {
        console.error("Error updating profile photo:", error);
      }
    }
  };

  const convertImageBufferToBase64 = (imageBuffer) => {
    if (!imageBuffer) {
      return null;
    }
    const base64String = Buffer.from(imageBuffer).toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  };

  const handleEdit = () => {
    navigate("/editprofile")
  }
  return (
    <>
      <UserHeader />
      {userData ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <Card style={{ width: "300px", marginBottom: "1.5rem" }}>
            <CardContent style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={convertImageBufferToBase64(userData.image.data)}
                alt="Profile Photo"
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                className="userprofilephoto"
              />
              <label htmlFor="file-input">
                <AddAPhotoSharpIcon style={{ cursor: "pointer" }} />
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileSelect}
              />
            </CardContent>
            <CardContent style={{ display: "flex" }}>
              <Typography>Name: &nbsp;&nbsp;</Typography>
              <Typography color="textSecondary">
                {userData.user_name}
              </Typography>
            </CardContent>
          </Card>
          <Card style={{ width: "300px", marginBottom: "1.5rem" }}>
            <CardContent>
              <div style={{ display: "flex" }}>
                <Typography>Email: &nbsp; &nbsp;</Typography>
                <Typography color="textSecondary">{userData.email}</Typography>
              </div>
              <div style={{ display: "flex" }}>
                <Typography>Phone: &nbsp;</Typography>
                <Typography color="textSecondary">{userData.phone}</Typography>
              </div>
            </CardContent>
          </Card>
          <Card style={{ width: "300px", marginBottom: "1.5rem" }}>
            <CardContent style={{ margin: "auto", textAlign: "center" }}>
              <div>
                <Button
                  startIcon={<PlaylistAddCheckIcon />}
                  variant="outlined"
                  color="secondary"
                  style={{ borderRadius: 20, marginBottom: "1.5rem" }}
                >
                  Orders
                </Button>
                <Button
                  startIcon={<ShoppingCart />}
                  variant="outlined"
                  color="warning"
                  style={{ borderRadius: 20, marginBottom: "1.5rem" }}
                >
                  Cart
                </Button>
                <Button
                  startIcon={<Favorite />}
                  variant="outlined"
                  color="error"
                  style={{ borderRadius: 20, marginBottom: "1.5rem" }}
                >
                  Wishlist
                </Button>
                <Button
                  startIcon={<LocalOffer />}
                  variant="outlined"
                  color="success"
                  style={{ borderRadius: 20, marginBottom: "1.5rem" }}
                >
                  Coupons
                </Button>

                <Button
                  startIcon={<Mail />}
                  variant="outlined"
                  color="info"
                  style={{ borderRadius: 20, marginBottom: "1.5rem" }}
                >
                  Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card style={{ width: "300px", marginBottom: "1.5rem" }}>
            <CardContent
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <Button
                startIcon={<AccountCircle />}
                variant="contained"
                color="info"
                style={{ borderRadius: 20, marginBottom: "1rem" }}
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Button
                startIcon={<ExitToApp />}
                variant="contained"
                color="error"
                style={{ borderRadius: 20, marginBottom: "1rem" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <NotFoundPage />
      )}
      <Footer />
    </>
  );
};

export default UserProfile;
