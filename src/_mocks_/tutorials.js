import faker from 'faker';
// utils
import { mockImgTutorial } from '../utils/mockImages';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'Overview',
  'Overview - Swing Trade',
  'Overview - Day Trading',
  'Explainer - ABCD Pattern',
  'How to login to the platform',
  'How to use the Swing Trade, New Trend option',
  'How to use the Swing Trade, Volume Analysis option',
  'How to use the Swing Trade, Wyckoff Cycle option',
  'How to use the Swing Trade, Morning Gapper option'
];
const VIDEO_URL = [
  '9Pc226w3HFM',
  '0XIjoHJWLgs',
  'rF-QcJwdN44',
  'zYzWcT4zmzk',
  'XvoV_cPJ08s',
  '5Y4DzHU5pi8',
  'keYcPnSxjkc',
  'h_VcYDQvnVE',
  'PfmpHd3u7o0'
];
const PRODUCT_COLOR = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
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
const tutorialVideos = [...Array(videoTotals)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    cover: mockImgTutorial(setIndex),
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
    status: '',
    link: '#'
    // status: sample(['sale', 'new', '', ''])
  };
});

export default tutorialVideos;
