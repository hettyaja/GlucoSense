import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView, View, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CreateDietPlanController from '../Controller/CreateDietPlanController';
import DietPlanEntry from './DietPlanEntry';
import { useAuth } from '../service/AuthContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { uploadDietPlanImage } from '../service/storageService';

const initialDietPlanState = {
  Monday: { Lunch: { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '', sugar: '' }, Dinner: { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '', sugar: '' } },
  Tuesday: { Lunch: { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '', sugar: '' }, Dinner: { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '', sugar: '' } },
  Wednesday: { Lunch: { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '', sugar: '' }, Dinner: { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '', sugar: '' } },
  Thursday: { Lunch: { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '', sugar: '' }, Dinner: { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '', sugar: '' } },
  Friday: { Lunch: { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '', sugar: '' }, Dinner: { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '', sugar: '' } },
  Saturday: { Lunch: { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '', sugar: '' }, Dinner: { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '', sugar: '' } },
  Sunday: { Lunch: { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '', sugar: '' }, Dinner: { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '', sugar: '' } },
};

// Nutritional Thresholds
const THRESHOLDS = {
  calories: { max: 700 },
  totalFat: { max: 20 },
  carbohydrates: { max: 60 },
  protein: { min: 10 }, // Minimum protein required
  sugar: { max: 10 }, // Maximum sugar allowed
};

const CreateDietPlan = () => {
  const { user } = useAuth();
  const [dietPlans, setDietPlans] = useState(initialDietPlanState);
  const [planName, setPlanName] = useState('');
  const [price, setPrice] = useState('');
  const [planImage, setPlanImage] = useState('');
  const [tempImages, setTempImages] = useState({});
  const router = useRouter();

  const setEntry = (day, mealType, entry) => {
    setDietPlans((prevDietPlans) => ({
      ...prevDietPlans,
      [day]: {
        ...prevDietPlans[day],
        [mealType]: entry,
      },
    }));
  };

  const validateNutrition = () => {
    for (const day in dietPlans) {
      for (const mealType in dietPlans[day]) {
        const meal = dietPlans[day][mealType];
        if (
          parseFloat(meal.calorie) > THRESHOLDS.calories.max ||
          parseFloat(meal.fat) > THRESHOLDS.totalFat.max ||
          parseFloat(meal.carbs) > THRESHOLDS.carbohydrates.max ||
          parseFloat(meal.protein) < THRESHOLDS.protein.min ||
          parseFloat(meal.sugar) > THRESHOLDS.sugar.max
        ) {
          return `Meal "${meal.name}" on ${day} ${mealType} exceeds/falls short of the nutritional threshold:
            - Calories: ${meal.calorie} kcal (maximum allowed: ${THRESHOLDS.calories.max} kcal)
            - Fat: ${meal.fat} g (maximum allowed: ${THRESHOLDS.totalFat.max} g)
            - Carbs: ${meal.carbs} g (maximum allowed: ${THRESHOLDS.carbohydrates.max} g)
            - Protein: ${meal.protein} g (minimum allowed: ${THRESHOLDS.protein.min} g)
            - Sugar: ${meal.sugar} g (maximum allowed: ${THRESHOLDS.sugar.max} g)`;
        }
      }
    }
    return null;
  };

  const handleSave = async () => {
    const validationMessage = validateNutrition();
    if (validationMessage) {
      Alert.alert('Nutritional Limit Exceeded', validationMessage);
      return;
    }

    try {
      const planImageURL = await uploadDietPlanImage(user.uid, planImage);
      setPlanImage(planImageURL);

      const updatedDietPlans = { ...dietPlans };
      for (const day in updatedDietPlans) {
        for (const mealType in updatedDietPlans[day]) {
          const meal = updatedDietPlans[day][mealType];
          const tempUri = tempImages[`${day}_${mealType}`];
          if (tempUri) {
            const imageURL = await uploadDietPlanImage(user.uid, tempUri);
            updatedDietPlans[day][mealType].image = imageURL;
          }
        }
      }

      const completeDietPlan = {
        planName,
        price,
        planImage: planImageURL,
        ...updatedDietPlans,
      };

      await CreateDietPlanController.createDietPlan(user.uid, completeDietPlan);
      router.push('/Boundary/planBP');
    } catch (error) {
      console.error("Error adding document: ", error);
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
      setPlanImage(result.assets[0].uri);
    }
  };

  const addEntryImage = async (day, mealType) => {
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
      setTempImages((prev) => ({
        ...prev,
        [`${day}_${mealType}`]: result.assets[0].uri,
      }));
      setEntry(day, mealType, { ...dietPlans[day][mealType], image: result.assets[0].uri });
    }
  };

  return (
    <>
      <Stack.Screen options={{
        title: 'Create diet plan',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Medium', fontSize:16},
        headerTitle: 'Create diet plan',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name='chevron-back' size={24} color='white'/>
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={handleSave}>
            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: 'white' }}>Publish</Text>
          </TouchableOpacity>
        ),
      }}/>

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.section}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Diet Plan Name</Text>
              <View>
                <TextInput
                  placeholder='Enter diet plan name'
                  style={styles.input}
                  value={planName}
                  onChangeText={setPlanName}
                />
              </View>
            </View>
            <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5}} />
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Price per week</Text>
              <View>
                <TextInput
                  placeholder='Enter price'
                  style={styles.input}
                  value={price}
                  onChangeText={setPrice}
                />
              </View>
            </View>
            <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5}} />
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Photo</Text>
              <View>
              <TouchableOpacity onPress={addImage} style={styles.imageUpload}>
              {planImage ? (
                <Image source={{ uri: planImage }} style={styles.uploadedImage} />
              ) : (
                <MaterialIcons name='add-photo-alternate' size={56} color='#E58B68'/>
              )}
              </TouchableOpacity>
              </View>
            </View>
          </View>

          {Object.keys(dietPlans).map((day) => (
            <View key={day}>
              <Text style={styles.mealTitle}>{day}</Text>
              <DietPlanEntry
                day={day}
                mealType="Lunch"
                entry={dietPlans[day].Lunch}
                setEntry={setEntry}
                addEntryImage={addEntryImage}
                tempImages={tempImages}
              />
              <DietPlanEntry
                day={day}
                mealType="Dinner"
                entry={dietPlans[day].Dinner}
                setEntry={setEntry}
                addEntryImage={addEntryImage}
                tempImages={tempImages}
              />
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:'#f5f5f5'
  },
  container: {
    paddingVertical:16
  },
  section: {
    backgroundColor:'white',
    borderTopWidth:0.5,
    borderBottomWidth:0.5,
    borderColor:'#808080',
  },
  inputContainer: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingVertical:8,
    textAlign:'right'
  },
  input: {
    marginHorizontal:16,
    textAlign:'right'
  },
  label: {
    fontFamily:'Poppins-Regular',
    fontSize: 14,
    marginHorizontal:16
  },
  mealTitle: { 
    fontSize: 14,
    fontFamily:'Poppins-Medium',
    color:'#808080',
    paddingHorizontal:16,
    marginTop:16
  },
  imageUpload: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    width: 80,
    height: 80,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadedImage: { width: 56, height: 56, borderRadius: 10 },
});

export default CreateDietPlan;
