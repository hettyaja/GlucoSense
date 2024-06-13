import { View, Text, StyleSheet, Alert, Button, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { images } from '../constants/images';
import { Picker } from '@react-native-picker/picker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useAuth } from './context/authContext';
import { addMealLog } from './service/diaryService';
import Feather from 'react-native-vector-icons/Feather'

const preReg = () => {
  const { user } = useAuth();
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedValue, setSelectedValue] = useState("Before breakfast");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { mealData } = useLocalSearchParams();
  const [parsedMealData, setParsedMealData] = useState(mealData ? JSON.parse(mealData) : null);

  const [calories, setCalories] = useState(parsedMealData?.calories || 0);
  const [fat, setFat] = useState(parsedMealData?.fat || 0);
  const [carbs, setCarbs] = useState(parsedMealData?.carbs || 0);
  const [protein, setProtein] = useState(parsedMealData?.protein || 0);
  const [notes, setNotes] = useState('');

  const saveMeals = async () => {
    if (user) {
      const newMealLog = {
        label: parsedMealData.label,
        category: parsedMealData.category,
        servings: parsedMealData.servings,
        calories: parsedMealData.calories,
        fat: parsedMealData.fat,
        protein: parsedMealData.protein,
        carbs: parsedMealData.carbs,
        notes,
        timestamp: selectedDate,
        period: selectedValue,
      };

      try {
        await addMealLog(user.uid, newMealLog);
        console.log('Meal log saved:', newMealLog);
        router.replace('/home')
      } catch (error) {
        console.error('Error saving meal log:', error);
      }
    }
  };

  const removeData = () => {
    setParsedMealData(null),
    setCalories(0),
    setCarbs(0),
    setFat(0),
    setProtein(0)
  }

  const clearMealData = () => {
    Alert.alert(
      "Delete Meal",
      "Are you sure you want to delete this meal?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Delete", onPress: () => removeData()}
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
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  return (
    <>
      <Stack.Screen options={{
        title: 'Add meal',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold' },
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back('/home')}>
            <AntDesign name='close' size={24} color='white' />
          </TouchableOpacity>
        ), headerRight: () => (
          <TouchableOpacity onPress={() => saveMeals()}>
            <Text style={{ padding: 2, marginHorizontal: 8, fontFamily: 'Poppins-SemiBold', fontSize: 16, color: 'white' }}>Save</Text>
          </TouchableOpacity>
        ),
        headerTitle: 'Add meal',
        headerTitleAlign: 'center',
      }} />

      <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16}}>
            <Text style={{ fontSize: 16, fontFamily: 'Poppins-Medium' }}>Time</Text>
            <TouchableOpacity onPress={showDatePicker}>
              <Text>{selectedDate.toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal: 16 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
            <Text style={{ fontSize: 16, fontFamily: 'Poppins-Medium' }}>Period</Text>
            <Picker
              selectedValue={selectedValue}
              style={styles.picker}
              itemStyle={styles.pickerItem}
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, {borderRightColor:'#808080', borderRightWidth:0.5}]} onPress={() => router.push('/searchFood')}>
            <Text style={styles.buttonText}>Search</Text>
            <Fontisto name="search" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Scan</Text>
            <MaterialCommunityIcons name='barcode-scan' size={32} />
          </TouchableOpacity>
        </View>
        {parsedMealData && (
          <View style={{flexDirection:'row', borderRadius:8, backgroundColor:'white',marginHorizontal:24, marginTop:16, padding:16, justifyContent:'space-between'}}>
            <Text style={styles.itemTitle}>{parsedMealData.label}</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={[styles.itemTitle, {paddingRight:8}]}>{parsedMealData.servings} Serving</Text>
              {/* this clicked and will be an option to delete */}
              <TouchableOpacity onPress={() => clearMealData()}>
                <Feather name='trash-2' color='red' size={16}/>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={styles.section}>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Calories</Text>
            <Text style={styles.itemTitle}>{calories} kcal</Text>
          </View>
          <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal: 16 }} />
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Carbs</Text>
            <Text style={styles.itemTitle}>{carbs} g</Text>
          </View>
          <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal: 16 }} />
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Protein</Text>
            <Text style={styles.itemTitle}>{protein} g</Text>
          </View>
          <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal: 16 }} />
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Fat</Text>
            <Text style={styles.itemTitle}>{fat} g</Text>
          </View>
          <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal: 16 }} />
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Notes{"\n\n\n"}</Text>
            <TextInput style={styles.itemTitle} placeholder='Add your notes'></TextInput>
          </View>
          
        </View>
        <Text>{"\n\n\n\n\n\n\n"}</Text>
      </ScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  )
}
const styles = StyleSheet.create({
  section: {
    backgroundColor: 'white',
    borderColor: '#808080',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginVertical: 24,
  },
  buttonContainer: {
    backgroundColor:'white',
    flexDirection:'row',
    marginHorizontal:24,
    justifyContent:'space-between',
    borderRadius:8,
  },
  button: {
    alignItems:'center',
    padding:16,
    width:'50%'
  },
  item: {
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:16,
    paddingVertical:8
  },
  itemTitle: {
    fontSize:14,
    fontFamily: "Poppins-Medium"
  },
  buttonText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    textAlign: 'center',
    color: 'black',
  },
  picker: {
    fontFamily: 'Poppins-Regular',
    width: '50%',
    marginLeft: 170,
    color: '#808080',
  },
  pickerItem: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    height: 36,
    marginHorizontal: 16
  },
});
export default preReg;
