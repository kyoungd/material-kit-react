// import { Icon } from '@iconify/react';
// import bugFilled from '@iconify/icons-ant-design/bug-filled';
// // material
// import { alpha, styled } from '@mui/material/styles';
import { Typography, LinearProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { styled } from '@mui/material/styles';
// import { Card, Typography, Button } from '@mui/material';
// utils
// import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

AppBugReports.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getSymbols: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

// const RootStyle = styled(Card)(({ theme }) => ({
//   boxShadow: 'none',
//   textAlign: 'center',
//   padding: theme.spacing(5, 0),
//   color: theme.palette.error.darker,
//   backgroundColor: theme.palette.error.lighter
// }));

// const IconWrapperStyle = styled('div')(({ theme }) => ({
//   margin: 'auto',
//   display: 'flex',
//   borderRadius: '50%',
//   alignItems: 'center',
//   width: theme.spacing(8),
//   height: theme.spacing(8),
//   justifyContent: 'center',
//   marginBottom: theme.spacing(3),
//   color: theme.palette.error.dark,
//   backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.error.dark, 0)} 0%, ${alpha(
//     theme.palette.error.dark,
//     0.24
//   )} 100%)`
// }));

// ----------------------------------------------------------------------

// const TOTAL = 234;

export default function AppBugReports({ dispatch, getSymbols, token }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('not loaded');

  useEffect(() => {
    if (error === 'not loaded') {
      getSymbols(dispatch, token, setIsLoading, setError);
    }
  }, [dispatch, error, getSymbols, token]);

  return (
    <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
      {isLoading ? 'LOADING SYMBOLS' : ''}
      {isLoading ? <LinearProgress /> : ''}
      {error}
    </Typography>
  );
  // return (
  //   <RootStyle>
  //     <Button
  //       variant="contained"
  //       color="primary"
  //       onClick={() => getSymbols(dispatch, token, setIsLoading, setError)}
  //     >
  //       GET STOCKS
  //     </Button>
  //     {/* <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography> */}
  //     <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
  //       {isLoading ? 'Loading... ' : ''}
  //       {error}
  //     </Typography>
  //   </RootStyle>
  // );
}
