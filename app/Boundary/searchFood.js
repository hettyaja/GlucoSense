import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { searchFood } from '../../server';
import { router} from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Header from '../components/Header';

const handleBackButton = () => {
  router.back();
};

const searchFoodPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const router = useRouter();

  const handleSearch = async () => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    try {
      const data = await searchFood(query);
      // Filter out duplicates
      const uniqueResults = [];
      const names = new Set();
      data.hints.forEach(item => {
        if (!names.has(item.food.label)) {
          uniqueResults.push(item);
          names.add(item.food.label);
        }
      });
      setResults(uniqueResults);
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  };

  const handleItemPress = (item) => {
    console.log('Selected item:', item);
    router.push({
      pathname: 'foodDetails', // Ensure this matches the name of your detail page route
      params: { item: JSON.stringify(item) },
    });
  };

  const formatNumber = (number) => {
    return number.toFixed(2);
  };

  return (
    <>
      <Header
        title='Meal'
        leftButton='Back'
        onLeftButtonPress={() => handleBackButton()}
      />

      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Fontisto name="search" size={16} style={styles.icons} />
          <TextInput
            style={styles.input}
            placeholder="Search food"
            value={query}
            onChangeText={setQuery}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        {results.length === 0 ? (
          <View style={styles.placeholderContainer}>
            <Image
              source = {require('../app/assets/foodIcon.png')}
              style = {styles.imageIcon}
            />
            <Text style={styles.placeholderText}>Add Food or Drink</Text>
          </View>
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item, index) => item.food.foodId + index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
                <Text style={styles.foodName}>{item.food.label}</Text>
                <Text style={styles.foodCategory}>Category: {item.food.category}</Text>
                {item.food.nutrients && (
                  <View>
                    {item.food.nutrients.ENERC_KCAL !== undefined && (
                      <Text style={styles.foodNutrient}>Calories: {formatNumber(item.food.nutrients.ENERC_KCAL)} kcal</Text>
                    )}
                    {item.food.nutrients.FAT !== undefined && (
                      <Text style={styles.foodNutrient}>Fat: {formatNumber(item.food.nutrients.FAT)} g</Text>
                    )}
                    {item.food.nutrients.PROCNT !== undefined && (
                      <Text style={styles.foodNutrient}>Protein: {formatNumber(item.food.nutrients.PROCNT)} g</Text>
                    )}
                    {item.food.nutrients.CHOCDF !== undefined && (
                      <Text style={styles.foodNutrient}>Carbohydrates: {formatNumber(item.food.nutrients.CHOCDF)} g</Text>
                    )}
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
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
  input: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 40,
    marginBottom: 12,
    width: '100%',
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
  icons: {
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#E58B68',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: 'gray',
  },
  imageIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  }
});

export default searchFoodPage;
