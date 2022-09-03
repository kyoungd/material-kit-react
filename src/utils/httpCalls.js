import axios from 'axios';
import { CookieGetToken } from './cookies';

function makeBearToken(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
}

export function httpGet(
  dispatch,
  token,
  setIsLoading,
  setError,
  url,
  dispatchKey,
  dispatchDefault,
  dataProcessFunc
) {
  setError(false);
  setIsLoading(true);
  const bearerToken = makeBearToken(token);
  axios
    .get(url, bearerToken)
    .then((result) => {
      console.log('>>>>>>> result:', result);
      setIsLoading(false);
      setError(null);
      try {
        // const jsondata = result.data.data;
        const jsondata = dataProcessFunc(result);
        dispatch({ type: dispatchKey, payload: jsondata });
      } catch (ex) {
        dispatch({ type: dispatchKey, payload: dispatchDefault });
      }
    })
    .catch((e) => {
      dispatch({ type: dispatchKey, payload: dispatchDefault });
      setIsLoading(false);
      setError(null);
    });
}

export function httpPostSilent(url, jsonbody, callbackFunc = null) {
  const token = CookieGetToken();
  const bearerToken = makeBearToken(token);
  axios
    .post(url, jsonbody, bearerToken)
    .then((result) => {
      try {
        if (callbackFunc) {
          callbackFunc(null, result);
        }
      } catch (ex) {
        if (callbackFunc) {
          callbackFunc(ex, null);
        }
      }
    })
    .catch((e) => {
      if (callbackFunc) {
        callbackFunc(e, null);
      }
    });
}

