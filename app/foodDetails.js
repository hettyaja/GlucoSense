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
        <View style={styles.section}>
          <View style={styles.subSection}>
            <Text style={styles.sectionText}>Serving size</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Button title="-" onPress={handleDecrease}/>
              <Text style={styles.sectionText}>{servings}</Text>
              <Button title="+" onPress={handleIncrease} />
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
                <View style={{borderBottomWidth:1, marginHorizontal:16}}/>
                
              </>

            )}
            {nutrients.FAT !== undefined && (
              <>
              <View style={styles.subSection}>
              <Text style={styles.sectionText}>Fat</Text>
              <Text style={styles.sectionText}>{(nutrients.FAT * servings).toFixed(2)} g</Text>
              </View>
              <View style={{borderBottomWidth:1, marginHorizontal:16}}/>
              </>
            )}
            {nutrients.PROCNT !== undefined && (
              <>
              <View style={styles.subSection}>
              <Text style={styles.sectionText}>Protein</Text>
              <Text style={styles.sectionText}>{(nutrients.PROCNT * servings).toFixed(2)} g</Text>
              
              </View>
              <View style={{borderBottomWidth:1, marginHorizontal:16}}/>
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
    // Add styles for your button if needed
  },
});

export default FoodDetails;
