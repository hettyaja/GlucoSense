import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FoodDetails = () => {
  const { item } = useLocalSearchParams();
  const parsedItem = JSON.parse(item);
  const [servings, setServings] = useState(1);

  if (!parsedItem || !parsedItem.food) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No item data available.</Text>
      </View>
    );
  }

  const food = parsedItem.food;
  const nutrients = food.nutrients;

  const handleIncrease = () => setServings((prev) => prev + 1);
  const handleDecrease = () => setServings((prev) => (prev > 1 ? prev - 1 : 1));

  const handleSave = () => {
    const mealData = {
      label: food.label,
      category: food.category,
      servings,
      calories: (nutrients.ENERC_KCAL * servings).toFixed(2),
      fat: (nutrients.FAT * servings).toFixed(2),
      protein: (nutrients.PROCNT * servings).toFixed(2),
      carbs: (nutrients.CHOCDF * servings).toFixed(2),
    };

    router.push({
      pathname: '/addMeals',
      params: { mealData: JSON.stringify(mealData) },
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Add meal',
          headerStyle: { backgroundColor: '#E58B68' },
          headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold' },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name='chevron-back' size={24} color='white' />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={{ padding: 2, marginHorizontal: 8, fontFamily: 'Poppins-SemiBold', fontSize: 16, color: 'white' }}>Save</Text>
            </TouchableOpacity>
          ),
          headerTitle: 'Add meal',
          headerTitleAlign: 'center',
        }}
      />

      <View style={styles.container}>
        <Text style={styles.title}>{food.label}</Text>
        <Text>Category: {food.category}</Text>

        <View style={styles.servingContainer}>
          <Button title="-" onPress={handleDecrease} />
          <Text style={styles.servingText}>Servings: {servings}</Text>
          <Button title="+" onPress={handleIncrease} />
        </View>

        {nutrients && (
          <View style={styles.nutrientContainer}>
            {nutrients.ENERC_KCAL !== undefined && (
              <Text>Calories: {(nutrients.ENERC_KCAL * servings).toFixed(2)} kcal</Text>
            )}
            {nutrients.FAT !== undefined && (
              <Text>Fat: {(nutrients.FAT * servings).toFixed(2)} g</Text>
            )}
            {nutrients.PROCNT !== undefined && (
              <Text>Protein: {(nutrients.PROCNT * servings).toFixed(2)} g</Text>
            )}
            {nutrients.CHOCDF !== undefined && (
              <Text>Carbohydrates: {(nutrients.CHOCDF * servings).toFixed(2)} g</Text>
            )}
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  servingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  servingText: {
    marginHorizontal: 16,
    fontSize: 18,
  },
  nutrientContainer: {
    marginTop: 16,
  },
  button: {
    // Add styles for your button if needed
  },
});

export default FoodDetails;
