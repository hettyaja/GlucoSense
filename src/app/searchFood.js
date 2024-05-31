import { Stack, router } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { searchFood } from '../../server';
import Ionicons from 'react-native-vector-icons/Ionicons'

const searchFoodPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const data = await searchFood(query);
      setResults(data.hints);
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  };

  return (
    <>
        <Stack.Screen options={{
        title: 'Search food',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold'},
        headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name='chevron-back' size={24} color='white'/>
            </TouchableOpacity>
        ),headerRight: () => (
            <TouchableOpacity style={styles.button} onPress={() => router.back()}>
                <Text style={{padding:2, marginHorizontal:8, fontFamily: 'Poppins-SemiBold', fontSize:16, color:'white'}}>Save</Text>
            </TouchableOpacity>
        ),
        headerTitle: 'Search food',
        headerTitleAlign: 'center',
    }}/>

    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for food"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={results}
        keyExtractor={(item) => item.food.foodId}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.foodName}>{item.food.label}</Text>
            <Text style={styles.foodCategory}>Category: {item.food.category}</Text>
            {item.food.nutrients && (
              <View>
                {item.food.nutrients.ENERC_KCAL !== undefined && (
                  <Text style={styles.foodNutrient}>Calories: {item.food.nutrients.ENERC_KCAL} kcal</Text>
                )}
                {item.food.nutrients.FAT !== undefined && (
                  <Text style={styles.foodNutrient}>Fat: {item.food.nutrients.FAT} g</Text>
                )}
                {item.food.nutrients.PROCNT !== undefined && (
                  <Text style={styles.foodNutrient}>Protein: {item.food.nutrients.PROCNT} g</Text>
                )}
                {item.food.nutrients.CHOCDF !== undefined && (
                  <Text style={styles.foodNutrient}>Carbohydrates: {item.food.nutrients.CHOCDF} g</Text>
                )}
              </View>
            )}
          </View>
        )}
      />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  item: {
    padding: 8,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  foodName: {
    fontSize: 18,
  },
  foodCategory: {
    color: 'gray',
  },
  foodNutrient: {
    color: 'black',
  },
});

export default searchFoodPage;
