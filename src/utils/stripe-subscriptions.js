import axios from 'axios';
import Cookie from './cookies';

// export async function getPrices() {
//   const { data } = await axios.get('/prices');
//   data.forEach((price) => {
//     price.nickname = price.product.name;
//     return price;
//   });
//   console.log('prices get request', data);
//   return data;
// }

function makeBearToken(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
}

async function getPrices(token) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/get-available-services`;
  const { data } = await axios.get(url, makeBearToken(token));
  return data.data;
}

async function getSubs(token) {
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/get-subscriptions`;
  const { data } = await axios.get(url, makeBearToken(token));
  return data.data.attributes.data;
}

export async function getSubscriptions() {
  const token = Cookie.token();

  const data = await getPrices(token);
  const subs = await getSubs(token);
  console.log('here', subs);
  // eslint-disable-next-line no-restricted-syntax
  for (const sub of subs) {
    const row = data.find((price) => price.id === sub.plan.id);
    sub.plan.nickname = row && row.attributes ? row.attributes.product.name : 'Deleted Plan';
  }
  console.log('prices get request', subs);
  return subs;
}

export async function getSubscriptionManagement() {
  const token = Cookie.token();
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/get-subscription-portal`;
  const { data } = await axios.get(url, makeBearToken(token));
  return data.data.attributes.url;
}
