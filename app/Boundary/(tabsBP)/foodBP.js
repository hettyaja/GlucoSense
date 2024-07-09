//Food BP 
import React, { useState, useEffect } from 'react';
import { router, Tabs } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MenuCard from '../../components/MenuCard';
import { db } from '../../../firebase';  // Adjust the path as necessary
import {fetchMenuData} from '../../service/menuService';
import { useAuth } from '../../service/AuthContext';
import Feather from 'react-native-vector-icons/Feather'
import Divider from '../../components/Divider';



const foodBP = () => {
  const {user} = useAuth()
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMenu, setSelectedMenu] = useState('');
  const [modalVisible ,setModalVisible] = useState('');
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const menuItem = async () => {
      if(user){
      try {
        const menuCollection = await fetchMenuData( user.uid);
        setMenuData(menuCollection);
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    }
    };
    menuItem();
  }, [user]);

  const filteredMenu = menuData.filter(menu =>
    menu.title && menu.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Tabs.Screen options={{
        title: 'Menu Management',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold' },
        headerTitle: 'Menu Management',
        headerTitleAlign: 'center',
        headerRight: () => (
          <TouchableOpacity onPress={() => router.push('createMenuPage')} style={{ marginRight: 16 }}>
            <MaterialIcons name='add' size={32} color='white' />
          </TouchableOpacity>
        )
      }} />

      <View style={{ flex: 1 }}>
        
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

        <ScrollView contentContainerStyle={{ padding: 20 }}>
          {menuData.map((menu) => (
            <View key={menu.id} style={styles.menuCard}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  setSelectedMenu(menuData);
                  setModalVisible(true);
                }}
              >
                <Feather name='more-vertical' size={24} />
              </TouchableOpacity>
              <MenuCard menu={menu} />
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
};







const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
  },
  activeTabButton: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#f28b54',
  },
  tabButtonText: {
    fontSize: 16,
    color: '#000',
  },
  activeTabButtonText: {
    fontWeight: 'bold',
    color: '#f28b54',
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
  searchContainer: {
    backgroundColor: 'white',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  recipeCard: {
    marginBottom: 20,
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  threeDots: {
    width: 20,
    height: 20,
  },
});

export default foodBP;
