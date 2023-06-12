import React, { useState } from "react";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Logo from "../adminlogin.png";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginUser = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3030/Users/login", {
        email,
        password,
      });
      setShow(false);

      console.log(response.data);
      localStorage.setItem("UserData", JSON.stringify(response.data));
      navigate("/userprofile");
    } catch (error) {
      console.error(error);
      setEmail("");
      setPassword("");
      setShow(true);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        maxWidth: "75%",
        textAlign: "center",
        margin: "auto",
        paddingTop: "6rem",
        justifyContent: "space-around",
      }}
    >
      <div className="card">
        <div className="d-flex">
          <div>
            <img src={Logo} alt="e" className="adminlogin" />
          </div>
          <Container component="main" maxWidth="xs">
            <div className={classes.container}>
              {show && (
                <Alert severity="error" className="mb-4">
                  Incorrect Credentials
                </Alert>
              )}
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submitButton}
                >
                  Login
                </Button>
              </form>
              <a href="/signup" className="pb-2">Don't Have an Account?</a>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
