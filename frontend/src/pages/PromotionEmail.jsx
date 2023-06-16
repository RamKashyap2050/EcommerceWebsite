import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

const PromotionEmail = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [couponCode, setCouponCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the email body with the coupon code
    const emailBody = `Dear customer,\n\nHere's your coupon code: ${couponCode}\n\nHappy shopping!`;

    // Make an axios.post request to submit the email and coupon code
    axios.post('/api/sendEmail', { email, body: emailBody })
      .then((response) => {
        console.log(response.data);
        // Handle successful submission
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
  };

  return (
    <div className={classes.root}>
      <h2>Subscribe to our promotion emails</h2>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          className={classes.input}
          type="email"
          value={email}
          onChange={handleEmailChange}
          label="Email"
          placeholder="Enter your email"
          required
        />
        <TextField
          className={classes.input}
          type="text"
          value={couponCode}
          onChange={handleCouponCodeChange}
          label="Coupon Code"
          placeholder="Enter your coupon code"
          required
        />
        <Button
          className={classes.submitButton}
          variant="contained"
          color="primary"
          type="submit"
        >
          Subscribe
        </Button>
      </form>
    </div>
  );
};

export default PromotionEmail;
