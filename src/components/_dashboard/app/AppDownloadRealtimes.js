import { Typography, LinearProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

AppDownloadRealtimes.propTypes = {
  dispatch: PropTypes.func.isRequired,
  callForData: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

// ----------------------------------------------------------------------

export default function AppDownloadRealtimes({ dispatch, callForData, token }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('not loaded');

  useEffect(() => {
    if (error === 'not loaded') {
      callForData(dispatch, token, setIsLoading, setError);
    }
  }, [dispatch, error, callForData, token]);

  return (
    <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
      {isLoading ? 'LOADING DATA' : ''}
      {isLoading ? <LinearProgress /> : ''}
      {error}
    </Typography>
  );
}
