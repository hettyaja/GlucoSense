import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Tabs, router } from 'expo-router';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { fetchMenuData } from './service/foodordermenuService'; // Updated import
import { useAuth } from './service/AuthContext'; // Import your auth context

const FoodOrder = () => {
  const { user } = useAuth(); // Get the current user
  const [searchQuery, setSearchQuery] = useState('');
  const [menuData, setMenuData] = useState([]);

  const handlePress = (menu) => {
    // console.log(menu)
    router.push({ pathname: 'Boundary/MenuDetailsUI', params: { menuData: JSON.stringify(menu) } });
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const menuCollection = await fetchMenuData(); // Fetch menu data for all business partners
        console.log('Fetched menu data:', menuCollection); // Log menu data for debugging
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
      <Tabs.Screen options={{
        title: 'Food Order',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold' },
        headerTitle: 'Food Order',
        headerTitleAlign: 'center',
      }} />

      <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
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
          {filteredMenu.map((menu) => (
            <TouchableOpacity 
              key={menu.id} // Add a unique key prop here
              style={styles.container1} 
              onPress={() => handlePress(menu)} // Pass the id to handlePress function
            >
              <View style={styles.container2}>
                {/* Image component can be added here if image URL is available in menu data */}
              </View>
              <View style={{ marginLeft: 20 }}>
                <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, marginTop: 22 }}>{menu.title}</Text>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 16 }}>${menu.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default FoodOrder;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
  },
  selectedButton: {
    backgroundColor: '#FAF5E1',
    borderColor: '#E58B68',
  },
  buttonText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    textAlign: 'center',
    color: 'black',
  },
  saveButtonContainer: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 3,
    paddingLeft: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  container1: {
    marginTop: 15,
    backgroundColor: 'white',
    paddingVertical: 8,
    flexDirection: 'row',
  },
  container2: {
    marginLeft: 20,
    borderRadius: 8,
    width: 80,
    height: 80,
    backgroundColor: '#D9D9D9',
    marginVertical: 8,
    justifyContent: 'space-between',
  },
  picker: {
    fontFamily: 'Poppins-Regular',
    width: '50%',
    marginLeft: 170,
    color: '#808080',
  },
  pickerItem: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginLeft: 20,
    marginVertical: 10,
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
});
