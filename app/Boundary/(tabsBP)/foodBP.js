//Food BP 
import React, { useState, useEffect } from 'react';
import { router, Tabs, useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MenuCard from '../../components/MenuCard';
import {fetchMenuData} from '../../service/menuService';
import DeleteMenuController from '../../Controller/DeleteMenuController';
import { useAuth } from '../../service/AuthContext';
import UpdateMenuController from '../../Controller/UpdateMenuController';
import Header from '../../components/Header';

const foodBP = () => {
  const {user} = useAuth()
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleEdit = (menu) =>{
    router.push({pathname: 'Boundary/EditMenuPage', params: {menuData: JSON.stringify(menu)}})
  }

  const confirmDelete = (menu) => {
    Alert.alert(
      "Delete Log",
      "Are you sure you want to delete this menu?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => handleDelete(menu) }
      ]
    );
  };

  const handleDelete = async (menuItem) => {
    try {
      await DeleteMenuController.deleteMenu(user.uid, menuItem.id);
      setMenuData(menuData.filter(menu => menu.id !== menuItem.id));
    } catch (error) {
      console.error('Error deleting menu: asdad', error);
    }
  };

  return (
    <>
      <Header
        title='Menu Management'
        rightButton='Add'
        onRightButtonPress={() => router.push('Boundary/CreateMenuPage')}
      />
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
              <MenuCard menu={menu} onDelete={()=> confirmDelete(menu)} onEdit={() => handleEdit(menu)} />
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
    marginVertical: 8,
    marginHorizontal: 8,
  },
  searchContainer: {
    backgroundColor: 'white',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily:'Poppins-Regular',
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
