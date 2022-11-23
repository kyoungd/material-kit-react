import { Typography, LinearProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import Tooltip from '@mui/material/Tooltip';

// ----------------------------------------------------------------------

AppDownloadRealtimes.propTypes = {
  dispatch: PropTypes.func.isRequired,
  callForData: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

// ----------------------------------------------------------------------

function IconDownloading(name) {
  <Tooltip title={name}>
    <WhatshotIcon color="secondary" fontSize="large" />;
  </Tooltip>;
}

function IconDownloadComplete(name, isFailed) {
  return (
    <Tooltip title={name}>
      <WhatshotIcon color={isFailed ? 'primary' : 'secondary'} fontSize="large" />
    </Tooltip>
  );
}

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
      {isLoading ? IconDownloading() : IconDownloadComplete(error)}
    </Typography>
  );
}
