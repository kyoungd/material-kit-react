/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import { Typography, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import PaymentForm from './PaymentForm';

PaymentPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default function PaymentPopup(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Subscribe Now
      </Button>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{props.data.person.name}</DialogTitle>
        <Box sx={{ my: 3, mx: 2 }}>
          <Grid container spacing={3} justify="space-between">
            <Grid item xs={3} sx={{ minWidth: 160 }} mx={{ minWidth: 240 }}>
              <Avatar
                alt="Expert Photo"
                src={props.data.person.image}
                sx={{ width: 160, height: 160 }}
                mx={{ width: 240, height: 240 }}
              />
            </Grid>
            <Grid item xs={9}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">{props.data.person.product}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">{props.data.person.summary}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Divider variant="middle" />
        <DialogContent>
          <FormControl>
            <PaymentForm />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary">
            Pay Now
          </Button>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
