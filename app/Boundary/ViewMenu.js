import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { router } from 'expo-router';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { fetchMenuData } from '../service/foodordermenuService';
import { useAuth } from '../service/AuthContext';
import Header from '../components/Header';
import { encode as btoa } from 'base-64';

const ViewMenu = () => {
  const { user } = useAuth(); 
  const [searchQuery, setSearchQuery] = useState('');
  const [menuData, setMenuData] = useState([]);

  const handlePress = (menu) => {
    router.push({ pathname: 'Boundary/MenuDetailsUI', params: { menuData: btoa(JSON.stringify(menu)) } });
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const menuCollection = await fetchMenuData();
        console.log('Fetched menu data:', menuCollection);
        setMenuData(menuCollection);
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };
    fetchMenuItems();
  }, []);

  const filteredMenu = menuData.filter(menu => {
    if (!menu.title) {
      console.warn('Menu item with undefined title:', menu);
      return false;
    }
    return menu.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <Header
        title='Food Order'
        leftButton='Back'
        onLeftButtonPress={() => router.back()}
      />
    
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <FontAwesome name="search" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Search menu"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {filteredMenu.map((menu) => (
            <TouchableOpacity 
              key={menu.id} 
              style={styles.planCard} 
              onPress={() => handlePress(menu)} 
            >
              <Image source={{ uri: menu.image }} style={styles.planImage} />
              <View style={styles.planInfo}>
                <Text style={styles.planName}>{menu.title}</Text>
                <Text style={styles.planPrice}>${menu.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default ViewMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    backgroundColor: 'white',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 40,
    marginVertical: 10,
    marginHorizontal: 11,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  scrollViewContent: {
    padding: 20,
  },
  planCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  planImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginBottom: 8,
  },
  planPrice: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#333',
  },
});
