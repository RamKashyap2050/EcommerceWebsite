import React from "react";
import { TextField, Button } from "@material-ui/core";
import UserHeader from "../components/UserHeader";
import Footer from "../components/Footer";

const Checkout = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  const userData = JSON.parse(localStorage.getItem("UserData"));
  
  return (
    <>
      <UserHeader />
      <div className="container" style={{ marginBottom: "27rem" }}>
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="shippingAddress">Shipping Address</label>
            <select id="shippingAddress" className="form-control" required>
              {userData.saved_address.map((address, index) => (
                <option key={index} value={index}>
                  {`${address.building}, ${address.streetName}, ${address.city}, ${address.province}, ${address.postalCode}`}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <TextField
              label="Card Number"
              variant="outlined"
              fullWidth
              required
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "2rem",
            }}
          >
            <TextField
              label="MM/YY"
              variant="outlined"
              fullWidth
              required
              style={{ marginRight: "1rem" }}
            />
            <TextField label="CVV" variant="outlined" fullWidth required />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ width: "100%" }}
          >
            Order
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
