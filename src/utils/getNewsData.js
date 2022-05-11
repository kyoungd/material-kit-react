export default function getNewsData(pState, symbol = 'MSFT', pushNews) {
  // iso time string for EST

  const apiKey = process.env.REACT_APP_APCA_API_KEY_ID || 'AKAV2Z5H0NJNXYF7K24D';
  const apiSecret =
    process.env.REACT_APP_APCA_API_SECRET_KEY || '262cAEeIRrL1KEZYKSTjZA79tj25XWrMtvz0Bezu';
  const newsUrl =
    process.env.REACT_APP_NEWS_URL || 'https://simp-admin.herokuapp.com/api/newsstocks';
  const apiurl = `${newsUrl}?symbol=${symbol}`;
  fetch(apiurl, {
    method: 'GET',
    headers: {
      'APCA-API-KEY-ID': apiKey,
      'APCA-API-SECRET-KEY': apiSecret
    }
  })
    .then((response) => response.data())
    .then((dataArray) => {
      const newData = pState;
      newData[symbol] = dataArray;
      pushNews(newData);
    })
    .catch((error) => {
      console.log(error);
    });
}
