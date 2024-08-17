import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView, TextInput, SafeAreaView, Image } from 'react-native';
import React, { useState } from 'react';
import CreateMenuController from '../Controller/CreateMenuController';
import { router, Stack, useRouter } from 'expo-router';
import { useAuth } from '../service/AuthContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import Header from '../components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { uploadMenuImage } from '../service/storageService';

const createMenu = () => {
  const { user } = useAuth();
  const [image, setImage] = useState(null);
  const [foodName, setFoodName] = useState();
  const [description, setDesc] = useState();
  const [ingredients, setIngredients] = useState();
  const [calories, setCal] = useState();
  const [protein, setProtein] = useState();
  const [carbs, setCarbs] = useState();
  const [fat, setFat] = useState();
  const [sugar, setSugar] = useState(); // New sugar state
  const [price, setPrice] = useState();

  // Nutritional Thresholds
  const THRESHOLDS = {
    calories: { max: 700 },
    totalFat: { max: 20 },
    carbohydrates: { max: 60 },
    protein: { min: 10 }, // Minimum protein required
    sugar: { max: 10 }, // Maximum sugar allowed
  };

  const handleSave = async () => {
    if (!image || !foodName || !description || !ingredients || !calories || !protein || !carbs || !fat || !sugar || !price) {
      Alert.alert('Missing Information', 'Please fill out all fields and select an image before saving.');
      return;
    }

    // Validate nutritional thresholds
    const caloriesNum = parseFloat(calories);
    const proteinNum = parseFloat(protein);
    const carbsNum = parseFloat(carbs);
    const fatNum = parseFloat(fat);
    const sugarNum = parseFloat(sugar);

    if (
      caloriesNum > THRESHOLDS.calories.max ||
      fatNum > THRESHOLDS.totalFat.max ||
      carbsNum > THRESHOLDS.carbohydrates.max ||
      proteinNum < THRESHOLDS.protein.min ||
      sugarNum > THRESHOLDS.sugar.max
    ) {
      Alert.alert(
        'Unhealthy Menu',
        `This menu item exceeds the allowed nutritional thresholds:
        - Calories: Up to 700 kcal
        - Total Fat: Up to 20 grams
        - Carbohydrates: Up to 60 grams
        - Protein: At least 10 grams
        - Sugar: Less than or equal to 10 grams
        Please adjust the nutritional values to proceed.`
      );
      return;
    }

    if (user) {
      const imageURL = await uploadMenuImage(user.uid, image);
      const newMenuLog = {
        image: imageURL,
        foodName,
        description,
        ingredients,
        calories: caloriesNum,
        carbs: carbsNum,
        fat: fatNum,
        sugar: sugarNum, // Include sugar in the log
        protein: proteinNum,
        price,
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
      <Header
        title='Create menu'
        leftButton='Back'
        onLeftButtonPress={() => router.back()}
        rightButton='Save'
        onRightButtonPress={() => handleSave()}
      />
      <ScrollView style={styles.safeArea}>
        <Text style={styles.title}>Menu Info</Text>
        <View style={styles.section}>
          <View style={styles.fieldSection}>
            <Text style={styles.label}>Menu Image</Text>
            <TouchableOpacity onPress={addImage} style={styles.uploadButton}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <MaterialIcons name='add-photo-alternate' size={80} color='#E58B68' />
              )}
            </TouchableOpacity>
          </View>
          <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5 }} />
          <View style={styles.fieldSection}>
            <Text style={styles.label}>Food Name</Text>
            <TextInput
              placeholder="Food Name"
              value={foodName}
              onChangeText={setFoodName}
              style={styles.textInput}
            />
          </View>
          <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5 }} />
          <View style={styles.fieldSection}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              placeholder="Price"
              value={price}
              onChangeText={setPrice}
              style={styles.textInput}
            />
          </View>
          <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5 }} />
          <View style={styles.fieldSection}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.ingredientsInput}
              value={description}
              placeholder="Add food description"
              onChangeText={setDesc}
              multiline
            />
          </View>
          <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5 }} />
          <View style={styles.fieldSection}>
            <Text style={styles.label}>Ingredients</Text>
            <TextInput
              style={styles.ingredientsInput}
              value={ingredients}
              placeholder='Add food ingredients'
              onChangeText={setIngredients}
              multiline
            />
          </View>
        </View>

        <Text style={styles.title}>Nutrition Fact</Text>
        <View style={styles.section}>
          <View style={styles.fieldSection}>
            <Text style={styles.label}>Calories</Text>
            <View style={styles.infoContainer}>
              <TextInput
                value={calories}
                placeholder='Add food calorie'
                onChangeText={setCal}
                keyboardType='numeric'
                style={styles.textInput}
              />
              <Text style={styles.unit}>kcal</Text>
            </View>
          </View>
          <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5 }} />
          <View style={styles.fieldSection}>
            <Text style={styles.label}>Fat</Text>
            <View style={styles.infoContainer}>
              <TextInput
                value={fat}
                placeholder='Add food fat'
                onChangeText={setFat}
                keyboardType='numeric'
                style={styles.textInput}
              />
              <Text style={styles.unit}>g</Text>
            </View>
          </View>
          <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5 }} />
          <View style={styles.fieldSection}>
            <Text style={styles.label}>Carbohydrate</Text>
            <View style={styles.infoContainer}>
              <TextInput
                value={carbs}
                placeholder='Add food carbohydrate'
                onChangeText={setCarbs}
                keyboardType='numeric'
                style={styles.textInput}
              />
              <Text style={styles.unit}>g</Text>
            </View>
          </View>
          <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5 }} />
          <View style={styles.fieldSection}>
            <Text style={styles.label}>Protein</Text>
            <View style={styles.infoContainer}>
              <TextInput
                value={protein}
                placeholder='Add food protein'
                onChangeText={setProtein}
                keyboardType='numeric'
                style={styles.textInput}
              />
              <Text style={styles.unit}>g</Text>
            </View>
          </View>
          <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5 }} />
          <View style={styles.fieldSection}>
            <Text style={styles.label}>Sugar</Text>
            <View style={styles.infoContainer}>
              <TextInput
                value={sugar}
                placeholder='Add food sugar'
                onChangeText={setSugar}
                keyboardType='numeric'
                style={styles.textInput}
              />
              <Text style={styles.unit}>g</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:'#f5f5f5',
  },
  title:{
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    marginTop:16,
    marginHorizontal:16,
    color:'#808080'
  },
  label:{
    fontSize:14,
    fontFamily:'Poppins-Regular'
  },
  fieldSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    alignItems:'center'
  },
  textInput: {
    fontFamily:'Poppins-Regular',
    fontSize:14,
    textAlign:'right'
  },
  section: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    borderColor:'#808080',
    borderTopWidth:0.5,
    borderBottomWidth:0.5
  },

  ingredientsInput: {
    textAlign:'right',
  },

  factContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    marginTop: 20,
  },

  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  unit: {
    fontSize: 14,
    fontFamily:'Poppins-Regular',
    paddingLeft:8
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginVertical: 10,
  }
});
       

export default createMenu;