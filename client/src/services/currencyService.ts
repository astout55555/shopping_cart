import axios from 'axios';

// // using the API key causes a CORS error for some reason? for reference:
// const BASE_URL = 'https://open.er-api.com/v6';
// const API_KEY = import.meta.env.EXCHANGE_RATE_API_KEY;
// const getUSDToEURExchangeRate = async () => {
//   const response = await axios.get(`${BASE_URL}/${API_KEY}/latest/USD`);
//   return response.data.rates.EUR;
// };

const BASE_URL = "https://open.er-api.com/v6/latest/USD";

const getUSDToEURExchangeRate = async () => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data.rates.EUR;
};

export default {
  getUSDToEURExchangeRate,
};
