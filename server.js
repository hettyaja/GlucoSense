import axios from 'axios';

const APP_ID = '63c843fa';
const APP_KEY = 'eea81fc900d0926e1205185e709211ba'; 

const instance = axios.create({
  baseURL: 'https://api.edamam.com/api/food-database/v2/parser',
  params: {
    app_id: APP_ID,
    app_key: APP_KEY,
    'nutrition-type': 'cooking',
  },
});

const searchFood = async (keyword)=>{
  try{
    // Make the GET request to the API with the keyword
    const response = await instance.get('', {
      params: {
        ingr: keyword, // The keyword from the text box
      },
    });

    return response.data;
  }catch (error) {
     console.error('Error searching for food:', error);
     throw error;
   }
};

// Function to search for foods starting with a specific word
async function searchFoods(keyword) {
  try {
    // Make the GET request to the API with the keyword
    const response = await instance.get('', {
      params: {
        ingr: keyword, // The keyword from the text box
      },
    });

    // Extract and display the relevant food items from the response
    const foods = response.data.hints.map(hint => hint.food.label);
    console.log('Foods starting with', keyword, ':', foods);
  } catch (error) {
    console.error('Error fetching foods:', error);
  }
}

export { searchFood };
