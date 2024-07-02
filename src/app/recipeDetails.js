import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { fetchRecipeDetails } from './service/spoonacularAPI';
import Header from '../components/Header';

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

  const getNutrient = (name) => {
    const nutrient = recipe.nutrition.nutrients.find(n => n.name.toLowerCase() === name.toLowerCase());
    return nutrient ? `${nutrient.amount} ${nutrient.unit}` : 'N/A';
  };

  return (
    <>
      <Header
        title='Recipe details'
        leftButton='Back'
      />
      <ScrollView style={styles.container}>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        <View style={styles.body}>
          <Text style={styles.title}>{recipe.title}</Text>
          <View style={styles.nutritionSection}>
            <View style={styles.nutritionItem}>
              <Text style={styles.sectionTitle}>Protein</Text>
              <Text style={styles.text}>{getNutrient('Protein')}</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.sectionTitle}>Calorie</Text>
              <Text style={styles.text}>{getNutrient('Calories')}</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.sectionTitle}>Fat</Text>
              <Text style={styles.text}>{getNutrient('Fat')}</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.sectionTitle}>Carbs</Text>
              <Text style={styles.text}>{getNutrient('Carbohydrates')}</Text>
            </View>
          </View>
          <Text style={styles.sectionTitle}>Ingredients:</Text>
          {recipe.extendedIngredients.map((ingredient, index) => (
            <Text key={ingredient.id} style={styles.text}>{index + 1}. {ingredient.original}</Text>
          ))}
          <Text style={styles.sectionTitle}>Instructions:</Text>
          {recipe.analyzedInstructions[0]?.steps.map((step, index) => (
            <Text key={index} style={styles.text}>{index + 1}. {step.step}</Text>
          ))}

        </View>
      </ScrollView>
    </>
  );
};

export default RecipeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200
  },
  body: {
    padding: 16
  },
  nutritionSection: {
    flexDirection:'row',
    justifyContent:'space-between'
  },
  nutritionItem: {
    alignItems:'center'
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold'
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
