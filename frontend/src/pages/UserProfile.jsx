import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import UserHeader from "../components/UserHeader";
import Footer from "../components/Footer";

const UserProfile = () => {
  // Retrieve user data from local storage
  const userData = JSON.parse(localStorage.getItem("UserData"));

  return (
    <>
      <UserHeader />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card style={{ width: "300px", margin: "1rem" }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Name
            </Typography>
            <Typography color="textSecondary">{userData.user_name}</Typography>
          </CardContent>
        </Card>
        <Card style={{ width: "300px", margin: "1rem" }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Email
            </Typography>
            <Typography color="textSecondary">{userData.email}</Typography>
          </CardContent>
        </Card>
        <Card style={{ width: "300px", margin: "1rem" }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Phone
            </Typography>
            <Typography color="textSecondary">{userData.phone}</Typography>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
