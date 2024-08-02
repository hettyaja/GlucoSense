import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView, View, TouchableOpacity, TextInput } from 'react-native';
import { DietPlanContext } from '../context/DietPlanContext';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DietPlanEntry from './DietPlanEntry';
import { useAuth } from '../service/AuthContext';
// import EditDietPlanController from '../Controller/EditDietPlanController';

const initialDietPlanState = {
  planName: '',
  price: '',
  Monday: { Lunch: { image: '', name: '', description: '', ingredients: '' }, Dinner: { image: '', name: '', description: '', ingredients: '' } },
  Tuesday: { Lunch: { image: '', name: '', description: '', ingredients: '' }, Dinner: { image: '', name: '', description: '', ingredients: '' } },
  Wednesday: { Lunch: { image: '', name: '', description: '', ingredients: '' }, Dinner: { image: '', name: '', description: '', ingredients: '' } },
  Thursday: { Lunch: { image: '', name: '', description: '', ingredients: '' }, Dinner: { image: '', name: '', description: '', ingredients: '' } },
  Friday: { Lunch: { image: '', name: '', description: '', ingredients: '' }, Dinner: { image: '', name: '', description: '', ingredients: '' } },
  Saturday: { Lunch: { image: '', name: '', description: '', ingredients: '' }, Dinner: { image: '', name: '', description: '', ingredients: '' } },
  Sunday: { Lunch: { image: '', name: '', description: '', ingredients: '' }, Dinner: { image: '', name: '', description: '', ingredients: '' } },
};

const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const EditDietPlan = () => {
  const { user } = useAuth();
  const { updateDietPlan } = useContext(DietPlanContext);
  const { dietPlan: dietPlanParam } = useLocalSearchParams();
  const [dietPlan, setDietPlan] = useState(dietPlanParam ? JSON.parse(dietPlanParam) : initialDietPlanState);
  const router = useRouter();

  console.log(dietPlan);
  
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
    try {
      await EditDietPlanController.updateDietPlan(user.uid, dietPlan.id, dietPlan);
      updateDietPlan(dietPlan.id, dietPlan);
      router.push('/Boundary/planBP'); // Ensure this path is correct
    } catch (error) {
      console.error("Error updating document: ", error);
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
          <TouchableOpacity onPress={handleSave}>
            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: 'white' }}>Save</Text>
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
          </View>

          {dayOrder.map((day) => (
            <View key={day}>
              <Text style={styles.mealTitle}>{day}</Text>
              <DietPlanEntry
                day={day}
                mealType="Lunch"
                entry={dietPlan[day]?.Lunch}
                setEntry={setEntry}
              />
              <DietPlanEntry
                day={day}
                mealType="Dinner"
                entry={dietPlan[day]?.Dinner}
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
    textAlign:'right'
  },
  input: {
    marginHorizontal: 16,
    textAlign:'right'
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
  }
});

export default EditDietPlan;
