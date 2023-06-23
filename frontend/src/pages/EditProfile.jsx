import React, { useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from "@material-ui/core";
import UserHeader from "../components/UserHeader";
import Footer from "../components/Footer";

const EditProfile = () => {
  const userData = JSON.parse(localStorage.getItem("UserData"));

  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    phone: "",
    building: "",
    streetName: "",
    city: "",
    province: "",
    postalCode: "",
  });
  const [show, setShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmitProfile = (event) => {
    event.preventDefault();
    axios
      .post("<profile_submit_url>", formData) // Replace <profile_submit_url> with the actual endpoint URL to submit profile data
      .then((response) => {
        // Handle success response
        console.log(response.data);
        navigate("<success_route>"); // Replace <success_route> with the actual route where you want to navigate after successful submission
      })
      .catch((error) => {
        // Handle error response
        console.error(error);
        setShow(true);
        setAlertMessage("Failed to save profile changes");
      });
  };

  const handleSubmitAddress = (event) => {
    event.preventDefault();

    const addressData = {
      building: formData.building,
      city: formData.city,
      province: formData.province,
      postalCode: formData.postalCode,
      streetName: formData.streetName,
    };

    axios
      .put(`http://localhost:3030/Users/address/${userData._id}`, addressData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
        setShow(true);
        setAlertMessage("Failed to add a new address");
      });
  };

  return (
    <>
      <UserHeader />
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <Card style={{ boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)" }}>
            <CardContent>
              <Typography
                component="h1"
                variant="h5"
                style={{ textAlign: "center" }}
              >
                Edit Profile
              </Typography>
              {show && <Alert severity="error">{alertMessage}</Alert>}

              <form onSubmit={handleSubmitProfile}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="user_name"
                  autoComplete="name"
                  value={formData.user_name}
                  onChange={handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
          <Card
            style={{
              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
              marginTop: "4rem",
            }}
          >
            <CardContent>
              <Typography
                component="h6"
                variant="h6"
                style={{ marginBottom: "2rem", marginTop: "2rem" }}
              >
                Add a New Address
              </Typography>
              <form onSubmit={handleSubmitAddress}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "2rem",
                  }}
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="building"
                    label="Building"
                    name="building"
                    autoComplete="tel"
                    value={formData.building}
                    onChange={handleChange}
                    style={{ paddingRight: "2rem" }}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="streetName"
                    label="Street Name"
                    name="streetName"
                    autoComplete="tel"
                    value={formData.streetName}
                    onChange={handleChange}
                    style={{ paddingRight: "2rem" }}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="city"
                    label="City"
                    name="city"
                    autoComplete="tel"
                    value={formData.city}
                    onChange={handleChange}
                    style={{ paddingRight: "2rem" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "2rem",
                  }}
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="province"
                    label="Province"
                    name="province"
                    autoComplete="tel"
                    value={formData.province}
                    onChange={handleChange}
                    style={{ paddingRight: "2rem" }}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="postalCode"
                    label="Postal Code"
                    name="postalCode"
                    autoComplete="tel"
                    value={formData.postalCode}
                    onChange={handleChange}
                    style={{ paddingRight: "2rem" }}
                  />
                </div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Add New Address
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <h3>All Saved Addresses</h3>
          {userData.saved_address.map((address, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                margin: "1rem",
                width: "300px",
              }}
            >
              <h4>Address {index + 1}</h4>
              <p>Building: {address.building}</p>
              <p>Street Name: {address.streetName}</p>
              <p>City: {address.city}</p>
              <p>Province: {address.province}</p>
              <p>Postal Code: {address.postalCode}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditProfile;
