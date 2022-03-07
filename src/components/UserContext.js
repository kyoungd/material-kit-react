import React from 'react';
import axios from 'axios';
// import { setMilliseconds } from 'date-fns';
import { GetUsers } from '../_mocks_/user';
import {
  CookieUserAuthenticated,
  CookieGetFavorites,
  CookieGetToken,
  CookieGetSymbols,
  CookieSetFavorites,
  CookieSetToken,
  CookieSetSymbols,
  CookieSignOut
} from '../utils/cookies';

const UserStateContext = React.createContext();
const UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, isAuthenticated: true };
    case 'SIGN_OUT_SUCCESS':
      CookieSignOut();
      return { ...state, isAuthenticated: false };
    case 'SYMBOLS':
      CookieSetSymbols(action.payload);
      return { ...state, symbols: action.payload };
    case 'FAVORITES':
      if ('work' in action && action.work === 'SAVE') {
        CookieSetFavorites(action.payload);
        saveFavorites(action.payload);
      }
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
    isAuthenticated: CookieUserAuthenticated(),
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

function makeBearToken(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
}

function downloadFavorite(dispatch, token, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  const url = process.env.REACT_APP_FAVORITE_SERVICE || 'http://localhost:1337/api/favorites';
  const bearerToken = makeBearToken(token);
  axios
    .get(url, bearerToken)
    .then((result) => {
      setIsLoading(false);
      setError(null);
      const jsondata = result.data.data[0] === undefined ? {} : result.data.data[0].attributes.data;
      dispatch({ type: 'FAVORITES', payload: jsondata });
    })
    .catch((e) => {
      setIsLoading(false);
      setError(e.response);
      console.log('An error occurred:', e.response);
    });
}

function getFavorites(dispatch, token, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  const jsondata = CookieGetFavorites();
  if (jsondata) {
    dispatch({ type: 'FAVORITES', payload: jsondata });
    setIsLoading(false);
    setError(null);
  } else downloadFavorite(dispatch, token, setIsLoading, setError);
}

function saveFavorites(favorites) {
  // const token = localStorage.getItem('id_token');
  const token = CookieGetToken();
  const url = process.env.REACT_APP_FAVORITE_SERVICE || 'http://localhost:1337/api/favorites';
  const bearerToken = makeBearToken(token);
  axios
    .post(url, favorites, bearerToken)
    .then(() => {
      console.log('favorite saved to server');
    })
    .catch((e) => {
      console.log('saveFavorites():  An error occurred:', e.response);
    });
}

function downloadSymbols(dispatch, token, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  const url1 = process.env.REACT_APP_SYMBOL_SERVICE || 'http://localhost:1337/api/symbols';
  const bearerToken = makeBearToken(token);
  axios
    .get(url1, bearerToken)
    .then((result) => {
      setIsLoading(false);
      setError(null);
      const users = GetUsers(result.data.data.attributes.data);
      dispatch({ type: 'SYMBOLS', payload: users });
    })
    .catch((e) => {
      setIsLoading(false);
      setError(e.response);
      console.log('An error occurred:', e.response);
    });
}

function getSymbols(dispatch, token, setIsLoading, setError) {
  const data = CookieGetSymbols();
  if (data) dispatch({ type: 'SYMBOLS', payload: data });
  else downloadSymbols(dispatch, token, setIsLoading, setError);
}

function loginSuccess(dispatch, navigate, user, jwt) {
  CookieSetToken(jwt);
  // localStorage.setItem('id_token', jwt);
  dispatch({ type: 'LOGIN_SUCCESS', payload: user });
  navigate('/dashboard/app', { replace: true });
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
        CookieSetToken(response.data.jwt);
        // localStorage.setItem('id_token', response.data.jwt);
        setError(null);
        setIsLoading(false);
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user });

        navigate('/dashboard/app', { replace: true });

        // history.push('/app/dashboard');
      })
      .catch((error) => {
        // Handle error.
        console.log('An error occurred:', error.response);
      });

    // setTimeout(() => {
    //   localStorage.setItem('id_token', 1)
    //   setError(null)f
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

function registerUser(dispatch, navigate, name, email, password, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  const url =
    process.env.REACT_APP_SERVER_REGISTER || 'http://localhost:1337/api/auth/local/register';
  if (!!name && !!email && !!password) {
    axios
      .post(url, {
        username: name,
        email,
        password
      })
      .then((response) => {
        // Handle success.
        // console.log('User profile', response.data.user);
        // console.log('User token', response.data.jwt);
        // localStorage.setItem('id_token', response.data.jwt);
        CookieSetToken(response.data.jwt);
        setError('');
        setIsLoading(false);
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user });
        setTimeout(() => {
          navigate('/dashboard/app', { replace: true });
        }, 500);
      })
      .catch((error) => {
        // Handle error.
        setIsLoading(false);
        setError(error);
        console.log('An error occurred:', error.response);
      });
  } else {
    setError('Registration failed.  Missing username, email or password.');
    setIsLoading(false);
  }
}

function signOut(dispatch) {
  // localStorage.removeItem('id_token');
  dispatch({ type: 'SIGN_OUT_SUCCESS' });
}

export {
  getFavorites,
  getSymbols,
  UserProvider,
  useUserState,
  useUserDispatch,
  loginUser,
  loginSuccess,
  signOut,
  registerUser
};
