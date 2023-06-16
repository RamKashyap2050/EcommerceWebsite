import React from 'react';
import { Container, Typography, makeStyles } from '@material-ui/core';
import Logo from '../error.jpg'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  illustration: {
    width: '40%',
    marginBottom: theme.spacing(2),
  },
}));

const NoProducts = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.container}>
      <img
        src={Logo}
        alt="Empty Cart Illustration"
        className={classes.illustration}
      />
      <Typography variant="h5" gutterBottom>
        Your Cart is Empty
      </Typography>
      <Typography variant="body1">
        Looks like you haven't added anything to your cart yet.
      </Typography>
      <Typography variant="body1" style={{marginBottom:"17rem"}}>
        Start shopping and discover amazing products!
      </Typography>
    </Container>
  );
};

export default NoProducts;
