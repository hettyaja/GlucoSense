// RecipeCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const RecipeCard = ({ recipe }) => {
  return (
    <View style={styles.card}>
      {recipe.image && <Image source={{ uri: recipe.image }} style={styles.image} />}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.price}>${recipe.price}</Text>
        <Text style={styles.serves}>Sold: {recipe.serves}</Text>
        {/* Render ingredients and methods if needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
  },
  infoContainer: {
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
  serves: {
    fontSize: 14,
    color: '#555',
  },
  time: {
    fontSize: 14,
    color: '#555',
  },
});

export default RecipeCard;
