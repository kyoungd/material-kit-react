import React from 'react'; // , {useState }
import { TextField, Grid, Typography } from '@material-ui/core';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';

PaymentProduct.propTypes = {
  name: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired
};

const PaymentProduct = ({ name, summary }) => (
  <Grid container spacing={3} justify="space-between">
    <Grid item xs={12} sm={6}>
      <Typography variant="subtitle1">{name}</Typography>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Typography variant="subtitle2">{summary}</Typography>
    </Grid>
  </Grid>
);

export default PaymentProduct;
