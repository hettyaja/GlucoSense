import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView, View, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DietPlanEntry from './DietPlanEntry';
import { useAuth } from '../service/AuthContext';
import UpdateDietPlanController from '../Controller/UpdateDietPlanController';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { decode as atob } from 'base-64';
import { uploadDietPlanImage, deleteImage } from '../service/storageService';

const initialDietPlanState = {
  planName: '',
  price: '',
  planImage: '',
  Monday: { Lunch: { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '' }, Dinner: { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '' } },
  Tuesday: { Lunch: { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '' }, Dinner: { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '' } },
  Wednesday: { Lunch: { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '' }, Dinner: { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '' } },
  Thursday: { Lunch: { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '' }, Dinner: { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '' } },
  Friday: { Lunch: { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '' }, Dinner: { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '' } },
  Saturday: { Lunch: { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '' }, Dinner: { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '' } },
  Sunday: { Lunch: { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '' }, Dinner: { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '' } },
};

const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const EditDietPlan = () => {
  const { user } = useAuth();
  const { dietPlanData } = useLocalSearchParams();
  const [dietPlan, setDietPlan] = useState(dietPlanData ? JSON.parse(atob(dietPlanData)) : initialDietPlanState);
  const [tempImages, setTempImages] = useState({});
  const [tempImageUri, setTempImageUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const setEntry = (day, mealType, entry) => {
    setDietPlan((prevDietPlan) => ({
      ...prevDietPlan,
      [day]: {
        ...prevDietPlan[day],
        [mealType]: entry,
      },
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      let updatedDietPlan = { ...dietPlan };
      
      if (tempImageUri) {
        const newImageUrl = await uploadDietPlanImage(user.uid, tempImageUri);
        const previousImage = dietPlan.planImage;
        
        if (previousImage) {
          await deleteImage(previousImage);
        }
        
        updatedDietPlan = {
          ...updatedDietPlan,
          planImage: newImageUrl
        };
      }

      for (const day of dayOrder) {
        for (const mealType of ['Lunch', 'Dinner']) {
          const entry = updatedDietPlan[day][mealType];
          const tempUri = tempImages[`${day}_${mealType}`];
          if (tempUri) {
            const previousImage = entry.image;
            const newImageUrl = await uploadDietPlanImage(user.uid, tempUri);
            
            if (previousImage) {
              await deleteImage(previousImage);
            }
            
            entry.image = newImageUrl;
          }
        }
      }

      console.log('during saving', updatedDietPlan);
      await UpdateDietPlanController.updateDietPlan(user.uid, updatedDietPlan);
      router.replace('/Boundary/planBP'); // Ensure this path is correct
    } catch (error) {
      console.error("Error updating document: ", error);
    } finally {
      setLoading(false);
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
      setTempImageUri(result.assets[0].uri);
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
      // setEntry(day, mealType, { ...dietPlan[day][mealType], image: result.assets[0].uri });
    }
  };

  return (
    <>
      <Stack.Screen options={{
        title: 'Edit Diet Plan',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Medium', fontSize: 16 },
        headerTitle: 'Edit Diet Plan',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name='chevron-back' size={24} color='white' />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={handleSave} disabled={loading}>
            {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: 'white' }}>Save</Text>}
          </TouchableOpacity>
        ),
      }} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.section}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Diet Plan Name</Text>
              <View>
                <TextInput
                  placeholder='Enter diet plan name'
                  style={styles.input}
                  value={dietPlan.planName}
                  onChangeText={(text) => setDietPlan((prev) => ({ ...prev, planName: text }))}
                />
              </View>
            </View>
            <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5 }} />
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Price per day</Text>
              <View>
                <TextInput
                  placeholder='Enter price'
                  style={styles.input}
                  value={dietPlan.price}
                  onChangeText={(text) => setDietPlan((prev) => ({ ...prev, price: text }))}
                />
              </View>
            </View>
            <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5 }} />
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Photo</Text>
              <TouchableOpacity onPress={addImage} style={styles.imageUpload}>
                {tempImageUri || dietPlan.planImage ? (
                  <Image source={{ uri: tempImageUri || dietPlan.planImage }} style={styles.uploadedImage} />
                ) : (
                  <MaterialIcons name='add-photo-alternate' size={56} color='#E58B68' />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {dayOrder.map((day) => (
            <View key={day}>
              <Text style={styles.mealTitle}>{day}</Text>
              <DietPlanEntry
                day={day}
                mealType="Lunch"
                entry={dietPlan[day]?.Lunch || { image: '', name: '', description: '', ingredients: '' }}
                setEntry={setEntry}
                addEntryImage={addEntryImage}
                tempImages={tempImages}
              />
              <DietPlanEntry
                day={day}
                mealType="Dinner"
                entry={dietPlan[day]?.Dinner || { image: '', name: '', description: '', ingredients: '' }}
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
    backgroundColor: '#f5f5f5'
  },
  container: {
    paddingVertical: 16
  },
  section: {
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#808080',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    textAlign: 'right'
  },
  input: {
    marginHorizontal: 16,
    textAlign: 'right'
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginHorizontal: 16
  },
  mealTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#808080',
    paddingHorizontal: 16,
    marginTop: 16
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

export default EditDietPlan;
