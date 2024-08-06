import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView, View, TouchableOpacity, TextInput, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CreateDietPlanController from '../Controller/CreateDietPlanController';
import DietPlanEntry from './DietPlanEntry';
import { useAuth } from '../service/AuthContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { uploadDietPlanImage } from '../service/storageService';

const initialDietPlanState = {
  Monday: { Lunch: { image: '', name: '', description: '', ingredients: '' }, Dinner: { image: '', name: '', description: '', ingredients: '' } },
  Tuesday: { Lunch: { image: '', name: '', description: '', ingredients: '' }, Dinner: { image: '', name: '', description: '', ingredients: '' } },
  Wednesday: { Lunch: { image: '', name: '', description: '', ingredients: '' }, Dinner: { image: '', name: '', description: '', ingredients: '' } },
  Thursday: { Lunch: { image: '', name: '', description: '', ingredients: '' }, Dinner: { image: '', name: '', description: '', ingredients: '' } },
  Friday: { Lunch: { image: '', name: '', description: '', ingredients: '' }, Dinner: { image: '', name: '', description: '', ingredients: '' } },
  Saturday: { Lunch: { image: '', name: '', description: '', ingredients: '' }, Dinner: { image: '', name: '', description: '', ingredients: '' } },
  Sunday: { Lunch: { image: '', name: '', description: '', ingredients: '' }, Dinner: { image: '', name: '', description: '', ingredients: '' } },
};

const CreateDietPlan = () => {
  const { user } = useAuth();
  const [dietPlans, setDietPlans] = useState(initialDietPlanState);
  const [planName, setPlanName] = useState('');
  const [price, setPrice] = useState('');
  const [planImage, setPlanImage] = useState('');
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

  const handleSave = async () => {
    try {
      // Upload plan image
      const planImageURL = await uploadDietPlanImage(user.uid, planImage);
      setPlanImage(planImageURL);

      // Upload diet plan images
      const updatedDietPlans = { ...dietPlans };
      for (const day in updatedDietPlans) {
        for (const mealType in updatedDietPlans[day]) {
          const meal = updatedDietPlans[day][mealType];
          if (meal.image) {
            const imageURL = await uploadDietPlanImage(user.uid, meal.image);
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
      router.push('/Boundary/planBP'); // Ensure this path is correct
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
              />
              <DietPlanEntry
                day={day}
                mealType="Dinner"
                entry={dietPlans[day].Dinner}
                setEntry={setEntry}
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
