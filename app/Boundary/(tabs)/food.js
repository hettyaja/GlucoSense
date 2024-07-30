import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import { fetchMenuData } from '../../service/foodordermenuService'; // Import the updated menu service

const Food = () => {
  const router = useRouter();
  const [featuredMenu, setFeaturedMenu] = useState([]);

  useEffect(() => {
    const fetchFeaturedMenu = async () => {
      try {
        const menuCollection = await fetchMenuData(); // Fetch menu data
        setFeaturedMenu(menuCollection.slice(0, 4)); // Assuming you want to show the first 4 items as featured
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };
    fetchFeaturedMenu();
  }, []);

  return (
    <>
      <Header title='Food' />
      <View style={styles.container}>
        <View style={styles.statusContainer}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusHeaderText}>My Food</Text>
            <TouchableOpacity style={styles.statusBox} onPress={() => router.push('Boundary/OrderHistory')}>
              <Text>3 Orders</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statusHeader}>
            <Text style={styles.statusHeaderText}>My Diet Plan</Text>
            <TouchableOpacity style={styles.statusBox}>
              <Text>3 Plans</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.recipeBox} onPress={() => router.push('recipePage')}>
          <Text>Discover our recipe</Text>
          <Ionicons name='chevron-forward' size={32} color='black' />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Featured menu</Text>
        <ScrollView horizontal contentContainerStyle={styles.featuredMenuContainer}>
          {featuredMenu.map((menu) => (
            <TouchableOpacity key={menu.id} style={styles.menuCard} onPress={() => router.push('foodOrder')}>
              <Image source={{ uri: menu.image }} style={styles.menuImage} />
              <Text style={styles.menuTitle}>{menu.title}</Text>
              <Text style={styles.menuPrice}>${menu.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  statusHeader: {
    width: '48%',
  },
  statusHeaderText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    paddingBottom: 8,
  },
  statusBox: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 0.5,
    padding: 16,
  },
  recipeBox: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 0.5,
    margin: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginLeft: 16,
    marginTop: 16,
  },
  featuredMenuContainer: {
    padding: 16,
  },
  menuCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 0.5,
    width: 120, // Decreased width
    marginRight: 16,
    padding: 8, // Decreased padding
    alignItems: 'center',
    height: 150,
  },
  menuImage: {
    width: 80, // Decreased width
    height: 50, // Decreased height
    borderRadius: 8,
    marginBottom: 8,
  },
  menuTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    textAlign: 'center',
  },
  menuPrice: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default Food;
