import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Header from '../components/Header';
import { router } from 'expo-router';
import UserGoalsController from '../Controller/UserGoalsController';
import { useAuth } from '../service/AuthContext';

const Goals = () => {
  const { user } = useAuth();
  
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [birthdate, setBirthdate] = useState('');
  
  const [weightGoal, setWeightGoal] = useState("Maintain");
  const [exerciseLevel, setExerciseLevel] = useState("Light");
  const [BMRCalorieGoal, setBMRCalorieGoal] = useState(2000);
  const [customCalorieGoal, setCustomCalorieGoal] = useState('');
  const [beforeMealLowerBound, setBeforeMealLowerBound] = useState("80");
  const [beforeMealUpperBound, setBeforeMealUpperBound] = useState("130");
  const [afterMealLowerBound, setAfterMealLowerBound] = useState("80");
  const [afterMealUpperBound, setAfterMealUpperBound] = useState("180");

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const profileData = await UserGoalsController.fetchUserGoals(user.uid);
        
        // Set profile data
        setWeight(profileData.weight);
        setGender(profileData.gender);
        setHeight(profileData.height);
        setBirthdate(profileData.birthdate);
        
        // Set the fetched goals data to state variables
        setWeightGoal(profileData.goals.BMRGoals.weightGoals);
        setExerciseLevel(profileData.goals.BMRGoals.activityLevel);
        setBMRCalorieGoal(profileData.goals.BMRGoals.calorieGoals);
        setCustomCalorieGoal(profileData.goals.customGoals.calorieGoals || '');
        setBeforeMealLowerBound(profileData.goals.glucoseGoals.beforeMealLowerBound.toString());
        setBeforeMealUpperBound(profileData.goals.glucoseGoals.beforeMealUpperBound.toString());
        setAfterMealLowerBound(profileData.goals.glucoseGoals.afterMealLowerBound.toString());
        setAfterMealUpperBound(profileData.goals.glucoseGoals.afterMealUpperBound.toString());

      } catch (error) {
        console.error('Failed to load profile data:', error);
      }
    };

    loadProfileData();
  }, [user]);

  useEffect(() => {
    // Recalculate BMRCalorieGoal whenever weightGoal or exerciseLevel changes
    if (gender && weight && height && birthdate) {
      const newCalorieGoal = calculateBMRAndTDEE(weightGoal, exerciseLevel);
      setBMRCalorieGoal(newCalorieGoal);
    }
  }, [weightGoal, exerciseLevel, gender, weight, height, birthdate]);

  const calculateBMRAndTDEE = (weightGoal, exerciseLevel) => {
    const age = new Date().getFullYear() - new Date(birthdate).getFullYear();

    // Calculate BMR
    let BMR;
    if (gender === 'Male') {
      BMR = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else if (gender === 'Female') {
      BMR = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    } else {
      throw new Error('Invalid gender');
    }

    // Determine activity level multiplier
    let activityMultiplier;
    switch (exerciseLevel) {
      case 'Sedentary':
        activityMultiplier = 1.2;
        break;
      case 'Light':
        activityMultiplier = 1.375;
        break;
      case 'Moderate':
        activityMultiplier = 1.55;
        break;
      case 'Active':
        activityMultiplier = 1.725;
        break;
      case 'Very Active':
        activityMultiplier = 1.9;
        break;
      default:
        activityMultiplier = 1.2;
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    const TDEE = BMR * activityMultiplier;

    // Adjust TDEE based on weight goal
    let adjustedCalorieGoal;
    switch (weightGoal) {
      case 'Maintain':
        adjustedCalorieGoal = TDEE;
        break;
      case 'Lose Weight':
        adjustedCalorieGoal = TDEE - 500;
        break;
      case 'Gain Weight':
        adjustedCalorieGoal = TDEE + 500;
        break;
      default:
        adjustedCalorieGoal = TDEE;
    }

    // Round the calorie goal
    return Math.round(adjustedCalorieGoal);
  };

  const saveUserGoals = async () => {
    try {
      // Save the updated goals to Firestore
      const updatedGoals = {
        BMRGoals: {
          weightGoals: weightGoal,
          activityLevel: exerciseLevel,
          calorieGoals: BMRCalorieGoal,
        },
        customGoals: {
          calorieGoals: customCalorieGoal || null,
        },
        glucoseGoals: {
          beforeMealLowerBound: parseInt(beforeMealLowerBound, 10),
          beforeMealUpperBound: parseInt(beforeMealUpperBound, 10),
          afterMealLowerBound: parseInt(afterMealLowerBound, 10),
          afterMealUpperBound: parseInt(afterMealUpperBound, 10),
        }
      };

      await UserGoalsController.saveUserGoals(user.uid, updatedGoals);
      router.back()

      console.log('Goals updated successfully');
      // Navigate back or show success message as needed

    } catch (error) {
      console.error('Failed to save goals:', error);
      // Handle errors as needed (e.g., show an alert)
    }
  };

  return (
    <>
      <Header
        title='Goal'
        leftButton='Back'
        onLeftButtonPress={() => router.back()}
        rightButton='Save'
        onRightButtonPress={saveUserGoals}
      />
      <ScrollView style={styles.container}>
        <Text style={styles.sectionTitle}>Calorie Goals (BMR Calculation)</Text>
        <View style={styles.section}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Weight Goal</Text>
            <Picker
              selectedValue={weightGoal}
              onValueChange={(itemValue) => setWeightGoal(itemValue)}
              style={styles.picker}
              mode="dropdown"
            >
              <Picker.Item label="Maintain" value="Maintain" />
              <Picker.Item label="Lose Weight" value="Lose Weight" />
              <Picker.Item label="Gain Weight" value="Gain Weight" />
            </Picker>
          </View>
          <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5}} />
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Exercise Level</Text>
            <Picker
              selectedValue={exerciseLevel}
              onValueChange={(itemValue) => setExerciseLevel(itemValue)}
              style={styles.picker}
              mode="dropdown"
            >
              <Picker.Item label="Sedentary" value="Sedentary" />
              <Picker.Item label="Light" value="Light" />
              <Picker.Item label="Moderate" value="Moderate" />
              <Picker.Item label="Active" value="Active" />
              <Picker.Item label="Very Active" value="Very Active" />
            </Picker>
          </View>
          <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5}} />
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Calculated Calorie Goal</Text>
            <TextInput
              value={`${BMRCalorieGoal} kcal`}
              editable={false}
              style={styles.textInputFull}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Calorie Goals (Custom Input)</Text>
        <View style={styles.section}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Custom Calorie Goal</Text>
            <TextInput
              value={customCalorieGoal}
              onChangeText={(text) => setCustomCalorieGoal(text)}
              keyboardType="numeric"
              style={styles.textInputFull}
              placeholderTextColor='#c5c5c5'
              placeholder="Enter calorie goal"
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Glucose Level Goals</Text>
        <View style={styles.section}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Before Meal</Text>
            <View style={styles.textInputSection}>
              <TextInput
                value={beforeMealLowerBound}
                onChangeText={(text) => setBeforeMealLowerBound(text)}
                keyboardType="numeric"
                placeholderTextColor='#c5c5c5'
                style={styles.textInputHalf}
                placeholder="000"
              />
              <Text style={styles.glucoseLabel}> - </Text>
              <TextInput
                value={beforeMealUpperBound}
                onChangeText={(text) => setBeforeMealUpperBound(text)}
                keyboardType="numeric"
                placeholderTextColor='#c5c5c5'
                style={styles.textInputHalf}
                placeholder="000"
              />
              <Text style={styles.glucoseLabel}>mg/dL</Text>
            </View>
          </View>
          <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5}} />
          <View style={styles.inputGroup}>
            <Text style={styles.label}>After Meal</Text>
            <View style={styles.textInputSection}>
              <TextInput
                value={afterMealLowerBound}
                onChangeText={(text) => setAfterMealLowerBound(text)}
                keyboardType="numeric"
                placeholderTextColor='#c5c5c5'
                style={styles.textInputHalf}
                placeholder="000"
              />
              <Text style={styles.glucoseLabel}> - </Text>
              <TextInput
                value={afterMealUpperBound}
                onChangeText={(text) => setAfterMealUpperBound(text)}
                keyboardType="numeric"
                placeholderTextColor='#c5c5c5'
                style={styles.textInputHalf}
                placeholder="000"
              />
              <Text style={styles.glucoseLabel}>mg/dL</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'Poppins-Regular',
    color: '#808080',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 4,
  },
  section: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    borderWidth: 0.5,
    borderColor: '#808080',
  },
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  textInputFull: {
    padding: 10,
    borderRadius: 5,
    width: '40%',
    textAlign: 'right',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#808080',
  },
  textInputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textInputHalf: {
    padding: 10,
    borderRadius: 5,
    width: '22%',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  glucoseLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  picker: {
    width: '42%',
    height: 40,
  },
});

export default Goals;
