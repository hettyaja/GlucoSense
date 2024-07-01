// app/service/spoonacularApi.js
import axios from 'axios';

const SPOONACULAR_API_KEY = '4e1c338b376a418da960c802f1c27069';

export const fetchRecipes = async (query) => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        query: query,
        number: 10
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const fetchRecipeDetails = async (id) => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
};
