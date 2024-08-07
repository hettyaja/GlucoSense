import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuth } from '../service/AuthContext';
import { decode, encode } from 'base-64';

const OrderDietPlan = () => {
  const { user } = useAuth();
  const { planData } = useLocalSearchParams();
  const [parsedPlanData, setParsedPlanData] = useState(planData ? JSON.parse(decode(planData)) : null);
  const [quantity, setQuantity] = useState(1);
  console.log(parsedPlanData);

  useEffect(() => {
    if (planData) {
      setParsedPlanData(JSON.parse(decode(planData)));
    }
  }, [planData]);

  const renderMeals = () => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return daysOfWeek.map((day) => {
      const dayData = parsedPlanData[day];
      return (
        <View key={day} style={styles.daySection}>
          <Text style={styles.dayTitle}>{day}</Text>
          {Object.keys(dayData).map((mealType) => {
            const meal = dayData[mealType];
            return (
              <View key={mealType} style={styles.mealSection}>
                <Text style={styles.mealTitle}>{mealType}</Text>
                {meal.name ? (
                  <View style={styles.mealContent}>
                    {meal.image ? <Image source={{ uri: meal.image }} style={styles.mealImage} /> : null}
                    <View style={styles.mealDetails}>
                      <Text style={styles.mealName}>{meal.name}</Text>
                      <Text style={styles.mealDescription}>{meal.description}</Text>
                      <Text style={styles.mealIngredients}>{meal.ingredients}</Text>
                      <View style={{flexDirection:'row'}}>
                        <View style={{alignItems:'center', marginRight:8}}>
                          <Text style={styles.mealNutrition}>Carbs</Text>
                          <Text style={styles.mealNutrition}>{meal.carbs}g</Text>
                        </View>
                        
                        <View style={{alignItems:'center', marginRight:8}}>
                          <Text style={styles.mealNutrition}>Protein</Text>
                          <Text style={styles.mealNutrition}>{meal.protein}g</Text>
                        </View>
                        <View style={{alignItems:'center', marginRight:8}}>
                          <Text style={styles.mealNutrition}>Calories</Text>
                          <Text style={styles.mealNutrition}>{meal.carbs}</Text>
                        </View>
                        <View style={{alignItems:'center', marginRight:8}}>
                          <Text style={styles.mealNutrition}>Fat</Text>
                          <Text style={styles.mealNutrition}>{meal.fat}g</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ) : (
                  <Text style={styles.noMealText}>No meal planned</Text>
                )}
              </View>
            );
          })}
        </View>
      );
    });
  };

  const handleOrder = () => {
    const orderData = {
      ...parsedPlanData,
      userId: user.uid,
      quantity
    }
    console.log(orderData)
    router.push({pathname:'Boundary/ViewDietPlanOrderSummary', params: {orderData: encode(JSON.stringify(orderData))}})

  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <Header
        title="Order"
        leftButton="Back"
        onLeftButtonPress={() => router.back()}
      />
      <ScrollView style={styles.container}>
        {parsedPlanData ? (
          <>
            <Image source={{ uri: parsedPlanData.planImage }} style={styles.planImage} />
            <View style={styles.section}>
              <Text style={styles.planName}>{parsedPlanData.planName}</Text>
              <View style={styles.priceSection}>
                <Text style={styles.price}>${parsedPlanData.price}</Text>
                <Text style={styles.priceLabel}>Price per Week</Text>
              </View>
            </View>
            {renderMeals()}
          </>
        ) : (
          <Text style={styles.loadingText}>Loading...</Text>
        )}
      </ScrollView>
      <View style={styles.orderSection}>
        <View style={styles.quantityControl}>
          <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleOrder} style={styles.orderButton}>
          <Text style={styles.orderButtonText}>Order for {quantity} Week(s)</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default OrderDietPlan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  planImage: {
    width: '100%',
    height: 200,
  },
  section: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  planName: {
    fontSize: 20,
    fontFamily:'Poppins-SemiBold'
  },
  priceSection: {
    justifyContent: 'flex-start',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf:'flex-end'
  },
  priceLabel: {
    fontSize: 12,
    color: '#808080',
    fontFamily:'Poppins-Regular'
  },
  daySection: {
    marginTop: 8,
  },
  dayTitle: {
    fontSize: 14,
    fontFamily:'Poppins-Medium',
    color:'#808080',
    marginHorizontal:16
  },
  mealSection: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical:8,
    borderColor: '#ddd',
  },
  mealTitle: {
    fontSize: 14,
    fontFamily:'Poppins-SemiBold'
  },
  mealContent: {
    flexDirection: 'row',
  },
  mealImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 8,
  },
  mealDetails: {
    flex: 1,
  },
  mealName: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  mealDescription: {
    fontSize: 12,
    color: '#666',
  },
  mealIngredients: {
    fontSize: 12,
    color: '#666',
  },
  mealNutrition: {
    fontSize: 12,
    color: '#666',
  },
  noMealText: {
    fontSize: 12,
    color: '#666',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  orderSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E58B68',
    borderRadius: 15,
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily:'Poppins-SemiBold'
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  orderButton: {
    backgroundColor: '#E58B68',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  orderButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily:'Poppins-Medium'
  },
});
