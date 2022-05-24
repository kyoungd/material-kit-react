import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgProduct } from '../utils/mockImages';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'Morning Gapper',
  'Overview - Day Trading',
  'ABCD Pattern, Live Trading',
  'Engulfing Candles, Live Trading',
  'Reversal, New Trend',
  'ABCD Pattern',
  'ABCD Pattern',
  'Morning Gapper',
  'Top 10 News',
  'Reversal, New Trend',
  'Reversal, New Trend',
  'Reversal, New Trend',
  'Reversal, New Trend',
  'Gap',
  'Reversal, New Trend'
];
const VIDEO_URL = [
  'OSzCJ94I8ZU',
  'rF-QcJwdN44',
  '8x6Q7jCSwAw',
  'qhBdPNJNv7o',
  'O4aps4HI5Io',
  'sbOvh3qg7uo',
  '76OvD8v0j_4',
  'qu0f6d2YPXY',
  'Y_fDUpF08Hg',
  'nON0dw8d_io',
  'b5fJfVE188I',
  'up2rhqdUSS4',
  'h3sYbUUpoFA',
  '9tTaKcmuN3Y',
  'HPoHNpuXcTo'
];
const PRODUCT_COLOR = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107'
];

// ----------------------------------------------------------------------
// price: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
// priceSale: setIndex % 3 ? null : faker.datatype.number({ min: 19, max: 29, precision: 0.01 }),

const videoTotals = VIDEO_URL.length;
const products = [...Array(videoTotals)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    cover: mockImgProduct(setIndex),
    name: PRODUCT_NAME[index],
    videoUrl: VIDEO_URL[index],
    price: 0,
    priceSale: 0,
    colors:
      (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
      (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
      (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
      (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
      (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
      (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
      PRODUCT_COLOR,
    status: ''
    // status: sample(['sale', 'new', '', ''])
  };
});

export default products;
