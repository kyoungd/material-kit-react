import React from 'react';
import axios from 'axios';
import { GetUsers } from '../_mocks_/user';

const UserStateContext = React.createContext();
const UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, isAuthenticated: true };
    case 'SIGN_OUT_SUCCESS':
      return { ...state, isAuthenticated: false };
    case 'SYMBOLS':
      return { ...state, symbols: action.payload };
    case 'FAVORITES':
      return { ...state, favorites: action.payload };
    case 'SETTINGS':
      return { ...state, settings: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// eslint-disable-next-line react/prop-types
function UserProvider({ children }) {
  const [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem('id_token'),
    symbols: {},
    favorites: {},
    settings: {}
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
}

function useUserDispatch() {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }
  return context;
}

// ###########################################################

function token() {
  const { isAuthenticated } = UserProvider();
  return {
    headers: {
      Authorization: `Bearer ${isAuthenticated}`
    }
  };
}

function getFavorites(dispatch, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  const url = process.env.REACT_APP_GET_FAVORITES || 'http://localhost:5000/favorites';
  axios
    .get(url, token())
    .then((result) => {
      setIsLoading(false);
      setError(null);
      dispatch({ type: 'FAVORITES', payload: result.data });
    })
    .catch((e) => {
      setIsLoading(false);
      setError(e.response);
      console.log('An error occurred:', e.response);
    });
}

function setFavorites(setIsLoading, setError) {
  const { favorites } = UserProvider();
  setError(false);
  setIsLoading(true);
  const url = process.env.REACT_APP_GET_FAVORITES || 'http://localhost:1337/api/favorites';
  axios
    .post(url, favorites, token())
    .then(() => {
      setIsLoading(false);
      setError(null);
    })
    .catch((e) => {
      setIsLoading(false);
      setError(e.response);
      console.log('An error occurred:', e.response);
    });
}

function getSymobols(dispatch, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  const url1 = process.env.REACT_APP_SYMBOL_SERVICE || 'http://localhost:1337/api/symbols';
  axios
    .get(url1, token())
    .then((result) => {
      const users = GetUsers(result.data);
      dispatch({ type: 'SYMBOLS', payload: users });
    })
    .catch((e) => {
      setIsLoading(false);
      setError(e.response);
      console.log('An error occurred:', e.response);
    });
}

function loginUser(dispatch, login, password, navigate, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  if (!!login && !!password) {
    const url = process.env.REACT_APP_SERVER_LOGIN || 'http://localhost:1337/api/auth/local';
    axios
      .post(url, {
        identifier: login,
        password
      })
      .then((response) => {
        // Handle success.
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
        localStorage.setItem('id_token', response.data.jwt);
        setError(null);
        setIsLoading(false);
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user });

        navigate('/dashboard', { replace: true });

        // history.push('/app/dashboard');
      })
      .catch((error) => {
        // Handle error.
        console.log('An error occurred:', error.response);
      });

    // setTimeout(() => {
    //   localStorage.setItem('id_token', 1)
    //   setError(null)
    //   setIsLoading(false)
    //   dispatch({ type: 'LOGIN_SUCCESS' })

    //   history.push('/app/dashboard')
    // }, 2000);
  } else {
    dispatch({ type: 'LOGIN_FAILURE' });
    setError(true);
    setIsLoading(false);
  }
}

function registerUser(dispatch, name, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  const url =
    process.env.REACT_APP_SERVER_REGISTER || 'http://localhost:1337/api/auth/local/register';
  if (!!name && !!login && !!password) {
    axios
      .post(url, {
        username: name,
        email: login,
        password
      })
      .then((response) => {
        // Handle success.
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
        setError(null);
        setIsLoading(false);
        dispatch({ type: 'REGISTRATION_SUCCESS', payload: response.data.user });
        history.push('/app/dashboard');
      })
      .catch((error) => {
        // Handle error.
        console.log('An error occurred:', error.response);
      });
  } else {
    dispatch({ type: 'REGISTRATION_FAILURE' });
    setError(true);
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem('id_token');
  dispatch({ type: 'SIGN_OUT_SUCCESS' });
  history.push('/login');
}

export {
  getFavorites,
  setFavorites,
  getSymobols,
  UserProvider,
  useUserState,
  useUserDispatch,
  loginUser,
  signOut,
  registerUser
};
