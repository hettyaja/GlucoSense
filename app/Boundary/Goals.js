import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Modal, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const NumericPicker = ({ visible, onSelect, range, onClose }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <TouchableOpacity style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.pickerContainer}>
          <FlatList
            data={range}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.pickerItem} onPress={() => onSelect(item + ' mg/dL')}>
                <Text style={styles.pickerText}>{item} mg/dL</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.toString()}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const Goals = () => {
  const navigation = useNavigation();
  const [type, setType] = useState("BMR Calculated");
  const [weightGoal, setWeightGoal] = useState("Maintain");
  const [exerciseLevel, setExerciseLevel] = useState("Light");
  const [calorieGoal, setCalorieGoal] = useState(2000); // Changed to number for easier manipulation
  const [beforeMeal, setBeforeMeal] = useState("100 mg/dL"); // Added units
  const [afterMeal, setAfterMeal] = useState("140 mg/dL"); // Added units
  const [showBeforeMealPicker, setShowBeforeMealPicker] = useState(false);
  const [showAfterMealPicker, setShowAfterMealPicker] = useState(false);

  const beforeMealRange = Array.from({ length: 51 }, (_, i) => i + 80); // 80 to 130
  const afterMealRange = Array.from({ length: 101 }, (_, i) => i + 80); // 80 to 180

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
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
            onValueChange={(itemValue) => {
              setType(itemValue);
              if (itemValue === "BMR Calculated") {
                setCalorieGoal(2000);
              } else {
                setCalorieGoal(""); // Make it editable
              }
            }}
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
                onValueChange={(itemValue) => setWeightGoal(itemValue)}
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
          </>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Calorie Goal</Text>
          <TextInput
            value={`${calorieGoal} kcal`} // Added units
            onChangeText={(text) => setCalorieGoal(text.replace(/ kcal/g, ''))} // Remove units on edit
            keyboardType="numeric"
            style={styles.textInputFull}
            editable={type === "Custom"}
          />
        </View>

        <Text style={styles.sectionTitle}>Glucose</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Before Meal</Text>
          <TouchableOpacity onPress={() => setShowBeforeMealPicker(true)} style={styles.pickerInput}>
            <Text>{beforeMeal}</Text>
          </TouchableOpacity>
          <NumericPicker
            visible={showBeforeMealPicker}
            onSelect={(value) => {
              setBeforeMeal(value);
              setShowBeforeMealPicker(false);
            }}
            onClose={() => setShowBeforeMealPicker(false)}
            range={beforeMealRange}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>After Meal</Text>
          <TouchableOpacity onPress={() => setShowAfterMealPicker(true)} style={styles.pickerInput}>
            <Text>{afterMeal}</Text>
          </TouchableOpacity>
          <NumericPicker
            visible={showAfterMealPicker}
            onSelect={(value) => {
              setAfterMeal(value);
              setShowAfterMealPicker(false);
            }}
            onClose={() => setShowAfterMealPicker(false)}
            range={afterMealRange}
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
    width: '60%',
    textAlign: 'right',
  },
  picker: {
    width: '60%',
    height: 50,
  },
  pickerInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  pickerContainer: {
    backgroundColor: 'white',
    width: '80%',
    maxHeight: '60%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  pickerItem: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  pickerText: {
    fontSize: 18,
  }
});

export default Goals;
