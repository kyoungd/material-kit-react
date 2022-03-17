import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgProduct } from '../utils/mockImages';

// ----------------------------------------------------------------------
// status: ['sale', 'new', '', '']

const EXPERTS = [
  {
    title: 'CONFLUENCE',
    description:
      'Using a combination of multiple technical analysis that all points to the same direction to position yourself for the next big move with better odds. It is the basics of all technical analysis.',
    cover: '/static/mock-images/covers/expert_1.png',
    videlUrl: 'N9SUmtuGnHQ',
    link: 'expert/confluence',
    price: '',
    priceSale: '',
    freeTrial: true,
    status: ''
  },
  {
    title: 'MARKET CYCLE',
    description:
      'Wyckoff method improves market timing when establishing a position in anticipation of a coming move where a favorable reward/risk ratio exists.  Work with the market makers, not against them',
    cover: '/static/mock-images/covers/expert_2.jpg',
    videlUrl: 'C9G5KgB9Ze4',
    link: 'expert/market-cycle',
    price: '',
    priceSale: '',
    freeTrial: true,
    status: ''
  },
  {
    title: 'VOLUME PROFILE',
    description:
      'A unique day trading technique.  Volume profile shows us where the market is going to be strong and where it is going to be weak.  There are certain predictable trader reaction to volume, combined with price action, that can be used to position yourself for the next big move.',
    cover: '/static/mock-images/covers/expert_3.png',
    videlUrl: '2BVGAz2Jd5w',
    link: 'expert/market-cycle',
    price: 99.95,
    priceSale: 109.95,
    freeTrial: true,
    status: ''
  }
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

const experts = [...Array(3)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    cover: EXPERTS[index].cover,
    name: EXPERTS[index].title,
    videoUrl: EXPERTS[index].videlUrl,
    description: EXPERTS[index].description,
    price: EXPERTS[index].price,
    priceSale: EXPERTS[index].priceSale,
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

export default experts;
