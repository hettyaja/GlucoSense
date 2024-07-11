import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DietPlanCard = ({ dietPlan }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.day}>{dietPlan.day}</Text>
      <View style={styles.meal}>
        <Text style={styles.mealTitle}>Lunch</Text>
        {dietPlan.meals.lunch.image && <Image source={{ uri: dietPlan.meals.lunch.image }} style={styles.mealImage} />}
        <Text style={styles.mealDetails}>{dietPlan.meals.lunch.title}</Text>
        <Text style={styles.mealDetails}>{dietPlan.meals.lunch.description}</Text>
        <Text style={styles.mealDetails}>{dietPlan.meals.lunch.ingredients}</Text>
      </View>
      <View style={styles.meal}>
        <Text style={styles.mealTitle}>Dinner</Text>
        {dietPlan.meals.dinner.image && <Image source={{ uri: dietPlan.meals.dinner.image }} style={styles.mealImage} />}
        <Text style={styles.mealDetails}>{dietPlan.meals.dinner.title}</Text>
        <Text style={styles.mealDetails}>{dietPlan.meals.dinner.description}</Text>
        <Text style={styles.mealDetails}>{dietPlan.meals.dinner.ingredients}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 20, backgroundColor: '#fff', borderRadius: 10, marginVertical: 10 },
  day: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  meal: { marginTop: 10 },
  mealTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  mealImage: { width: 100, height: 100, borderRadius: 10, marginBottom: 10 },
  mealDetails: { fontSize: 14, color: '#333' },
});

export default DietPlanCard;
