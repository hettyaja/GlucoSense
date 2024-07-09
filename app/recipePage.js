// app/recipePage.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, Button } from 'react-native';
import { router } from 'expo-router';
import { fetchRecipes } from './service/spoonacularAPI';
import Header from './components/Header';

const recipePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipeList = await fetchRecipes(query);
        setRecipes(recipeList);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchData();
  }, [query]);

  const handleSearch = async () => {
    try {
      const recipeList = await fetchRecipes(query);
      setRecipes(recipeList);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };




  const handleBackButton = () => {
    router.back()
  }

  return (
    <>
      <Header
        title='Recipe'
        leftButton='Back'
        onLeftButtonPress={() => handleBackButton()}
      />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
            <TextInput
            style={styles.searchInput}
            placeholder="Search Recipe"
            value={query}
            onChangeText={setQuery}
            />
            {/* <Button title="Search" onPress={handleSearch} /> */}
        </View>
        <Text style={styles.title}>Recommended for you</Text>
        <View style={styles.recipeList}>
            {recipes.map((recipe) => (
            <TouchableOpacity
                key={recipe.id}
                style={styles.recipeItem}
                onPress={() => router.push({
                pathname: '/recipeDetails',
                params: { recipeId: recipe.id }
                })}
            >
                <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
            </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recipeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  recipeItem: {
    width: '48%',
    marginBottom: 20,
  },
  recipeImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  recipeTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default recipePage;
