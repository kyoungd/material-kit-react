import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgProduct } from '../utils/mockImages';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'WHAT WE DO',
  '30 MINUTES A DAY',
  'ADVANCED OPERATION',
  'PRICE ACTION',
  'TREND REVERSAL',
  'NEW TREND',
  'DOUBLE TOPS',
  'VOLUME CLIMAX',
  'WYCKOFF PRICE CYCLE',
  'VOLUME PROFILE CENTER OF CONTROL'
];
const VIDEO_URL = [
  'QH2-TGUlwu4',
  'QH2-TGUlwu4',
  'QH2-TGUlwu4',
  'asDBegQaupM',
  'QH2-TGUlwu4',
  'QH2-TGUlwu4',
  'QH2-TGUlwu4',
  'QH2-TGUlwu4',
  'QH2-TGUlwu4',
  'QH2-TGUlwu4'
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

const products = [...Array(10)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    cover: mockImgProduct(setIndex),
    name: PRODUCT_NAME[index],
    videoUrl: VIDEO_URL[index],
    price: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
    priceSale: setIndex % 3 ? null : faker.datatype.number({ min: 19, max: 29, precision: 0.01 }),
    colors:
      (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
      (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
      (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
      (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
      (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
      (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
      PRODUCT_COLOR,
    status: sample(['sale', 'new', '', ''])
  };
});

export default products;
