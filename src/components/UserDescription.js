import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

UserDescription.propTypes = {
  description: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default function UserDescription(props) {
  const [value, setValue] = React.useState(props.description);

  const id = `${props.symbol}-description`;
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '100%' }
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id={id}
        key={id}
        value={value}
        variant="standard"
        onChange={(event) => {
          const { value } = event.target;
          props.handleChange(props.symbol, value);
          setValue(value);
        }}
      />
    </Box>
  );
}
