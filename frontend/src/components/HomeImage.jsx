import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    "&:hover": {
      transition: "0.7s ease",

      borderRadius: "50px",
    },
  },
}));

const OverlayedImage = () => {
  const classes = useStyles();

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "800px",
        backgroundImage:
          "url('https://c1.staticflickr.com/3/2389/2110099002_3b06594eda_b.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          padding: "10px",
          borderRadius: "5px",
          textAlign: "center",
          color: "white",
        }}
      >
        <p className="mb-3">
          Unlock the Power of Online Shopping: Connect with Your Favorite
          Brands, Explore Trendsetting Collections, and Shop Effortlessly
          Anytime, Anywhere!
        </p>
        <Button variant="contained" color="primary" className={classes.button}>
          Click Here to Get Started
        </Button>
      </div>
    </div>
  );
};

export default OverlayedImage;
