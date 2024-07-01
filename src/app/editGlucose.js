import { View, Text, StyleSheet, Image, Button, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { images } from '../constants/images';
import { Picker } from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Feather from 'react-native-vector-icons/Feather';
import { useAuth } from './Controller/authController';
import { updateGlucoseLog, deleteLog } from './service/diaryService'; // Update service

const editGlucose = () => {
  const { user } = useAuth();
  const { log } = useLocalSearchParams();
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedValue, setSelectedValue] = useState("Breakfast");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [glucoseValue, setGlucoseValue] = useState('');

  useEffect(() => {
    if (log) {
      const parsedLog = JSON.parse(log);
      setSelectedDate(new Date(parsedLog.timestamp.seconds * 1000));
      setSelectedValue(parsedLog.period);
      setGlucoseValue(parsedLog.glucoseValue.toString());
    }
  }, [log]);

  const handleChange = (text) => {
    // Allow only numbers and a single decimal point
    const newText = text.replace(/[^0-9.]/g, '');

    // Allow only one decimal point
    if (newText.split('.').length > 2) {
      return;
    }

    setGlucoseValue(newText);
  };

  const saveGlucose = async () => {
    if (user) {
      const updatedGlucoseLog = {
        id: JSON.parse(log).id,
        timestamp: selectedDate,
        period: selectedValue,
        glucoseValue: glucoseValue
      }

      try {
        await updateGlucoseLog(user.uid, updatedGlucoseLog);
        console.log('Glucose log updated:', updatedGlucoseLog);
        router.replace('home');
      } catch (error) {
        console.error('Error updating glucose log:', error);
      }
    }
  }

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

  const confirmDelete = () => {
    Alert.alert(
      "Delete Log",
      "Are you sure you want to delete this log?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => handleDelete() }
      ]
    );
  };

  const handleDelete = async () => {
    try {
      await deleteLog(user.uid, 'glucoseLogs', JSON.parse(log).id);
      router.replace('home')
    } catch (error) {
      console.error('Error deleting log:', error);
    }
  };

  return (
    <>
      <Stack.Screen options={{
        title: 'Edit glucose',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold' },
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back('/home')}>
            <AntDesign name='close' size={24} color='white' />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => saveGlucose()}>
            <Text style={{ padding: 2, marginHorizontal: 8, fontFamily: 'Poppins-SemiBold', fontSize: 16, color: 'white' }}>Save</Text>
          </TouchableOpacity>
        ),
        headerTitle: 'Edit glucose',
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
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity style={styles.button}>
            <Feather name="camera" size={24} />
            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14 }}>Camera</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
            <Text style={{ fontSize: 16, fontFamily: 'Poppins-Medium' }}>Glucose</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput style={{ fontFamily: 'Poppins-Medium', fontSize: 16, marginRight: 16 }} value={glucoseValue} placeholder='000' onChangeText={handleChange} keyboardType="numeric" maxLength={5} color="#808080"></TextInput>
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12 }}>mmol/L</Text>
            </View>
          </View>
          <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal: 16 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
            <Text style={{ fontSize: 16, fontFamily: 'Poppins-Medium' }}>Notes</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput style={{ fontFamily: 'Poppins-Medium', fontSize: 16 }} placeholder={'Add your notes'}></TextInput>
            </View>
          </View>
        </View>

        <View style={styles.section}>
        <TouchableOpacity style={{padding: 16, alignItems: 'center' }} onPress={() => confirmDelete()}>
            <Text style={{ fontFamily: 'Poppins-Medium', fontSize:16, color:'red'}}>Delete</Text>
          </TouchableOpacity>
        </View>
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
  container: {
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    textAlign: 'center',
    color: 'black',
  },
  section: {
    backgroundColor: 'white',
    borderColor: '#808080',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginVertical: 24
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
export default editGlucose;
