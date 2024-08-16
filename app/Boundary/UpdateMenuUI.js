import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../service/AuthContext';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import UpdateMenuController from '../Controller/UpdateMenuController';
import { decode } from 'base-64';
import { deleteImage, uploadMenuImage } from '../service/storageService';

const EditMenuPage = () => {
  const { user } = useAuth();
  const { menuData } = useLocalSearchParams();
  const [parsedMenuData, setParsedMenuData] = useState(menuData ? JSON.parse(decode(menuData)) : null);
  const [image, setImage] = useState(parsedMenuData.image);
  const [tempImage, setTempImage] = useState(null);
  const [foodName, setFoodName] = useState(parsedMenuData.foodName);
  const [price, setPrice] = useState(parsedMenuData.price.toString());
  const [description, setDesc] = useState(parsedMenuData.description);
  const [isEditable, setIsEditable] = useState(false);
  const [ingredients, setIngredients] = useState(parsedMenuData.ingredients);
  const [calories, setCal] = useState(parsedMenuData.calories.toString());
  const [protein, setProtein] = useState(parsedMenuData.protein.toString());
  const [carbs, setCarbs] = useState(parsedMenuData.carbs.toString());
  const [fat, setFat] = useState(parsedMenuData.fat.toString());
  const [sugar, setSugar] = useState(parsedMenuData.sugar?.toString() || '');

  // Nutritional Thresholds
  const THRESHOLDS = {
    calories: { min: 300, max: 700 },
    totalFat: { min: 10, max: 20 },
    carbohydrates: { min: 30, max: 60 },
    protein: { min: 10 }, // Minimum protein required
    sugar: { max: 10 }, // Maximum sugar allowed
  };

  const saveMenu = async () => {
    if (!image || !foodName || !description || !ingredients || !calories || !protein || !carbs || !fat || !sugar || !price) {
      Alert.alert('Missing Information', 'Please fill out all fields and select an image before saving.');
      return;
    }

    const caloriesNum = parseFloat(calories);
    const proteinNum = parseFloat(protein);
    const carbsNum = parseFloat(carbs);
    const fatNum = parseFloat(fat);
    const sugarNum = parseFloat(sugar);

    // Validate nutritional thresholds
    if (
      caloriesNum < THRESHOLDS.calories.min ||
      caloriesNum > THRESHOLDS.calories.max ||
      fatNum < THRESHOLDS.totalFat.min ||
      fatNum > THRESHOLDS.totalFat.max ||
      carbsNum < THRESHOLDS.carbohydrates.min ||
      carbsNum > THRESHOLDS.carbohydrates.max ||
      proteinNum < THRESHOLDS.protein.min ||
      sugarNum > THRESHOLDS.sugar.max
    ) {
      Alert.alert(
        'Unhealthy Menu',
        `This menu item exceeds the allowed nutritional thresholds:
        - Calories: 300 - 700 kcal
        - Total Fat: 10 - 20 grams
        - Carbohydrates: 30 - 60 grams
        - Protein: At least 10 grams
        - Sugar: Less than or equal to 10 grams
        Please adjust the nutritional values to proceed.`
      );
      return;
    }

    let finalImage = image;

    if (tempImage) {
      const previousImage = parsedMenuData.image;
      if (previousImage) {
        await deleteImage(previousImage); // Delete the previous image if it exists
      }
      finalImage = await uploadMenuImage(user.uid, tempImage); // Upload the new image and get its URL
      setImage(finalImage); // Update the image state with the new URL
    }

    const updateMenu = {
      id: parsedMenuData.id,
      foodName,
      price,
      description,
      image: finalImage,
      ingredients,
      calories: caloriesNum,
      protein: proteinNum,
      carbs: carbsNum,
      fat: fatNum,
      sugar: sugarNum, // Include sugar in the log
    };

    try {
      await UpdateMenuController.updateMenu(user.uid, updateMenu);
      console.log('Menu log updated:', updateMenu);
      router.replace('Boundary/foodBP');
    } catch (error) {
      console.error('Error updating menu:', error);
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
      setTempImage(result.assets[0].uri);
    }
  };

  return (
    <>
      <Stack.Screen options={{
        title: 'Edit menu',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Medium', fontSize: 16 },
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back('Boundary/foodBP')}>
            <Ionicons name='chevron-back' size={24} color='white' />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity style={styles.button} onPress={toggleEdit}>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 14, color: 'white' }}>
              {isEditable ? 'Save' : 'Edit'}
            </Text>
          </TouchableOpacity>
        ),
        headerTitle: 'Menu',
        headerTitleAlign: 'center',
      }} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Menu Info</Text>
          <View style={styles.section}>
            <View style={styles.fieldSection}>
              <Text style={styles.label}>Menu Image</Text>
              <TouchableOpacity 
                onPress={addImage} 
                style={styles.uploadButton} 
                disabled={!isEditable} // Disable if not editable
              >
                {tempImage ? (
                  <Image source={{ uri: tempImage }} style={styles.image} />
                ) : (
                  <Image source={{ uri: image }} style={styles.image} />
                )}
              </TouchableOpacity>
            </View>
            <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5 }} />
            <View style={styles.fieldSection}>
              <Text style={styles.label}>Food Name</Text>
              {isEditable ? (
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
            <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5 }} />
            <View style={styles.fieldSection}>
              <Text style={styles.label}>Price</Text>
              {isEditable ? (
                <TextInput
                  placeholder="Price"
                  value={price}
                  onChangeText={setPrice}
                  style={styles.textInput}
                  keyboardType="numeric"
                  editable={isEditable}
                />
              ) : (
                <Text style={styles.textInput}>{price}</Text>
              )}
            </View>
            <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5 }} />
            <View style={styles.fieldSection}>
              <Text style={styles.label}>Description</Text>
              {isEditable ? (
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
            <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5 }} />
            <View style={styles.fieldSection}>
              <Text style={styles.label}>Ingredients</Text>
              {isEditable ? (
                <TextInput
                  style={styles.ingredientsInput}
                  value={ingredients}
                  placeholder='Add your ingredients'
                  onChangeText={setIngredients}
                  multiline
                  editable={isEditable}
                />
              ) : (
                <Text style={styles.ingredientsInput}>{ingredients}</Text>
              )}
            </View>
          </View>

          <Text style={styles.title}>Nutrition Fact</Text>
          <View style={styles.section}>
            <View style={styles.fieldSection}>
              <Text style={styles.label}>Calories</Text>
              <View style={styles.infoContainer}>
                {isEditable ? (
                  <TextInput
                    value={calories}
                    placeholder='Add food calorie'
                    onChangeText={setCal}
                    keyboardType='numeric'
                    editable={isEditable}
                    style={styles.textInput}
                  />
                ) : (
                  <Text style={styles.textInput}>{calories}</Text>
                )}
                <Text style={styles.unit}>kcal</Text>
              </View>
            </View>
            <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5 }} />
            <View style={styles.fieldSection}>
              <Text style={styles.label}>Fat</Text>
              <View style={styles.infoContainer}>
                {isEditable ? (
                  <TextInput
                    value={fat}
                    placeholder='Add food fat'
                    onChangeText={setFat}
                    keyboardType='numeric'
                    editable={isEditable}
                    style={styles.textInput}
                  />
                ) : (
                  <Text style={styles.textInput}>{fat}</Text>
                )}
                <Text style={styles.unit}>g</Text>
              </View>
            </View>
            <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5 }} />
            <View style={styles.fieldSection}>
              <Text style={styles.label}>Carbohydrate</Text>
              <View style={styles.infoContainer}>
                {isEditable ? (
                  <TextInput
                    value={carbs}
                    placeholder='Add food carbohydrate'
                    onChangeText={setCarbs}
                    keyboardType='numeric'
                    editable={isEditable}
                    style={styles.textInput}
                  />
                ) : (
                  <Text style={styles.textInput}>{carbs}</Text>
                )}
                <Text style={styles.unit}>g</Text>
              </View>
            </View>
            <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5 }} />
            <View style={styles.fieldSection}>
              <Text style={styles.label}>Protein</Text>
              <View style={styles.infoContainer}>
                {isEditable ? (
                  <TextInput
                    value={protein}
                    placeholder='Add food protein'
                    onChangeText={setProtein}
                    keyboardType='numeric'
                    editable={isEditable}
                    style={styles.textInput}
                  />
                ) : (
                  <Text style={styles.textInput}>{protein}</Text>
                )}
                <Text style={styles.unit}>g</Text>
              </View>
            </View>
            <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5 }} />
            <View style={styles.fieldSection}>
              <Text style={styles.label}>Sugar</Text>
              <View style={styles.infoContainer}>
                {isEditable ? (
                  <TextInput
                    value={sugar}
                    placeholder='Add food sugar'
                    onChangeText={setSugar}
                    keyboardType='numeric'
                    editable={isEditable}
                    style={styles.textInput}
                  />
                ) : (
                  <Text style={styles.textInput}>{sugar}</Text>
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
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    marginTop: 16,
    marginHorizontal: 16,
    color: '#808080',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  fieldSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    alignItems: 'center',
  },
  textInput: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    textAlign: 'right',
  },
  section: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    borderColor: '#808080',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  ingredientsInput: {
    textAlign: 'right',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unit: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    paddingLeft: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginVertical: 10,
  },
  uploadButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditMenuPage;
