import React from 'react';
import axios from 'axios';

// import { setMilliseconds } from 'date-fns';
import Cookie from '../utils/cookies';
import { saveFavorites } from './UserContextDownload';

const UserStateContext = React.createContext();
const UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, isAuthenticated: true, user: action.payload };
    case 'SIGN_OUT_SUCCESS':
      return { ...state, isAuthenticated: false };
    case 'SYMBOLS':
      Cookie.setWithExpiry(Cookie.keySymbols, action.payload);
      return { ...state, symbols: action.payload };
    case 'FAVORITES':
      console.log('FAVORITES:', action);
      if ('work' in action && action.work === 'SAVE') {
        saveFavorites(action.payload);
      }
      return { ...state, favorites: action.payload };
    case 'TECHNIQUES':
      console.log('TECHNIQUES:', action);
      Cookie.setWithExpiry(Cookie.keyTechniques, action.payload);
      return { ...state, techniques: action.payload };
    case 'REALTIME':
      Cookie.setWithExpiry(Cookie.keyRealtime, action.payload);
      return { ...state, realtimes: action.payload };
    case 'TOP10NEWS':
      Cookie.setWithExpiry(Cookie.keyTop10News, action.payload);
      return { ...state, top10news: action.payload };
    case 'SETTINGS':
      return { ...state, settings: action.payload };
    case 'SCHEDULE':
      Cookie.setWithExpiry(Cookie.keySchedule, action.payload);
      return { ...state, schedules: action.payload };
    case 'RESET':
      return {};
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// eslint-disable-next-line react/prop-types
function UserProvider({ children }) {
  const [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: Cookie.isAuthenticated(),
    symbols: Cookie.getWithExpiry(Cookie.keySymbols),
    top10news: Cookie.getWithExpiry(Cookie.keyTop10News),
    favorites: Cookie.getWithExpiry(Cookie.keyFavorites),
    settings: Cookie.getWithExpiry(Cookie.keySettings),
    realtimes: Cookie.getWithExpiry(Cookie.keyRealtime),
    techniques: Cookie.getWithExpiry(Cookie.keyTechniques),
    schedules: Cookie.getWithExpiry(Cookie.keySchedule)
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

function loginSuccess(dispatch, navigate, user, jwt) {
  console.log('loginSuccess():', user);
  Cookie.setWithExpiry(Cookie.keyToken, jwt);
  localStorage.setItem('id_token', jwt);
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
        Cookie.setWithExpiry(Cookie.keyToken, response.data.jwt);
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
        Cookie.setWithExpiry(Cookie.keyToken, response.data.jwt);
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
  dispatch({ type: 'RESET' });
  dispatch({ type: 'SIGN_OUT_SUCCESS' });
  Cookie.signOut();
}

export {
  UserProvider,
  useUserState,
  useUserDispatch,
  loginUser,
  loginSuccess,
  signOut,
  registerUser
};
