// import experts from '../layouts/Experts/experts.json';
import expertsDb from '../layouts/Experts/experts_db.json';

const standarizeDetail = (data) => {
  const results = [];
  data.forEach((item) => {
    results.push({
      ...item.attributes,
      image: standarizePhoto(item.attributes.photo, 'medium')
    });
  });
  return results;
};

const standarizePhoto = (photo, size) => {
  try {
    return process.env.REACT_APP_BACKEND_URL + photo.data.attributes.formats[size].url;
  } catch (e) {
    return '';
  }
};

const standarizeMe = (data) => {
  const std = data.data.map((item) => {
    const row = {
      id: item.id,
      cover: standarizePhoto(item.attributes.photo, 'medium'),
      name: item.attributes.name,
      videoUrl: item.attributes.video,
      description: item.attributes.description,
      price: item.attributes.price,
      priceSale: item.attributes.sales_price,
      colors: '#FF4842',
      access: item.attributes.access,
      status: item.attributes.status,
      link: '/dashboard/expert',
      features: {
        id: item.id,
        person: {
          product: item.attributes.name,
          name: item.attributes.techName,
          summary: item.attributes.techSummary,
          description: item.attributes.techDescription,
          image: standarizePhoto(item.attributes.techPhoto, 'medium')
        },
        data: standarizeDetail(item.attributes.technique_details.data),
        sales: {
          price: item.attributes.price,
          priceSale: item.attributes.sales_price,
          access: item.attributes.access,
          status: item.attributes.status
        }
      }
    };
    return row;
  });
  return std;
};

const experts = standarizeMe(expertsDb);

// const experts = [
//   {
//     id: 101,
//     cover: '/static/mock-images/covers/expert_1.png',
//     name: 'SWING TRADE',
//     videoUrl: 'N9SUmtuGnHQ',
//     description:
//       'These tools are deisgned for swing-trades.  We prefer to trend-trading and this application is good for finding new trends.  There are other tools like volume spread analysis, double top, overnight gap and others.',
//     price: 0,
//     priceSale: 0,
//     colors: '#FF4842',
//     status: '',
//     link: '/dashboard/favorites?id=101'
//   },
//   {
//     id: 102,
//     cover: '/static/mock-images/covers/expert_2.jpg',
//     name: 'INTRADAY TRADE',
//     videoUrl: 'C9G5KgB9Ze4',
//     description:
//       'This one searches the 15-minute bars to detect a certain pattern.  It flags stocks that are near support-resistance, ABC pattern, Pivot Point and VSA.  There are too much noise in smaller time frames.',
//     price: 0,
//     priceSale: 0,
//     colors: '#FF4842',
//     status: '',
//     link: '/dashboard/favorites?id=102'
//   },
//   {
//     id: 103,
//     cover: '/static/mock-images/covers/expert_3.png',
//     name: 'VOLUME PROFILE',
//     videoUrl: '2BVGAz2Jd5w',
//     description:
//       'A unique day trading technique.  Volume profile shows us where the market is going to be strong and where it is going to be weak.  There are certain predictable trader reaction to volume, combined with price action, that can be used to position yourself for the next big move.',
//     price: 0,
//     priceSale: 0,
//     colors: '#FF4842',
//     status: '',
//     link: '/dashboard/favorites?id=103'
//   }
// ];

export default experts;
