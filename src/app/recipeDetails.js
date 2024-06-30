// app/recipeDetails.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { fetchRecipeDetails } from './service/spoonacularAPI';

const RecipeDetails = () => {
  const { recipeId } = useLocalSearchParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipeData = await fetchRecipeDetails(recipeId);
        setRecipe(recipeData);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchData();
  }, [recipeId]);

  if (!recipe) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.sectionTitle}>Ingredients:</Text>
      {recipe.extendedIngredients.map((ingredient) => (
        <Text key={ingredient.id} style={styles.text}>{ingredient.original}</Text>
      ))}
      <Text style={styles.sectionTitle}>Instructions:</Text>
      {recipe.analyzedInstructions[0]?.steps.map((step, index) => (
        <Text key={index} style={styles.text}>{index + 1}. {step.step}</Text>
      ))}
    </ScrollView>
  );
};

export default RecipeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 20,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop: 5,
  },
});
