import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const Goals = () => {
  const navigation = useNavigation(); // Use the hook to get navigation
  const [type, setType] = useState("BMR Calculated");
  const [weightGoal, setWeightGoal] = useState("Maintain");
  const [exerciseLevel, setExerciseLevel] = useState("Light");
  const [calorieGoal, setCalorieGoal] = useState("2000");
  const [beforeMeal, setBeforeMeal] = useState("80 - 130");
  const [afterMeal, setAfterMeal] = useState("80 - 180");

  // Function to handle the change of type
  const handleTypeChange = (itemValue) => {
    setType(itemValue);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('setting')} style={styles.iconButton}>
          <MaterialIcons name="close" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Goals</Text>
        <TouchableOpacity onPress={() => console.log('Save Pressed')} style={styles.iconButton}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Calorie</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Type</Text>
          <Picker
            selectedValue={type}
            onValueChange={handleTypeChange}
            style={styles.picker}
            mode="dropdown"
          >
            <Picker.Item label="BMR Calculated" value="BMR Calculated" />
            <Picker.Item label="Custom" value="Custom" />
          </Picker>
        </View>

        {type === "BMR Calculated" && (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Weight Goal</Text>
              <Picker
                selectedValue={weightGoal}
                onValueChange={setWeightGoal}
                style={styles.picker}
                mode="dropdown"
              >
                <Picker.Item label="Maintain" value="Maintain" />
                <Picker.Item label="Lose Weight" value="Lose Weight" />
                <Picker.Item label="Gain Weight" value="Gain Weight" />
              </Picker>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Exercise Level</Text>
              <Picker
                selectedValue={exerciseLevel}
                onValueChange={setExerciseLevel}
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
          </>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Calorie Goal</Text>
          <TextInput
            value={calorieGoal}
            onChangeText={setCalorieGoal}
            keyboardType="numeric"
            style={styles.textInputFull}
          />
        </View>

        <Text style={styles.sectionTitle}>Glucose</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Before Meal</Text>
          <TextInput
            value={beforeMeal}
            onChangeText={setBeforeMeal}
            style={styles.textInputFull}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>After Meal</Text>
          <TextInput
            value={afterMeal}
            onChangeText={setAfterMeal}
            style={styles.textInputFull}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#E58B68',
  },
  iconButton: {
    minWidth: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  saveButton: {
    color: 'white',
    fontSize: 16,
  },
  form: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  textInputFull: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '60%',  // Adjust width to match design
    textAlign: 'right',
  },
  picker: {
    width: '60%',  // Adjust width to match design
    height: 50,
  },
});

export default Goals;
