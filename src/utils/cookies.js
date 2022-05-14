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
const keyTop10News = 'top10news';
const keyFavorites = 'favorites';
const oneMinute = 1000 * 60;
const oneHour = 1000 * 60 * 60;

export function CookieSetToken(value) {
  setWithExpiry(keyToken, value, oneHour * 2);
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

export function CookieSetTop10News(value) {
  setWithExpiry(keyTop10News, value, oneHour * 8);
}

export function CookieUserAuthenticated() {
  return !!getWithExpiry(keyToken);
}

export function CookieGetToken() {
  const token = getWithExpiry(keyToken);
  if (token) {
    CookieSetToken(token); // refresh token
  } else {
    CookieSignOut();
  }
  return token;
}

export function CookieSignOut() {
  if (CookieGetToken()) localStorage.removeItem(keyToken);
  if (CookieGetSymbols()) localStorage.removeItem(keySymbols);
  if (CookieGetFavorites()) localStorage.removeItem(keyFavorites);
  if (CookieGetRealtimess()) localStorage.removeItem(keyRealtimes);
  if (CookieGetTop10News()) localStorage.removeItem(keyTop10News);
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

export function CookieGetTop10News() {
  return getWithExpiry(keyTop10News);
}
