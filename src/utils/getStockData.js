function dateFormat(date, fstr, utc) {
  utc = utc ? 'getUTC' : 'get';
  return fstr.replace(/%[YmdHMS]/g, (m) => {
    switch (m) {
      case '%Y':
        return date[`${utc}FullYear`](); // no leading zeros required
      case '%m':
        m = 1 + date[`${utc}Month`]();
        break;
      case '%d':
        m = date[`${utc}Date`]();
        break;
      case '%H':
        m = date[`${utc}Hours`]();
        break;
      case '%M':
        m = date[`${utc}Minutes`]();
        break;
      case '%S':
        m = date[`${utc}Seconds`]();
        break;
      default:
        return m.slice(1); // unknown code, remove %
    }
    // add leading zero if required
    return `0${m}`.slice(-2);
  });
}

export default function getStockData(pState, symbol = 'MSFT', pushData, pushSymbol) {
  // iso time string for EST

  const apiKey = process.env.REACT_APP_APCA_API_KEY_ID || 'AKAV2Z5H0NJNXYF7K24D';
  const apiSecret =
    process.env.REACT_APP_APCA_API_SECRET_KEY || '262cAEeIRrL1KEZYKSTjZA79tj25XWrMtvz0Bezu';
  const apiUrl = process.env.REACT_APP_APCA_URL || 'https://data.alpaca.markets/v2/stocks';
  const apiTimeFrame = process.env.REACT_APP_APCA_TIMEFRAME || 'day';
  // const start = '2021-09-03T07:20:50.52Z';
  // const end = '2021-09-04T07:20:50.52Z';
  const afterDate = new Date();
  const today = dateFormat(afterDate, '%Y-%m-%dT%H:%M:%S.000Z', false);
  // yesterdate date string
  const beforeDate = new Date(afterDate.setDate(afterDate.getDate() - 360));
  const yesterday = dateFormat(beforeDate, '%Y-%m-%dT%H:%M:%S.000Z', false);
  const apiurl = `${apiUrl}/${symbol}//bars?start=${yesterday}&end=${today}&timeframe=${apiTimeFrame}`;
  fetch(apiurl, {
    method: 'GET',
    headers: {
      'APCA-API-KEY-ID': apiKey,
      'APCA-API-SECRET-KEY': apiSecret
    }
  })
    .then((response) => response.text())
    .then((data) => {
      const objs = JSON.parse(data);
      const dataArray = [];
      objs.bars.forEach((item) => {
        dataArray.push({
          date: new Date(item.t),
          open: item.o,
          high: item.h,
          low: item.l,
          close: item.c,
          volume: item.v
        });
      });
      const newData = pState;
      newData[symbol] = dataArray;
      pushData(newData);
      pushSymbol(symbol);
    })
    .catch((error) => {
      console.log(error);
    });
}
