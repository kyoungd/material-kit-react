import React from 'react';
import axios from 'axios';
// import { setMilliseconds } from 'date-fns';
import { GetUsers } from '../_mocks_/user';
import {
  CookieUserAuthenticated,
  CookieGetFavorites,
  CookieGetToken,
  CookieGetSymbols,
  CookieSetRealtimes,
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
      console.log('FAVORITES:', action);
      if ('work' in action && action.work === 'SAVE') {
        CookieSetFavorites(action.payload);
        saveFavorites(action.payload);
      }
      return { ...state, favorites: action.payload };
    case 'REALTIME':
      CookieSetRealtimes(action.payload);
      return { ...state, realtimes: action.payload };
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
    settings: {},
    realtimes: []
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
      console.log('>>>>>>> result:', result);
      setIsLoading(false);
      setError(null);
      try {
        const jsondata = result.data.data.attributes.data;
        dispatch({ type: 'FAVORITES', payload: jsondata });
      } catch (ex) {
        console.log('downloadFavorite(): An error occurred:', ex);
        dispatch({ type: 'FAVORITES', payload: [] });
      }
    })
    .catch((e) => {
      console.log('>>>>>>> error:', e);
      dispatch({ type: 'FAVORITES', payload: [] });
      setIsLoading(false);
      setError(null);
      console.log('An error occurred:', e);
    });
}

function getFavorites(dispatch, token, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  const jsondata = CookieGetFavorites();
  if (jsondata === null) downloadFavorite(dispatch, token, setIsLoading, setError);
  else {
    dispatch({ type: 'FAVORITES', payload: jsondata });
    setIsLoading(false);
    setError(null);
  }
}

function saveFavorites(favorites) {
  // const token = localStorage.getItem('id_token');
  const token = CookieGetToken();
  const url = process.env.REACT_APP_FAVORITE_SERVICE || 'http://localhost:1337/api/favorites';
  const bearerToken = makeBearToken(token);
  axios
    .post(url, favorites, bearerToken)
    .then(() => {
      console.log('saveFavorites(): favorite saved to server');
    })
    .catch((e) => {
      console.log('saveFavorites():  An error occurred:', e);
    });
}

function parseRealtimes(data) {
  const stocks = data.map((item) => {
    const row = {
      id: item.id,
      name: item.attributes.symbol,
      vsa: item.attributes.data.vsa,
      sd: item.attributes.data.sd,
      cs: item.attributes.data.cs,
      ab: item.attributes.data.ab,
      price: item.attributes.data.price,
      tf: item.attributes.timeframe
    };
    return row;
  });
  return stocks;
}

function downloadRealtimes(
  dispatch,
  token,
  setIsLoading = null,
  setError = null,
  setDownloadData = null
) {
  if (setError !== null) setError(false);
  if (setIsLoading !== null) setIsLoading(true);
  const url1 =
    process.env.REACT_APP_REALTIME_SERVICE ||
    'https://simp-admin.herokuapp.com/api/realtimes?datatype=cs&timeframe=15Min';
  const bearerToken = makeBearToken(token);
  axios
    .get(url1, bearerToken)
    .then((result) => {
      if (setIsLoading !== null) setIsLoading(false);
      if (setError !== null) setError(null);
      const stocks = parseRealtimes(result.data.data);
      if (setDownloadData !== null) setDownloadData(stocks);
      dispatch({ type: 'REALTIME', payload: stocks });
    })
    .catch((e) => {
      if (setIsLoading !== null) setIsLoading(false);
      if (setError !== null) setError(`realtime -> ${e.message}`);
      console.log('An error occurred:', e.message);
    });
}

function getRealtimes(
  dispatch,
  token,
  setIsLoading = null,
  setError = null,
  setDownloadData = null
) {
  downloadRealtimes(dispatch, token, setIsLoading, setError, setDownloadData);
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
  if (data === null) downloadSymbols(dispatch, token, setIsLoading, setError);
  else dispatch({ type: 'SYMBOLS', payload: data });
}

function downloadStockData(pState, symbol, pushData, pushSymbol) {
  const token = CookieGetToken();
  const url = process.env.REACT_APP_ASSET_DATA_URL || 'http://localhost:1337/api/assets';
  const fullUrl = `${url}?symbol=${symbol}&timeframe=1Day`;
  const bearerToken = makeBearToken(token);
  axios
    .get(fullUrl, bearerToken)
    .then((result) => {
      try {
        const { data } = result.data.data.attributes;
        const dataArray = [];
        data.forEach((item) => {
          dataArray.push({
            date: new Date(item.Date),
            open: item.Open,
            high: item.High,
            low: item.Low,
            close: item.Close,
            volume: item.Volume
          });
        });
        const newData = pState;
        newData[symbol] = dataArray.reverse();
        pushData(newData);
        pushSymbol(symbol);
      } catch (ex) {
        console.log('downloadFavorite(): An error occurred:', ex);
      }
    })
    .catch((e) => {
      console.log('An error occurred:', e.response);
    });
}

function loginSuccess(dispatch, navigate, user, jwt) {
  console.log('loginSuccess():', user);
  CookieSetToken(jwt);
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
  getRealtimes,
  UserProvider,
  useUserState,
  useUserDispatch,
  loginUser,
  loginSuccess,
  signOut,
  downloadStockData,
  registerUser
};
