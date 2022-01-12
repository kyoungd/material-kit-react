import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';

UserRank.propTypes = {
  rank: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default function UserRank(props) {
  const [score, setScore] = React.useState(props.rank);

  const id = `${props.symbol}-rank`;
  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id={id}
          key={id}
          value={score}
          onChange={(event) => {
            const { value } = event.target;
            props.handleChange(props.symbol, value);
            setScore(value);
          }}
          label="Score"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>Fail</MenuItem>
          <MenuItem value={2}>Poor</MenuItem>
          <MenuItem value={3}>OK</MenuItem>
          <MenuItem value={4}>Good</MenuItem>
          <MenuItem value={5}>Best</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
