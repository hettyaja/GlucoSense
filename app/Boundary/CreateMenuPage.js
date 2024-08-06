//Create Menu Page
import { View, Text, StyleSheet, Alert, Button, TouchableOpacity, ScrollView, TextInput, SafeAreaView, Image } from 'react-native';
import React, { useState } from 'react';
import CreateMenuController from '../Controller/CreateMenuController';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '../service/AuthContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';

const createMenu = () => {
  const { user } = useAuth();
  const { menuData } = useLocalSearchParams();
  const [parsedMenuData] = useState(menuData ? JSON.parse(menuData) : {});
  const router = useRouter();

  const [image, setImage] = useState(parsedMenuData?.image || '');
  const [foodName, setFoodName] = useState(parsedMenuData?.foodName || '');
  const [description, setDesc] = useState(parsedMenuData?.description || '');
  const [status, setStatus] = useState(parsedMenuData?.status || '');
  const [isEditable, setIsEditable] = useState(false);
  const [ingredients, setIngredients] = useState(parsedMenuData?.ingredients || '');
  const [calories, setCal] = useState(parsedMenuData?.calories || '');
  const [protein, setProtein] = useState(parsedMenuData?.protein || '');
  const [carbs, setCarbs] = useState(parsedMenuData?.carbs || '');
  const [fat, setFat] = useState(parsedMenuData?.fat || '');
  const [price, setPrice] = useState(parsedMenuData?.price || '');

  const createMeals = async () => {
    if (user) {
      const newMenuLog = {
        image,
        foodName,
        description,
        ingredients,
        calories,
        carbs,
        fat,
        protein,
        price,
        status
      };

      try {
        await CreateMenuController.createMenu(user.uid, newMenuLog);
        console.log('Menu successfully created', newMenuLog);
        router.replace('Boundary/foodBP');
      } catch (error) {
        console.error('Error saving menu log:', error);
      }
    }
  };

  const addImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <>
      <Stack.Screen options={{
        title: 'Add Menu',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold' },
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back('/foodBP')}>
            <AntDesign name='close' size={24} color='white' />
          </TouchableOpacity>
        ), headerRight: () => (
          <TouchableOpacity onPress={() => createMeals()}>
            <Text style={{ padding: 2, marginHorizontal: 8, fontFamily: 'Poppins-SemiBold', fontSize: 16, color: 'white' }}>Save</Text>
          </TouchableOpacity>
        ),
        headerTitle: 'Menu',
        headerTitleAlign: 'center',
      }} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.itemContainer}>
            <View style={styles.fieldSection}>
              <View style={styles.textBox}>
                <Text style={styles.title}>Image</Text>
                <Text style={styles.h3}>Upload image {"\n"}to let the user know </Text>
              </View>
              {image ? <Image source={{ uri: image }} style={styles.image} /> : (
                <TouchableOpacity onPress={addImage} style={styles.uploadButton}>
                  <Image source={require('../assets/iconCarrier.png')} />
                  <Text style={styles.uploadText}>Upload Menu photo</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.fieldSection}>
              <Text style={styles.title}>Food Name</Text>
                <TextInput
                  placeholder="Food Name"
                  value={foodName}
                  onChangeText={setFoodName}
                  style={styles.textInput}
                />
            </View>

            <View style={styles.fieldSection}>
              <Text style={styles.title}>Price</Text>
                <TextInput
                  placeholder="Price"
                  value={price}
                  onChangeText={setPrice}
                  style={styles.textInput}
                />
            </View>

            <View style={styles.fieldSection}>
              <Text style={styles.title}>Description</Text>
                <TextInput
                  style={styles.ingredientsInput}
                  value={description}
                  placeholder="Add brief description about your food"
                  onChangeText={setDesc}
                  multiline
                />
            </View>

            <View style={styles.fieldSection}>
              <Text style={styles.title}>Ingredients</Text>
                <TextInput
                  style={styles.ingredientsInput}
                  value={ingredients}
                  placeholder='Add your ingredients'
                  onChangeText={setIngredients}
                  multiline
                />
            </View>
          </View>

          <View style={styles.factContainer}>
            <Text style={styles.h1}>Nutrition Fact</Text>
            <View style={styles.fieldSection}>
              <Text style={styles.title}>Calories</Text>
              <View style={styles.infoContainer}>
                  <TextInput
                    value={calories}
                    placeholder='Add food calorie'
                    onChangeText={setCal}
                    keyboardType='numeric'
                  />
                <Text style={styles.unit}>cal</Text>
              </View>
            </View>

            <View style={styles.fieldSection}>
              <Text style={styles.title}>Fat</Text>
              <View style={styles.infoContainer}>
                  <TextInput
                    value={fat}
                    placeholder='Add food fat'
                    onChangeText={setFat}
                    keyboardType='numeric'
                  />
                <Text style={styles.unit}>g</Text>
              </View>
            </View>

            <View style={styles.fieldSection}>
              <Text style={styles.title}>Carbohydrate</Text>
              <View style={styles.infoContainer}>
                  <TextInput
                    value={carbs}
                    placeholder='Add food carbohydrate'
                    onChangeText={setCarbs}
                    keyboardType='numeric'
                />
                <Text style={styles.unit}>g</Text>
              </View>
            </View>

            <View style={styles.fieldSection}>
              <Text style={styles.title}>Protein</Text>
              <View style={styles.infoContainer}>
                  <TextInput
                    value={protein}
                    placeholder='Add food protein'
                    onChangeText={setProtein}
                    keyboardType='numeric'
                    />
                <Text style={styles.unit}>g</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};


const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
  },

  title:{
    fontSize: 14,
    paddingHorizontal:10,
    fontFamily: 'Poppins-Medium',
  },
  
  h3:{
    fontSize:14,
    paddingHorizontal: 10,
    color: 'gray',
    marginTop: 8,
  },

  textBox:{
    paddingVertical: 10,
  },
  
  fieldSection: {
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'Poppins-Regular',
    paddingVertical: 16,
  },
  
  itemContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },

  ingredientsInput: {
    borderColor: 'gray',
    paddingHorizontal: 90,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  factContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    marginTop: 20,
  },

  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  h1:{
    fontFamily: 'Poppins-SemiBold'
  },
  
  unit: {
    fontSize: 14,
    color: 'gray',
    paddingHorizontal: 5,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginVertical: 10,
  }

});
       

export default createMenu;