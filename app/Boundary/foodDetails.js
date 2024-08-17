import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';

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
      pathname: 'Boundary/AddMealsUI',
      params: { mealData: JSON.stringify(mealData) },
    });
  };

  return (
    <>
    <Header
      title = 'Meal'
      leftButton='Back'
      onLeftButtonPress={() => router.back()}

      rightButton= 'Save'
      onRightButtonPress={() => handleSave()}
    />

    <View style={styles.container}>
      <Text style={styles.title}>{food.label}</Text>
      <View style={styles.section}>
        <View style={styles.subSection}>
          <Text style={styles.sectionText}>Serving size</Text>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <TouchableOpacity style={styles.button} onPress={handleDecrease}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.sectionText}>{servings}</Text>
            <TouchableOpacity style={[styles.button, {marginRight:16}]} onPress={handleIncrease}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </View>


      <Text style={styles.subHeaderText}>Nutrition Facts</Text>
      {nutrients && (
        <View style={styles.section}>
          {nutrients.ENERC_KCAL !== undefined && (
            <>
              <View style={styles.subSection}>
              <Text style={styles.sectionText}>Calories</Text>
              <Text style={styles.sectionText}>{(nutrients.ENERC_KCAL * servings).toFixed(2)} kcal</Text>

              </View>
              <View style={{borderBottomWidth:0.5, marginHorizontal:16}}/>
              
            </>

          )}
          {nutrients.FAT !== undefined && (
            <>
            <View style={styles.subSection}>
            <Text style={styles.sectionText}>Fat</Text>
            <Text style={styles.sectionText}>{(nutrients.FAT * servings).toFixed(2)} g</Text>
            </View>
            <View style={{borderBottomWidth:0.5, marginHorizontal:16}}/>
            </>
          )}
          {nutrients.PROCNT !== undefined && (
            <>
            <View style={styles.subSection}>
            <Text style={styles.sectionText}>Protein</Text>
            <Text style={styles.sectionText}>{(nutrients.PROCNT * servings).toFixed(2)} g</Text>
            
            </View>
            <View style={{borderBottomWidth:0.5, marginHorizontal:16}}/>
            </>
          )}
          {nutrients.CHOCDF !== undefined && (
            <>
            <View style={styles.subSection}>
            <Text style={styles.sectionText}>Carbohydrates</Text>
            <Text style={styles.sectionText}>{(nutrients.CHOCDF * servings).toFixed(2)} g</Text>
            </View>
            </>
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
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    padding:16
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  section: {
    backgroundColor:'white',
    borderBottomWidth:0.5,
    borderTopWidth:0.5
  },
  sectionText: {
    fontSize:14,
    fontFamily:'Poppins-Regular',
    padding:16
  },
  subSection: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  subHeaderText: {
    color:'#808080',
    fontFamily:'Poppins-Regular',
    fontSize:14,
    paddingHorizontal:16,
    paddingTop:24,
    paddingBottom:8
  },
  servingText: {
    marginHorizontal: 16,
    fontSize: 18,
  },
  nutrientContainer: {
    marginTop: 16,
  },
  button: {
    backgroundColor: '#E58B68',
    paddingHorizontal: 10, 
    borderRadius: 5, 
    marginHorizontal: 5,


  },
  buttonText: {
    color: '#FFFFFF', 
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
    
 
});

export default FoodDetails;
