import { faker } from '@faker-js/faker';
// import { sample } from 'lodash';
// utils
// import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

// export const USERLIST = [...Array(24)].map((_, index) => ({
//   id: faker.datatype.uuid(),
//   avatarUrl: mockImgAvatar(index + 1),
//   name: faker.name.findName(),
//   company: faker.company.companyName(),
//   isVerified: faker.datatype.boolean(),
//   status: sample(['active', 'banned']),
//   role: sample([
//     'Leader',
//     'Hr Manager',
//     'UI Designer',
//     'UX Designer',
//     'UI/UX Designer',
//     'Project Manager',
//     'Backend Developer',
//     'Full Stack Designer',
//     'Front End Developer',
//     'Full Stack Developer'
//   ])
// }));

// const stocksIn = {
//   ADBE: {
//     filteratr: true,
//     atr: 20.52,
//     close: 567.06,
//     avgatr: 24.66,
//     trendup: false,
//     trenddown: false,
//     keylevel: false,
//     fibonachi: true,
//     threebars: false
//   },
//   ACWI: {
//     filteratr: true,
//     atr: 1.13,
//     close: 105.78,
//     avgatr: 1.32,
//     trendup: true,
//     trenddown: false,
//     keylevel: false,
//     fibonachi: true,
//     threebars: false
//   },
//   ABNB: {
//     filteratr: false,
//     atr: 7.74,
//     close: 166.49,
//     avgatr: 8.95,
//     trendup: false,
//     trenddown: false,
//     keylevel: false,
//     fibonachi: false,
//     threebars: false
//   },
//   AAPL: {
//     filteratr: true,
//     atr: 3.98,
//     close: 177.57,
//     avgatr: 4.59,
//     trendup: true,
//     trenddown: false,
//     keylevel: false,
//     fibonachi: false,
//     threebars: false
//   },
//   ADI: {
//     filteratr: true,
//     atr: 3.83,
//     close: 175.77,
//     avgatr: 4.56,
//     trendup: true,
//     trenddown: false,
//     keylevel: false,
//     fibonachi: true,
//     threebars: false
//   }
// };

export function GetUsers(stocksIn) {
  const users = [];

  Object.keys(stocksIn).forEach((key) => {
    const id = faker.datatype.uuid();
    const name = key;
    const stock = stocksIn[key];
    const {
      ad,
      atr,
      avgatr,
      cik,
      corr,
      cinv,
      relvol,
      volume,
      vpro,
      td,
      engulf,
      keylevel,
      keylevels,
      fibonachi,
      fibs,
      ema20,
      ema50,
      ema200,
      gap,
      gaps,
      dtop,
      ogap,
      oc,
      rsi,
      trend,
      reverse,
      vc,
      wr,
      wh,
      pj,
      vs,
      floats,
      floatp
    } = stock;
    const price = stock.close;
    const row = {
      id,
      ad,
      name,
      atr,
      avgatr,
      cik,
      corr,
      cinv,
      price,
      trend,
      reverse,
      keylevel,
      keylevels,
      fibonachi,
      fibs,
      relvol,
      vpro,
      td,
      engulf,
      volume,
      ema20,
      ema50,
      ema200,
      rsi,
      gap,
      gaps,
      dtop,
      ogap,
      oc,
      vc,
      wr,
      wh,
      pj,
      vs,
      floats,
      floatp
    };
    users.push(row);
  });
  return users;
}

// export default users;
