/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import axios from 'axios';

PaymentPopup.propTypes = {
  priceId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired
};

function makeBearToken(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
}

export default function PaymentPopup(props) {
  const subscribeNow = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/create-subscription`;
    const { data } = await axios.post(
      url,
      {
        priceId: props.priceId
      },
      makeBearToken(props.token)
    );
    window.open(data.data.attributes.url);
  };

  return (
    <Button variant="contained" color="primary" onClick={subscribeNow}>
      Subscribe Now
    </Button>
  );
}
