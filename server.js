import axios from 'axios';

const APP_ID = '63c843fa';  // Replace with your actual App ID
const APP_KEY = '1344b0e3f02c8f589fe0ad16c5046070';  // Replace with your actual App Key

const instance = axios.create({
  baseURL: 'https://api.edamam.com/api/food-database/v2',
  params: {
    app_id: APP_ID,
    app_key: APP_KEY,
  },
});

const searchFood = async (query) => {
  try {
    const response = await instance.get('/nutrients', {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching for food:', error);
    throw error;
  }
};

export { searchFood };
