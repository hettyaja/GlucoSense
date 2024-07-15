import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, FlatList, } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../service/AuthContext';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import UpdateMenuController from '../Controller/UpdateMenuController';

const EditMenuPage = () => {
  const { user } = useAuth();
  const { menuData } = useLocalSearchParams();
  const [parsedMenuData, setParsedMenuData] = useState(menuData ? JSON.parse(menuData) : null);
  const [image, setImage] = useState(parsedMenuData.image);
  const [foodName, setFoodName] = useState(parsedMenuData.foodName);
  const [price, setPrice] = useState(parsedMenuData.price.toString());
  const [description, setDesc] = useState(parsedMenuData.description);
  const [status, setStatus] = useState(parsedMenuData.status);
  const [isEditable, setIsEditable] = useState(false);  const [ingredients, setIngredients] = useState(parsedMenuData.ingredients);
  const [calories, setCal] = useState(parsedMenuData.calories);
  const [protein, setProtein] = useState(parsedMenuData.protein);
  const [carbs, setCarbs] = useState(parsedMenuData.carbs);
  const [fat, setFat] = useState(parsedMenuData.fat);

  const saveMenu = async () => {
    if (user) {
      const updateMenu = {
        id: parsedMenuData.id,
        foodName,
        price,
        description,
        image,
        status,
        ingredients,
        calories,
        protein,
        carbs,
        fat
      };

      try {
        await UpdateMenuController.updateMenu(user.uid, updateMenu);
        console.log('Menu log updated:', updateMenu);
        router.replace('Boundary/foodBP');
      } catch (error) {
        console.error('Error updating menu:', error);
      }
    }
  };

  const toggleEdit = () => {
    if (isEditable) {
        saveMenu();
    }
    setIsEditable(!isEditable);
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
        title: 'Edit menu',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold' },
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back('Boundary/foodBP')}>
            <AntDesign name='close' size={24} color='white' />
          </TouchableOpacity>
        ), headerRight: () => (
            <TouchableOpacity style={styles.button}
                  onPress={toggleEdit}>
                  <Text style={{fontFamily: 'Poppins-SemiBold', fontSize:14, color:'white'}}>
                    {isEditable ? 'Save' : 'Edit'}
                  </Text>
                </TouchableOpacity>

          // <TouchableOpacity onPress={() => saveMenu()}>
          //   <Text style={{ padding: 2, marginHorizontal: 8, fontFamily: 'Poppins-SemiBold', fontSize: 16, color: 'white' }}>Save</Text>
          // </TouchableOpacity>
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
              {image && <Image source={{ uri: image }} style={styles.image} />}
              {!image && (
                // Updated button style to align text below the icon
                <TouchableOpacity onPress={addImage} style={styles.uploadButton}>
                  <Image source={require('../assets/iconCarrier.png')} />
                  {/* Updated to style the text below the image icon */}
                  <Text style={styles.uploadText}>{image ? 'Edit' : 'Upload'} Menu photo</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.fieldSection}>
              <Text style={styles.title}>Food Name</Text>
              {isEditable?(
                <TextInput
                  placeholder="Food Name"
                  value={foodName}
                  onChangeText={setFoodName}
                  style={styles.textInput}
                />
              ) : (
                <Text style={styles.textInput}>{foodName}</Text>
              )}   
            </View>

            <View style={styles.fieldSection}>
              <Text style={styles.title}>Price</Text>
              {isEditable?(
                <TextInput
                  placeholder="Price"
                  value={price}
                  onChangeText={setPrice}
                  style={styles.textInput}
                  editable={isEditable}
                />
              ):(
                <Text style={styles.textInput}>{price}</Text>
              )}
            </View>

            <View style={styles.fieldSection}>
              <Text style={styles.title}>Description</Text>
              {isEditable?(
                <TextInput
                  style={styles.ingredientsInput}
                  value={description}
                  placeholder="Add brief description about your food"
                  onChangeText={setDesc}
                  multiline
                  editable={isEditable}
                />
              ) : ( 
                <Text style={styles.ingredientsInput}>{description}</Text>
              )}
            </View>

            <View style={styles.fieldSection}>
              <Text style={styles.title}>Ingredients</Text>
              {isEditable?(
                <TextInput
                  style={styles.ingredientsInput}
                  value={ingredients}
                  placeholder='Add your ingredients'
                  onChangeText={setIngredients}
                  multiline
                  editable={isEditable}
                />
              ):( 
                <Text style={styles.ingredientsInput}>{ingredients}</Text>
              )}
            </View>
          </View>

          <View style={styles.factContainer}>
          <Text style={styles.h1}>Nutrition Fact</Text>
            <View style={styles.fieldSection}>
              <Text style={styles.title}>Calories</Text>
              <View style={styles.infoContainer}>
                {isEditable? (
                  <TextInput
                    value={calories}
                    placeholder='Add food calorie'
                    onChangeText={setCal}
                    keyboardType='numeric'
                    editable={isEditable}
                  />
                ):(
                  <Text style={styles.textInput}>{calories}</Text>
                )}
                <Text style={styles.unit}>cal</Text>
              </View>
            </View>
          
            <View style={styles.fieldSection}>
              <Text style={styles.title}>Fat</Text>
              <View style={styles.infoContainer}>
              {isEditable? (
                <TextInput
                  value={fat}
                  placeholder='Add food fat'
                  onChangeText={setFat}
                  keyboardType='numeric'
                  editable={isEditable}
                />
              ):(
                <Text style={styles.textInput}>{fat}</Text>
                )}
                <Text style={styles.unit}>g</Text>
              </View>
            </View>

            <View style={styles.fieldSection}>
              <Text style={styles.title}>Carbohydrate</Text>
              <View style={styles.infoContainer}>
                {isEditable?(
                  <TextInput
                    value={carbs}
                    placeholder='Add food carbohydrate'
                    onChangeText={setCarbs}
                    keyboardType='numeric'
                    editable={isEditable}
                  />
                ):(
                  <Text style={styles.textInput}>{carbs}</Text>
                )}
                <Text style={styles.unit}>g</Text>
              </View>
            </View>

            <View style={styles.fieldSection}>
              <Text style={styles.title}>Protein</Text>
              <View style={styles.infoContainer}>
                {isEditable?(
                <TextInput
                  value={protein}
                  placeholder='Add food protein'
                  onChangeText={setProtein}
                  keyboardType='numeric'
                  editable = {isEditable}
                />
                ):(
                  <Text style={styles.textInput}>{protein}</Text>
                )}
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
    fontFamily: 'poppins-medium',
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
    fontFamily: 'Poppins',
    paddingVertical: 16,
    
    // paddingVertical: 1,
    // paddingLeft: 10,
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
    fontFamily: 'poppins-semiBold'
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

export default EditMenuPage;