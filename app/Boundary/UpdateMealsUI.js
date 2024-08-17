// UpdateMealsUI.js
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Feather from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import UpdateMealController from '../Controller/UpdateMealLogsController';
import DeleteMealController from '../Controller/DeleteMealLogsController';
import Header from '../components/Header';
import { useAuth } from '../service/AuthContext';

const editMeals = () => {
  const { user } = useAuth();
  const { mealData } = useLocalSearchParams();
  const [parsedMealData, setParsedMealData] = useState(mealData ? JSON.parse(mealData) : null);

  const [selectedDate, setSelectedDate] = useState(new Date(parsedMealData.time.seconds * 1000));
  const [selectedValue, setSelectedValue] = useState(parsedMealData.period);
  const [calories, setCalories] = useState(parsedMealData.calories);
  const [fat, setFat] = useState(parsedMealData.fat);
  const [carbs, setCarbs] = useState(parsedMealData.carbs);
  const [protein, setProtein] = useState(parsedMealData.protein);
  const [notes, setNotes] = useState(parsedMealData.notes);

  const saveMeals = async () => {
    if (user) {
      const updatedMealLog = {
        id: parsedMealData.id,
        mealName: parsedMealData.mealName,
        servings: parsedMealData.servings,
        calories,
        fat,
        protein,
        carbs,
        notes,
        time: selectedDate,
        period: selectedValue,
      };

      try {
        await UpdateMealController.updateMealLogs(user.uid, updatedMealLog);
        console.log('Meal log updated:', updatedMealLog);
        router.replace('Boundary/home');
      } catch (error) {
        console.error('Error updating meal log:', error);
      }
    }
  };

  const removeData = () => {
    setParsedMealData(null);
    setCalories(0);
    setCarbs(0);
    setFat(0);
    setProtein(0);
  };

  const clearMealData = () => {
    Alert.alert(
      "Delete Meal",
      "Are you sure you want to delete this meal?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => removeData() }
      ],
      { cancelable: false }
    );
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const confirmDelete = () => {
    Alert.alert(
      "Delete Log",
      "Are you sure you want to delete this log?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => handleDelete() }
      ]
    );
  };

  const handleDelete = async () => {
    try {
      await DeleteMealController.deleteMealLogs(user.uid, parsedMealData.id);
      router.replace('Boundary/home');
    } catch (error) {
      console.error('Error deleting log:', error);
    }
  };

  return (
    <>
      <Header
        title="Edit Meal Diary"
        leftButton="Close"
        onLeftButtonPress={() => router.back('/home')}
        rightButton="Save"
        onRightButtonPress={() => saveMeals()}
      />

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Time</Text>
            <TouchableOpacity onPress={showDatePicker}>
              <Text style={styles.value}>{selectedDate.toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={[styles.label, {padding:16}]}>Period</Text>
            <Picker
              selectedValue={selectedValue}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
              <Picker.Item label="Before breakfast" value="Before breakfast" />
              <Picker.Item label="After breakfast" value="After breakfast" />
              <Picker.Item label="Before lunch" value="Before lunch" />
              <Picker.Item label="After lunch" value="After lunch" />
              <Picker.Item label="Before dinner" value="Before dinner" />
              <Picker.Item label="After dinner" value="After dinner" />
            </Picker>
          </View>
        </View>

        {parsedMealData && (
          <View style={styles.mealContainer}>
            <Text style={styles.itemTitle}>{parsedMealData.mealName}</Text>
            <View style={styles.mealActions}>
              <Text style={styles.servingsText}>{parsedMealData.servings} Serving</Text>
              
            </View>
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Calories</Text>
            <Text style={styles.itemTitle}>{calories} kcal</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Carbs</Text>
            <Text style={styles.itemTitle}>{carbs} g</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Protein</Text>
            <Text style={styles.itemTitle}>{protein} g</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Fat</Text>
            <Text style={styles.itemTitle}>{fat} g</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Notes</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Add notes"
              value={notes}
              onChangeText={setNotes}
              multiline
            />
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        display="inline"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#808080',
    marginVertical: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding:16
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  value: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#808080',
  },
  separator: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#808080',
  },
  picker: {
    width: '50%',
    height: 40,
    color: '#808080',
  },
  mealContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: 'white',
    marginHorizontal: 24,
    marginTop: 16,
    padding: 16,
    justifyContent: 'space-between',
  },
  mealActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  servingsText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    paddingRight: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  notesInput: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'right',
    flex: 1,
    marginHorizontal: 16,
  },
  deleteButton: {
    padding: 16,
    alignItems: 'center',
  },
  deleteText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: 'red',
  },
});

export default editMeals;
