/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import PropTypes from 'prop-types';

UserPopup.propTypes = {
  data: PropTypes.object.isRequired
};

export default function UserPopup(props) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('md');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  const showCorrelations = (corr) => {
    let correlation = '';
    for (const line in corr) {
      const symbol = corr[line];
      correlation = correlation === '' ? symbol : `${correlation}, ${symbol}`;
    }
    return correlation === '' ? 'None' : correlation;
  };

  const showNewsFinviz = (symbol) => (
    <>
      <a href={`https://finviz.com/quote.ashx?t=${symbol}`} target="_blank" rel="noreferrer">
        News-Finviz
      </a>{' '}
    </>
  );

  const showNewsYahoo = (symbol) => (
    <>
      <a href={`https://finance.yahoo.com/quote/${symbol}`} target="_blank" rel="noreferrer">
        News-Yahoo Finance
      </a>{' '}
    </>
  );

  const showCik = (cik) => (
    <>
      <a
        href={
          cik === '0' || cik === undefined
            ? `https://www.sec.gov/edgar/searchedgar/companysearch.html`
            : `https://www.sec.gov/edgar/browse/?CIK=${cik}&owner=exclude`
        }
        target="_blank"
        rel="noreferrer"
      >
        SEC filings
      </a>
    </>
  );

  return (
    <>
      <IconButton aria-label="fingerprint" color="secondary" onClick={handleClickOpen}>
        <Icon icon={eyeFill} color="#1C9CEA" width={32} height={32} />
      </IconButton>
      <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open} onClose={handleClose}>
        <DialogTitle>{props.data.name}</DialogTitle>
        <DialogContent>
          <Typography component="div">
            <Box fontWeight="fontWeightMedium" display="inline">
              CORRELATIONS:
            </Box>{' '}
            {showCorrelations(props.data.corr)}
          </Typography>
          <Typography component="div">
            <Box fontWeight="fontWeightMedium" display="inline">
              INVERSES:
            </Box>{' '}
            {showCorrelations(props.data.cinv)}
          </Typography>
          <Typography component="div">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Box fontWeight="fontWeightMedium" display="inline">
                  Float %:
                </Box>{' '}
                {props.data.floatp}%{' '}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box fontWeight="fontWeightMedium" display="inline">
                  Float Volume:
                </Box>{' '}
                {props.data.floats}M
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box fontWeight="fontWeightMedium" display="inline">
                  {' '}
                </Box>
              </Grid>
            </Grid>
          </Typography>
          <Typography component="div">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Box fontWeight="fontWeightMedium" display="inline">
                  ATR:
                </Box>{' '}
                ${props.data.atr}{' '}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box fontWeight="fontWeightMedium" display="inline">
                  Average ATR:
                </Box>{' '}
                ${props.data.avgatr}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box fontWeight="fontWeightMedium" display="inline">
                  {' '}
                </Box>
              </Grid>
            </Grid>
          </Typography>

          <Typography component="div">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Box fontWeight="fontWeightMedium" display="inline">
                  {showNewsFinviz(props.data.name)}
                </Box>{' '}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box fontWeight="fontWeightMedium" display="inline">
                  {showNewsYahoo(props.data.name)}
                </Box>{' '}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box fontWeight="fontWeightMedium" display="inline">
                  {showCik(props.data.cik)}
                </Box>{' '}
              </Grid>
            </Grid>
          </Typography>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content'
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
