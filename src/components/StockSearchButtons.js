/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as React from 'react';
import { Box, Typography, Grid, Tooltip, Button, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

StockSearchButtons.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      info: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired,
  searchFunc: PropTypes.func.isRequired,
  resetFunc: PropTypes.func.isRequired
};

const SearchButtonStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(1),
  textAlign: 'center'
}));

export default function StockSearchButtons(props) {
  const showButtonGroup = (data, searchFunc, resetFunc) => {
    const code = data.map((line) => (
      <Box key={line.id} fontWeight="fontWeightMedium">
        <Tooltip title={line.info}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              resetFunc('');
              searchFunc(line.text);
            }}
          >
            {line.label}
          </Button>
        </Tooltip>
      </Box>
    ));
    return (
      <Stack spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
        {code}
      </Stack>
    );
  };

  return (
    <SearchButtonStyle>
      <Typography component="div">
        <Grid container spacing={3} justifyContent="center">
          {showButtonGroup(props.data, props.searchFunc, props.resetFunc)}
        </Grid>
      </Typography>
    </SearchButtonStyle>
  );
}
