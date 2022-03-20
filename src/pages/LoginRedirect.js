import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

// context
import { useUserDispatch, loginSuccess } from '../components/UserContext';

LoginRedirect.propTypes = {
  providerName: PropTypes.string.isRequired
};

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function LoginRedirect(props) {
  const [text, setText] = useState('Loading...');
  const navigate = useNavigate();
  const location = useLocation();
  const userDispatch = useUserDispatch();

  useEffect(() => {
    // Successfully logged with the provider
    // Now logging with strapi by using the access_token (given by the provider) in props.location.search
    fetch(`${backendUrl}/api/auth/${props.providerName}/callback${location.search}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        console.log('Successfully logged with the provider.  HTTP 200');
        return res;
      })
      .then((res) => res.json())
      .then((res) => {
        loginSuccess(userDispatch, navigate, res.user, res.jwt);
        // Successfully logged with Strapi
        // Now saving the jwt to use it for future authenticated requests to Strapi
        // localStorage.setItem('jwt', res.jwt);
        // localStorage.setItem('username', res.user.username);
        // setText('You have been successfully logged in. You will be redirected in a few seconds...');
        // setTimeout(() => history.push('/'), 3000); // Redirect to homepage after 3 sec
      })
      .catch((err) => {
        console.log(err);
        setText('An error occurred, please see the developer console.');
      });
  }, [location.search, navigate, props.providerName, userDispatch]);

  return <p>{text}</p>;
}
