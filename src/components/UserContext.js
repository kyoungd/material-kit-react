import React from 'react';
import axios from 'axios';
// import { setMilliseconds } from 'date-fns';
import { GetUsers } from '../_mocks_/user';
import {
  CookieUserAuthenticated,
  CookieGetFavorites,
  CookieGetToken,
  CookieGetSymbols,
  CookieGetTop10News,
  CookieSetRealtimes,
  CookieSetFavorites,
  CookieSetTop10News,
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
    case 'TOP10NEWS':
      CookieSetTop10News(action.payload);
      return { ...state, top10news: action.payload };
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
    top10news: [],
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

function extractRealtime(data) {
  const stocks = data.map((item) => {
    const row = {
      id: item.id,
      name: item.attributes.symbol,
      vsa: item.attributes.data.vsa,
      sd: item.attributes.data.sd,
      cs: item.attributes.data.cs,
      ab: item.attributes.data.ab,
      price: item.attributes.data.price,
      tf: item.attributes.timeframe,
      up: item.attributes.createdAt
    };
    return row;
  });
  return stocks;
}

function sortRealtime(data) {
  return data.sort(
    (row1, row2) => row2.tf.localeCompare(row1.tf) || row1.name.localeCompare(row2.name)
  );
}

// function groupBySymbol(data) {
//   const groupByCategory = data.reduce((group, row) => {
//     const { name } = row;
//     group[name] = group[name] ?? [];
//     group[name].push(row);
//     return group;
//   }, {});
//   return groupByCategory;
// }

// function filterTf(rows) {
//   const min15 = rows.filter((row) => row.tf === '15Min');
//   const min5 = rows.filter((row) => row.tf === '5Min');
//   let tf = min5 ? '5-Min' : '';
//   if (min15) tf += tf.length > 0 ? ',15-Min' : '15-Min';
//   return tf;
// }

// function cleanUpRealtime(data) {
//   const result = Object.keys(data).map((key) => {
//     const rows = data[key].sort((row1, row2) => row2.up.localeCompare(row1.up));
//     const row = rows[0];
//     let cs = 0;
//     let vs = 0;
//     rows.forEach((item) => {
//       // eslint-disable-next-line no-bitwise
//       cs |= item.cs;
//       // eslint-disable-next-line no-bitwise
//       vs |= item.vs;
//     });
//     row.cs = cs;
//     row.vs = vs;
//     row.tf = filterTf(rows);
//     return row;
//   });
//   return result;
// }

function parseRealtimes(data) {
  const data1 = extractRealtime(data);
  const data2 = sortRealtime(data1);
  // const data3 = groupBySymbol(data2);
  // const data4 = cleanUpRealtime(data3);
  return data2;
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

function httpGet(dispatch, token, setIsLoading, setError, url, key, dataCleanup) {
  setError(false);
  setIsLoading(true);
  const bearerToken = makeBearToken(token);
  axios
    .get(url, bearerToken)
    .then((result) => {
      setIsLoading(false);
      setError(null);
      const users = dataCleanup(result);
      dispatch({ type: key, payload: users });
    })
    .catch((e) => {
      setIsLoading(false);
      setError(e.response);
      console.log('An error occurred:', e.response);
    });
}

function newsCleanup(result) {
  const rows = result.data.data;
  const results = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const row of rows) {
    try {
      const item = {
        news_on: row.attributes.created_at,
        headline: row.attributes.headline,
        summary: row.attributes.summary,
        sentiment: row.attributes.sentiment === undefined ? 0 : row.attributes.sentiment,
        url: row.attributes.url,
        symbols: row.attributes.symbols.toString()
      };
      results.push(item);
    } catch (e) {
      console.log('error: ', e, '  ', row);
    }
  }
  return results;
}

function getTop10News(dispatch, token, setIsLoading, setError) {
  const key = 'TOP10NEWS';
  const data = CookieGetTop10News();
  if (data === null) {
    const url = process.env.REACT_APP_NEWS_TOP10_URL || 'http://localhost:1337/api/newsitems';
    httpGet(dispatch, token, setIsLoading, setError, url, key, newsCleanup);
  } else dispatch({ type: key, payload: data });
}

function cleanupSymbols(result) {
  const data = GetUsers(result.data.data.attributes.data);
  return data;
}

function downloadSymbols(dispatch, token, setIsLoading, setError) {
  const key = 'SYMBOLS';
  const url = process.env.REACT_APP_SYMBOL_SERVICE || 'http://localhost:1337/api/symbols';
  httpGet(dispatch, token, setIsLoading, setError, url, key, cleanupSymbols);
  // setError(false);
  // setIsLoading(true);
  // const url1 = process.env.REACT_APP_SYMBOL_SERVICE || 'http://localhost:1337/api/symbols';
  // const bearerToken = makeBearToken(token);
  // axios
  //   .get(url1, bearerToken)
  //   .then((result) => {
  //     setIsLoading(false);
  //     setError(null);
  //     const users = GetUsers(result.data.data.attributes.data);
  //     dispatch({ type: 'SYMBOLS', payload: users });
  //   })
  //   .catch((e) => {
  //     setIsLoading(false);
  //     setError(e.response);
  //     console.log('An error occurred:', e.response);
  //   });
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

function downloadNewsData(pState, symbol, pushData) {
  const token = CookieGetToken();
  const url = process.env.REACT_APP_NEWS_URL || 'http://localhost:1337/api/newsstocks';
  const fullUrl = `${url}?symbol=${symbol}`;
  const bearerToken = makeBearToken(token);
  axios
    .get(fullUrl, bearerToken)
    .then((result) => {
      try {
        const dataArray = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const item of result.data.data) {
          dataArray.push(item.attributes);
        }
        const newData = pState;
        newData[symbol] = dataArray;
        pushData(newData);
      } catch (ex) {
        console.log('downloadNewsData(): An error occurred:', ex);
      }
    })
    .catch((e) => {
      console.log('downloadNewsData(): An error occurred:', e.response);
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
  getTop10News,
  getRealtimes,
  UserProvider,
  useUserState,
  useUserDispatch,
  loginUser,
  loginSuccess,
  signOut,
  downloadStockData,
  downloadNewsData,
  registerUser
};
