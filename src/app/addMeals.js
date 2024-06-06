import { View, Text, StyleSheet, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
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

const preReg = () => {
  const { user } = useAuth();
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedValue, setSelectedValue] = useState("Breakfast");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { mealData } = useLocalSearchParams();
  const parsedMealData = mealData ? JSON.parse(mealData) : null;

  const [calories, setCalories] = useState(parsedMealData?.calories || 0);
  const [fat, setFat] = useState(parsedMealData?.fat || 0);
  const [carbs, setCarbs] = useState(parsedMealData?.carbs || 0);
  const [protein, setProtein] = useState(parsedMealData?.protein || 0);
  const [notes, setNotes] = useState('');

  const saveMeals = async () => {
    if (user) {
      const newMealLog = {
        meal: 'Lunch',
        carbs: 50,
        timestamp: selectedDate,
      };

      console.log('User ID: ', user.uid);
      console.log('Meal: ', newMealLog);
      // await addMealLog(user.uid, newMealLog);
      // Optionally refetch logs or update state directly
      // setMealLogs((prevLogs) => [...prevLogs, { id: newMealLog.id, ...newMealLog }]);
    }
  };

  const handleButtonPress = (buttonIndex) => {
    setSelectedButton(buttonIndex === selectedButton ? null : buttonIndex);
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
          <TouchableOpacity style={styles.button} onPress={() => saveMeals()}>
            <Text style={{ padding: 2, marginHorizontal: 8, fontFamily: 'Poppins-SemiBold', fontSize: 16, color: 'white' }}>Save</Text>
          </TouchableOpacity>
        ),
        headerTitle: 'Add meal',
        headerTitleAlign: 'center',
      }} />

      <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
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
        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
          <TouchableOpacity style={{ borderColor: '#808080', backgroundColor: "#ffffff", width: 160, height: 70, paddingVertical: 10, paddingHorizontal: 20, borderBottomLeftRadius: 8, borderRightWidth: 1, borderTopLeftRadius: 8, marginBottom: 10, elevation: 3, alignItems: 'center' }} onPress={() => router.push('/searchFood')}>
            <Text style={styles.buttonText}>Search</Text>
            <Fontisto name="search" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={{ borderColor: '#808080', backgroundColor: "#ffffff", width: 160, height: 70, paddingVertical: 10, paddingHorizontal: 20, borderBottomRightRadius: 8, borderLeftWidth: 1, borderTopRightRadius: 8, marginBottom: 10, elevation: 3, alignItems: 'center' }}>
            <Text style={styles.buttonText}>Scan</Text>
            <MaterialCommunityIcons name='barcode-scan' size={32} />
          </TouchableOpacity>
        </View>
        {parsedMealData && (
          <View style={{ marginTop: 10, backgroundColor: 'white', paddingVertical: 12, paddingHorizontal: 30, elevation: 3, borderColor: '#808080', width: 320, alignSelf: 'center', borderRadius: 8, flexDirection: 'row' }}>
            <Text>{parsedMealData.label}</Text>
            <Text style={{ marginLeft: 120, color: '#808080' }}>{parsedMealData.servings} Serving</Text>
          </View>
        )}
        <View style={{ marginTop: 20, backgroundColor: 'white', paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, justifyContent: 'space-between', borderColor: '#808080' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontFamily: 'Poppins-Medium', marginLeft: 20, marginVertical: 3 }}>Calories</Text>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, marginRight: 40, marginTop: 6 }}>{calories} kcal</Text>
          </View>
          <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#808080', width: 370, alignSelf: 'center' }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <Text style={{ fontSize: 16, fontFamily: 'Poppins-Medium', marginTop: 6, marginLeft: 20 }}>Carbs</Text>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, marginTop: 6, marginRight: 40 }}>{carbs} g</Text>
          </View>
          <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#808080', width: 370, alignSelf: 'center' }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <Text style={{ fontSize: 16, fontFamily: 'Poppins-Medium', marginTop: 6, marginLeft: 20 }}>Protein</Text>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, marginTop: 6, marginRight: 40 }}>{protein} g</Text>
          </View>
          <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#808080', width: 370, alignSelf: 'center' }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <Text style={{ fontSize: 16, fontFamily: 'Poppins-Medium', marginTop: 6, marginLeft: 20 }}>Fat</Text>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, marginTop: 6, marginRight: 40 }}>{fat} g</Text>
          </View>
          <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#808080', width: 370, alignSelf: 'center' }} />
          <Text style={{ fontSize: 16, fontFamily: 'Poppins-Medium', marginTop: 6, marginLeft: 20 }}>Notes{"\n\n\n"}</Text>
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
    marginVertical: 24
  },
  item: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#FAF5E1',
    borderColor: '#E58B68',
  },
  buttonText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    textAlign: 'center',
    color: 'black',
  },
  saveButtonContainer: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 3, // Adjust the padding to increase the width
    paddingLeft: 10,
    marginRight: 10,
    alignItems: 'center',
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
