class Cookie {
  static keyToken = 'token';

  static keySymbols = 'symbols';

  static keyRealtimes = 'realtimes';

  static keyTop10News = 'top10news';

  static keyFavorites = 'favorites';

  static keyTechniques = 'techniques';

  static keySchedule = 'schedule';

  static oneMinute = 1000 * 60;

  static oneHour = 1000 * 60 * 60;

  constructor() {
    this.cookies = {};
  }

  static expiry(name) {
    switch (name) {
      case Cookie.keyToken:
        return Cookie.oneHour;
      case Cookie.keySymbols:
        return Cookie.oneHour;
      case Cookie.keyRealtimes:
        return Cookie.oneHour;
      case Cookie.keyTop10News:
        return Cookie.oneHour;
      case Cookie.keyFavorites:
        return Cookie.oneHour;
      case Cookie.keyTechniques:
        return Cookie.oneHour;
      case Cookie.keySchedule:
        return Cookie.oneMinute * 30;
      default:
        return Cookie.oneMinnute * 30;
    }
  }

  static setWithExpiry(key, value, ttl = null) {
    if (!ttl) {
      ttl = Cookie.expiry(key);
    }

    const now = new Date();

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value,
      expiry: now.getTime() + ttl
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  static getDefault(key) {
    switch (key) {
      case Cookie.keyToken:
        return '';
      case Cookie.keySymbols:
        return {};
      case Cookie.keyRealtimes:
        return [];
      case Cookie.keyTop10News:
        return [];
      case Cookie.keyFavorites:
        return {};
      case Cookie.keyTechniques:
        return [];
      case Cookie.keySchedule:
        return [];
      default:
        return [];
    }
  }

  static getWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    // if the item doesn't exist, return null
    if (!itemStr) {
      return Cookie.getDefault(key);
      // return null;
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

  static signOut(isRemoveToken = true) {
    if (isRemoveToken) localStorage.removeItem(Cookie.keyToken);
    localStorage.removeItem(Cookie.keySymbols);
    localStorage.removeItem(Cookie.keyFavorites);
    localStorage.removeItem(Cookie.keyRealtimes);
    localStorage.removeItem(Cookie.keyTop10News);
    localStorage.removeItem(Cookie.keyTechniques);
    localStorage.removeItem(Cookie.keySchedule);
  }

  static token() {
    return Cookie.getWithExpiry(Cookie.keyToken);
  }

  static isAuthenticated() {
    const token = Cookie.token();
    return token && token.length > 0;
  }
}

export default Cookie;

// export function setWithExpiry(key, value, ttl) {
//   const now = new Date();

//   // `item` is an object which contains the original value
//   // as well as the time when it's supposed to expire
//   const item = {
//     value,
//     expiry: now.getTime() + ttl
//   };
//   localStorage.setItem(key, JSON.stringify(item));
// }

// export function getWithExpiry(key) {
//   const itemStr = localStorage.getItem(key);
//   // if the item doesn't exist, return null
//   if (!itemStr) {
//     return null;
//   }
//   const item = JSON.parse(itemStr);
//   const now = new Date();
//   // compare the expiry time of the item with the current time
//   if (now.getTime() > item.expiry) {
//     // If the item is expired, delete the item from storage
//     // and return null
//     localStorage.removeItem(key);
//     return null;
//   }
//   return item.value;
// }

// const keyToken = 'token';
// const keySymbols = 'symbols';
// const keyRealtimes = 'realtimes';
// const keyTop10News = 'top10news';
// const keyFavorites = 'favorites';
// const keyTechniques = 'techniques';
// const oneMinute = 1000 * 60;
// const oneHour = 1000 * 60 * 60;

// export function CookieSetToken(value) {
//   setWithExpiry(keyToken, value, oneHour * 2);
// }

// export function CookieSetFavorites(value) {
//   setWithExpiry(keyFavorites, value, oneMinute * 10);
// }

// export function CookieSetSymbols(value) {
//   setWithExpiry(keySymbols, value, oneHour * 8);
// }

// export function CookieSetRealtimes(value) {
//   setWithExpiry(keyRealtimes, value, oneHour * 8);
// }

// export function CookieSetTechniques(value) {
//   setWithExpiry(keyTechniques, value, oneHour * 2);
// }

// export function CookieSetTop10News(value) {
//   setWithExpiry(keyTop10News, value, oneMinute * 5);
// }

// export function CookieUserAuthenticated() {
//   return !!getWithExpiry(keyToken);
// }

// export function CookieGetToken() {
//   const token = getWithExpiry(keyToken);
//   if (token) {
//     CookieSetToken(token); // refresh token
//   } else {
//     CookieSignOut();
//   }
//   return token;
// }

// export function CookieSignOut() {
//   if (CookieGetToken()) localStorage.removeItem(keyToken);
//   if (CookieGetSymbols()) localStorage.removeItem(keySymbols);
//   if (CookieGetFavorites()) localStorage.removeItem(keyFavorites);
//   if (CookieGetRealtimess()) localStorage.removeItem(keyRealtimes);
//   if (CookieGetTop10News()) localStorage.removeItem(keyTop10News);
//   if (CookieGetTechniques()) localStorage.removeItem(keyTechniques);
// }

// export function CookieGetFavorites() {
//   return getWithExpiry(keyFavorites);
// }

// export function CookieGetSymbols() {
//   return getWithExpiry(keySymbols);
// }

// export function CookieGetRealtimess() {
//   return getWithExpiry(keyRealtimes);
// }

// export function CookieGetTop10News() {
//   return getWithExpiry(keyTop10News);
// }

// export function CookieGetTechniques() {
//   return getWithExpiry(keyTechniques);
// }
