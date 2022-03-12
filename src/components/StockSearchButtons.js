/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as React from 'react';
import { Box, Typography, Grid, Tooltip, Button } from '@mui/material';
import PropTypes from 'prop-types';

StockSearchButtons.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      info: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired,
  searchFunc: PropTypes.func.isRequired
};

export default function StockSearchButtons(props) {
  const showButtonGroup = (data, searchFunc) => {
    const code = data.map((line) => (
      <Grid key={line.id} item xs={12} sm={1}>
        <Box fontWeight="fontWeightMedium" display="inline">
          <Tooltip title={line.info}>
            <Button variant="contained" color="primary" onClick={() => searchFunc(line.text)}>
              {line.label}
            </Button>
          </Tooltip>
        </Box>
      </Grid>
    ));
    return code;
  };

  return (
    <>
      <Box fullWidth="md" maxWidth>
        <Typography component="div">
          <Grid container spacing={3}>
            {showButtonGroup(props.data, props.searchFunc)}
          </Grid>
        </Typography>
      </Box>
    </>
  );
}
