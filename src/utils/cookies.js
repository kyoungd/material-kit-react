export function setWithExpiry(key, value, ttl) {
  const now = new Date();

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value,
    expiry: now.getTime() + ttl
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}

const keyToken = 'token';
const keySymbols = 'symbols';
const keyRealtimes = 'realtimes';
const keyFavorites = 'favorites';
const oneMinute = 1000 * 60;
const oneHour = 1000 * 60 * 60;

export function CookieSetToken(value) {
  setWithExpiry(keyToken, value, oneMinute * 30);
}

export function CookieSetFavorites(value) {
  setWithExpiry(keyFavorites, value, oneHour * 8);
}

export function CookieSetSymbols(value) {
  setWithExpiry(keySymbols, value, oneHour * 8);
}

export function CookieSetRealtimes(value) {
  setWithExpiry(keyRealtimes, value, oneHour * 8);
}

export function CookieUserAuthenticated() {
  return !!getWithExpiry(keyToken);
}

export function CookieGetToken() {
  const token = getWithExpiry(keyToken);
  if (token) {
    CookieSetToken(token); // refresh token
  } else {
    if (CookieGetFavorites()) CookieDeleteFavorites();
    if (CookieGetSymbols()) CookieDeleteSymbols();
  }
  return token;
}

export function CookieSignOut() {
  if (CookieGetFavorites()) CookieDeleteFavorites();
  if (CookieGetSymbols()) CookieDeleteSymbols();
  if (CookieGetToken()) CookieDeleteToken();
}

export function CookieGetFavorites() {
  return getWithExpiry(keyFavorites);
}

export function CookieGetSymbols() {
  return getWithExpiry(keySymbols);
}

export function CookieGetRealtimess() {
  return getWithExpiry(keyRealtimes);
}

export function CookieDeleteFavorites() {
  localStorage.removeItem(keyFavorites);
}

export function CookieDeleteSymbols() {
  localStorage.removeItem(keySymbols);
}

export function CookieDeleteRealtimes() {
  localStorage.removeItem(keyRealtimes);
}

export function CookieDeleteToken() {
  localStorage.removeItem(keyToken);
}
