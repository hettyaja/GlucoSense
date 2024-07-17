import React, { useState, useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { DietPlanContext } from '../context/DietPlanContext';
import { Picker } from '@react-native-picker/picker';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const EditDietPlan = () => {
  const { dietPlan: dietPlanStr, userId } = useLocalSearchParams();
  const dietPlan = JSON.parse(dietPlanStr);
  const { updateDietPlan } = useContext(DietPlanContext);
  const [day, setDay] = useState(dietPlan.day);
  const [lunchImage, setLunchImage] = useState(dietPlan.meals.lunch.image);
  const [dinnerImage, setDinnerImage] = useState(dietPlan.meals.dinner.image);
  const [lunchTitle, setLunchTitle] = useState(dietPlan.meals.lunch.title);
  const [dinnerTitle, setDinnerTitle] = useState(dietPlan.meals.dinner.title);
  const [lunchDescription, setLunchDescription] = useState(dietPlan.meals.lunch.description);
  const [dinnerDescription, setDinnerDescription] = useState(dietPlan.meals.dinner.description);
  const [lunchIngredients, setLunchIngredients] = useState(dietPlan.meals.lunch.ingredients);
  const [dinnerIngredients, setDinnerIngredients] = useState(dietPlan.meals.dinner.ingredients);
  const router = useRouter();

  const addImage = async (setImage) => {
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

  const handleSave = async () => {
    const updatedDietPlan = {
      ...dietPlan,
      day,
      meals: {
        lunch: {
          image: lunchImage,
          title: lunchTitle,
          description: lunchDescription,
          ingredients: lunchIngredients,
        },
        dinner: {
          image: dinnerImage,
          title: dinnerTitle,
          description: dinnerDescription,
          ingredients: dinnerIngredients,
        },
      },
    };
    try {
      const dietPlanDoc = doc(db, `businessPartner/${userId}/dietplan`, dietPlan.id);
      await updateDoc(dietPlanDoc, updatedDietPlan);
      updateDietPlan(updatedDietPlan);
      router.push('/Boundary/planBP');
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <>
      <Stack.Screen options={{
        title: 'Edit Diet Plan',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold'},
        headerTitle: 'Edit Diet Plan',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name='chevron-back' size={32} color='white'/>
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={handleSave}>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 14, color: 'white' }}>Save</Text>
          </TouchableOpacity>
        ),
      }}/>

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Day</Text>
            <Picker selectedValue={day} onValueChange={(itemValue) => setDay(itemValue)} style={styles.picker}>
              <Picker.Item label="Select day" value="" />
              <Picker.Item label="Monday" value="Monday" />
              <Picker.Item label="Tuesday" value="Tuesday" />
              <Picker.Item label="Wednesday" value="Wednesday" />
              <Picker.Item label="Thursday" value="Thursday" />
              <Picker.Item label="Friday" value="Friday" />
              <Picker.Item label="Saturday" value="Saturday" />
              <Picker.Item label="Sunday" value="Sunday" />
            </Picker>
          </View>

          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Lunch</Text>
            <TouchableOpacity onPress={() => addImage(setLunchImage)} style={styles.imageUpload}>
              {lunchImage ? (
                <Image source={{ uri: lunchImage }} style={styles.uploadedImage} />
              ) : (
                <View style={styles.uploadPlaceholder}>
                  <Image source={require('../assets/iconCarrier.png')} style={styles.uploadIcon} />
                  <Text>Upload recipe photo</Text>
                </View>
              )}
            </TouchableOpacity>
            <TextInput placeholder="Name" value={lunchTitle} onChangeText={setLunchTitle} style={styles.input} />
            <TextInput placeholder="Description" value={lunchDescription} onChangeText={setLunchDescription} style={styles.input} />
            <TextInput placeholder="Ingredients" value={lunchIngredients} onChangeText={setLunchIngredients} style={styles.input} />
          </View>

          <View style={styles.mealContainer}>
            <Text style={styles.mealTitle}>Dinner</Text>
            <TouchableOpacity onPress={() => addImage(setDinnerImage)} style={styles.imageUpload}>
              {dinnerImage ? (
                <Image source={{ uri: dinnerImage }} style={styles.uploadedImage} />
              ) : (
                <View style={styles.uploadPlaceholder}>
                  <Image source={require('../assets/iconCarrier.png')} style={styles.uploadIcon} />
                  <Text>Upload recipe photo</Text>
                </View>
              )}
            </TouchableOpacity>
            <TextInput placeholder="Name" value={dinnerTitle} onChangeText={setDinnerTitle} style={styles.input} />
            <TextInput placeholder="Description" value={dinnerDescription} onChangeText={setDinnerDescription} style={styles.input} />
            <TextInput placeholder="Ingredients" value={dinnerIngredients} onChangeText={setDinnerIngredients} style={styles.input} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { padding: 20 },
  inputContainer: { marginVertical: 10 },
  picker: { height: 50, width: '100%' },
  mealContainer: { marginTop: 20 },
  mealTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  imageUpload: { justifyContent: 'center', alignItems: 'center', borderColor: '#ccc', borderWidth: 1, borderRadius: 10, padding: 20, marginBottom: 10 },
  uploadedImage: { width: 100, height: 100, borderRadius: 10 },
  uploadPlaceholder: { alignItems: 'center' },
  uploadIcon: { width: 30, height: 30, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, marginBottom: 10 },
  label: { fontSize: 16, marginBottom: 5 },
});

export default EditDietPlan;