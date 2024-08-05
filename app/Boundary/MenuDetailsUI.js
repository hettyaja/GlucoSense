import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../components/Header';
import { useAuth } from '../service/AuthContext';
import MenuDetailsController from '../Controller/MenuDetailsController';

const MenuDetails = () => {
  const { menuData } = useLocalSearchParams();
  const [parsedMenuData, setParsedMenuData] = useState(menuData ? JSON.parse(menuData) : null);
  const [quantity, setQuantity] = useState(1);
  const [menuItem, setMenuItem] = useState(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    if (!menuData) {
      setError(new Error('Missing menuId or userId'));
      setLoading(false);
      return;
    }

    const fetchMenuItem = async () => {
      try {
        const items = await MenuDetailsController.fetchMenu(parsedMenuData.bpId, parsedMenuData.id);
        setMenuItem(items);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItem();
  }, [menuData]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading menu item: {error.message}</Text>;
  }

  if (!menuItem) {
    return <Text>No menu item found</Text>;
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
        <Image source={{ uri: menuItem.image }} style={styles.image} />
        </View>

        <View style ={styles.itemContainer}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.title}>{menuItem.foodName}</Text>
          <View>
            <Text style={styles.price}>${menuItem.price}</Text>
            <Text style={styles.basePrice}>Base price</Text>
          </View>
          </View>
          <Text style={styles.description}>{menuItem.description}</Text>
          
        </View>
          <Text style={styles.subtitle}>Ingredients</Text>
          <View style={styles.ingredientsContainer}>

            {menuItem.ingredients ? (
              menuItem.ingredients.split(',').map((ingredient, i) => (
                <Text key={i} style={styles.ingredient}>• {ingredient.trim()}</Text>
              ))
            ) : (
              <Text style={styles.ingredient}>No ingredients listed</Text>
            )}
          </View>
          
       
        <View style ={styles.checkOut}>
        <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={decrement} style={styles.quantityButton}>
              <AntDesign name="minus" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={increment} style={styles.quantityButton}>
              <AntDesign name="plus" size={24} color="black" />
            </TouchableOpacity>
        </View>
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Buy</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 6,
    backgroundColor: '#f5f5f5'
  },
  itemContainer: {
    backgroundColor: 'white',
    // padding: 8,
    marginVertical: 8,
    borderRadius: 10,
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
  imagePlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginBottom: 8,
    paddingTop: 8,
  },
  price: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
  },
  basePrice:{
    fontFamily: 'Poppins-Regular', 
    fontSize: 10, 
    marginRight: 20,
    alignSelf: 'flex-end' 
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'gray',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
  },
  ingredientsContainer: {
    marginBottom: 16,
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
  },
  buyButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  checkOut:{
    backgroundColor: 'red',
    borderRadius: 1000,


  }
});

export default MenuDetails;
