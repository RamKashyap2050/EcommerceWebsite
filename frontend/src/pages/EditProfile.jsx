import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from "@material-ui/core";
import { FaTrashAlt } from "react-icons/fa";
import UserHeader from "../components/UserHeader";
import Footer from "../components/Footer";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const EditProfile = () => {
  const [userData, setUserData] = useState(() => {
    const storedUserData = JSON.parse(localStorage.getItem("UserData"));
    return storedUserData;
  });

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("UserData")));
  }, []);
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

  const [profileData, setProfileData] = useState({
    user_name: userData.user_name || "",
    email: userData.email || "",
    phone: userData.phone || "",
  });

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      [name]: value,
    }));
  };

  const handleSubmitProfile = (event) => {
    event.preventDefault();
    axios
      .put(`/Users/updateuser/${userData._id}`, profileData)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          const updatedUserData = { ...userData, ...response.data };
          setUserData(updatedUserData);
          localStorage.setItem("UserData", JSON.stringify(updatedUserData));
        }
        navigate("/userprofile");
      })
      .catch((error) => {
        console.error(error);
        setShowError(true);
        setErrorMessage("Failed to save profile changes");
      });
  };

  const handleremoveClientaddress = (addressIndex) => {
    console.log("Clicked", addressIndex);
  
    const requestData = {
      addressIndex: addressIndex,
    };
  
    axios.delete(`Users/removeClientAddress/${userData._id}/${addressIndex}`, {
      data: requestData,
    })
      .then((response) => {
        setUserData(response.data);
        localStorage.setItem("UserData", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error('Error:', error);
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
      .put(`/Users/address/${userData._id}`, addressData)
      .then((response) => {
        const updatedUserData = {
          ...userData,
          saved_address: response.data.saved_address,
        };
        console.log(updatedUserData);

        setUserData(updatedUserData);
        localStorage.setItem("UserData", JSON.stringify(updatedUserData));
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
                  fullWidth
                  id="name"
                  label="Name"
                  name="user_name"
                  autoComplete="name"
                  value={profileData.user_name}
                  onChange={handleProfileChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoComplete="tel"
                  value={profileData.phone}
                  onChange={handleProfileChange}
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
            <CardContent></CardContent>
          </Card>
          <br />
          <Link
            to="/userprofile"
            style={{
              textDecoration: "none",
              color: "black",
              margin: "auto",
              textAlign: "center",
            }}
          >
            <FaArrowAltCircleLeft /> Go to Profile Page
          </Link>
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
          {userData.saved_address?.map((address, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                margin: "1rem",
                width: "300px"
              }}
            > 
            <div style={{display:"flex", justifyContent:"space-between"}}>
            <h4>Address {index + 1}</h4>
              <button className="btn btn-danger" onClick={() => handleremoveClientaddress(address)} ><FaTrashAlt /></button>
            </div>
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
