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

const SignupPage = () => {
  const [show, setShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    password2: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.password2) {
      setShow(true);
      setAlertMessage("Passwords Don't Match");
    } else {
      try {
        const userData = {
          user_name: formData.user_name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        };

        const response = await axios.post("http://localhost:3030/Users/register", userData);
        console.log(response.data);
        localStorage.setItem("UserData", JSON.stringify(response.data));
        if (response.data) {
          navigate("/userprofile");
        }
        setFormData({
          user_name: "",
          email: "",
          password: "",
          password2: "",
          phone: "",
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        style={{ width: "500px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)" }}
      >
        <CardContent>
          <Typography
            component="h1"
            variant="h5"
            style={{ textAlign: "center" }}
          >
            Signup
          </Typography>
          {show && <Alert severity="error">{alertMessage}</Alert>}

          <form onSubmit={handleSubmit}>
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
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Confirm Password"
              type="password"
              id="passwordConfirmation"
              autoComplete="new-password"
              value={formData.password2}
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
            <Button type="submit" fullWidth variant="contained" color="primary">
              Signup
            </Button>
          </form>
          <Typography
            component="p"
            variant="subtitle1"
            style={{
              textAlign: "center",
              marginTop: "1rem",
              marginBottom: "2rem",
            }}
          >
            Already a Member?{" "}
            <a href="/login" style={{ color: "blue" }}>
              Login
            </a>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
