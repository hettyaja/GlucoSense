import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../components/Header';
import { useAuth } from '../service/AuthContext';
import MenuDetailsController from '../Controller/MenuDetailsController';
import { decode as atob } from 'base-64';
import { encode as btoa } from 'base-64';

const MenuDetails = () => {
  const { menuData } = useLocalSearchParams();
  const [parsedMenuData, setParsedMenuData] = useState(menuData ? JSON.parse(atob(menuData)) : null);
  console.log('ini details', parsedMenuData);
  const [quantity, setQuantity] = useState(1);
  const [menuItem, setMenuItem] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSave = () => {
    const orderDetails = {
      ...parsedMenuData,
      quantity,
    };
    console.log('Menu: ', orderDetails);
    router.push({ pathname: 'Boundary/ViewOrderSummaryUI', params: { menuData: btoa(JSON.stringify(orderDetails)) } });
  };

  if (error) {
    return <Text>Error loading menu item: {error.message}</Text>;
  }

  return (
    <>
      <Header
        title="Details"
        leftButton="Back"
        onLeftButtonPress={() => router.back('./food')}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <Image source={{ uri: parsedMenuData.image }} style={styles.image} />
        </View>
        <View style={styles.itemContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.title}>{parsedMenuData.foodName}</Text>
            <View>
              <Text style={styles.price}>${parsedMenuData.price}</Text>
              <Text style={styles.basePrice}>Base price</Text>
            </View>
          </View>
          <Text style={styles.description}>{parsedMenuData.description}</Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.subtitle}>Ingredients</Text>
          <View style={styles.ingredientsContainer}>
            {parsedMenuData.ingredients ? (
              parsedMenuData.ingredients.split(',').map((ingredient, i) => (
                <Text key={i} style={styles.ingredient}>• {ingredient.trim()}</Text>
              ))
            ) : (
              <Text style={styles.ingredient}>No ingredients listed</Text>
            )}
          </View>
        </View>

        <View style={[styles.itemContainer, { marginBottom: 160 }]}>
          <Text style={styles.title}>Nutrition fact</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.details}>Calories</Text>
            <Text style={styles.unit}>{parsedMenuData.calories} cal</Text>
          </View>

          <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.details}>Fat</Text>
            <Text style={styles.unit}>{parsedMenuData.fat} g</Text>
          </View>

          <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.details}>Carbohydrate</Text>
            <Text style={styles.unit}>{parsedMenuData.carbs} g</Text>
          </View>

          <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.details}>Protein</Text>
            <Text style={styles.unit}>{parsedMenuData.protein} g</Text>
          </View>

          <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.details}>Sugar</Text>
            <Text style={styles.unit}>{parsedMenuData.sugar} g</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={decrement} style={styles.quantityButton}>
            <AntDesign name="minus" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={increment} style={styles.quantityButton}>
            <AntDesign name="plus" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buyButton} onPress={() => handleSave()}>
          <Text style={styles.buyButtonText}>Buy</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 6,
    backgroundColor: '#f5f5f5',
    paddingBottom: 80, // Add padding to avoid content being hidden behind the footer
  },
  itemContainer: {
    backgroundColor: 'white',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    paddingHorizontal: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
    paddingTop: 8,
    paddingHorizontal: 4,
  },
  price: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    paddingTop: 8,
  },
  basePrice: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    marginRight: 20,
    alignSelf: 'flex-end',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'gray',
    marginBottom: 16,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    padding: 4,
  },
  ingredientsContainer: {
    paddingHorizontal: 4,
  },
  ingredient: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'gray',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  quantityButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  quantity: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  buyButton: {
    backgroundColor: '#E58B68',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
  },
  buyButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  details: {
    borderBottomColor: '#d9d9d9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'Poppins-Regular',
    paddingVertical: 16,
  },
  loader: {
    marginTop: 10,
  },
});

export default MenuDetails;
