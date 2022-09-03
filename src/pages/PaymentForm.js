import React from 'react'; // , {useState }
import { TextField, Grid, Typography } from '@material-ui/core';
import Container from '@mui/material/Container';

const PaymentForm = () => {
  const [postalcode, setPostalcode] = React.useState('');
  const [cardname, setCardname] = React.useState('');
  const [cardnumber, setCardnumber] = React.useState('');
  const [cardexpiry, setCardexpiry] = React.useState('');
  const [cardcvc, setCardcvc] = React.useState('');

  const cardsLogo = ['amex', 'discover', 'mastercard', 'visa'];

  return (
    <Grid container spacing={3} justify="space-between">
      <Grid item xs={12} sm={6}>
        <Typography variant="h6">Card Type</Typography>
      </Grid>
      <Grid container item xs={12} sm={6} justify="space-between">
        {cardsLogo.map((e) => (
          <img
            key={e}
            src={`/static/mock-images/cards/${e}.png`}
            alt={e}
            width="60px"
            align="bottom"
            style={{ padding: '0 5px' }}
          />
        ))}
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Name on Card"
          name="name1"
          variant="outlined"
          required
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          value={cardname}
          onChange={(e) => setCardname(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Credit Card Number"
          name="ccnumber"
          variant="outlined"
          required
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          value={cardnumber}
          onChange={(e) => setCardnumber(e.target.value)}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        &nbsp;
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          label="Expiration Date"
          name="ccexp"
          placeholder="MM/YY"
          variant="outlined"
          required
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          value={cardexpiry}
          onChange={(e) => setCardexpiry(e.target.value)}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          label="CVC"
          name="cvc"
          variant="outlined"
          required
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          value={cardcvc}
          onChange={(e) => setCardcvc(e.target.value)}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          label="Postal Code"
          name="postal_code"
          variant="outlined"
          required
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          value={postalcode}
          onChange={(e) => setPostalcode(e.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default PaymentForm;
