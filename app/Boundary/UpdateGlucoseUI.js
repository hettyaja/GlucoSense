import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Feather from 'react-native-vector-icons/Feather';
import { useAuth } from '../service/AuthContext';
import UpdateGlucoseLogsController from '../Controller/UpdateGlucoseLogsController';
import { Picker } from '@react-native-picker/picker';
import DeleteGlucoseLogsController from '../Controller/DeleteGlucoseLogsController';
import Header from '../components/Header';

const editGlucose = () => {
  const { user } = useAuth();
  const { glucoseData } = useLocalSearchParams();
  const [parsedGlucoseData, setParsedGlucoseData] = useState(glucoseData ? JSON.parse(glucoseData) : null);
  const [selectedDate, setSelectedDate] = useState(new Date(parsedGlucoseData.time.seconds * 1000));
  const [selectedValue, setSelectedValue] = useState(parsedGlucoseData.period);
  const [glucoseValue, setGlucoseValue] = useState(parsedGlucoseData.glucose.toString());

  const handleChange = (text) => {
    const newText = text.replace(/[^0-9.]/g, '');
    if (newText.split('.').length > 2) {
      return;
    }

    setGlucoseValue(newText);
  };

  const saveGlucose = async () => {
    if (user) {
      if (!glucoseValue || parseFloat(glucoseValue) === 0) {
        Alert.alert('Invalid Glucose Value', 'Please enter a valid glucose value.');
        return;
      }

      const updatedGlucoseLog = {
        id: parsedGlucoseData.id,
        time: selectedDate,
        period: selectedValue,
        glucose: glucoseValue
      };

      try {
        await UpdateGlucoseLogsController.updateGlucoseLogs(user.uid, updatedGlucoseLog);
        console.log('Glucose log updated:', updatedGlucoseLog);
        router.replace('Boundary/home');
      } catch (error) {
        console.error('Error updating glucose log:', error);
      }
    }
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
      await DeleteGlucoseLogsController.deleteGlucoseLogs(user.uid, parsedGlucoseData.id);
      router.replace('Boundary/home');
    } catch (error) {
      console.error('Error deleting log:', error);
    }
  };

  return (
    <>
      <Header
        title = 'Glucose'
        leftButton='Close'
        onLeftButtonPress={()=> router.back('Boundary/home')}
        rightButton='Save'
        onRightButtonPress={()=> saveGlucose()}
      />

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
              <TextInput
                style={{ fontFamily: 'Poppins-Medium', fontSize: 16, marginRight: 16 }}
                value={glucoseValue}
                placeholder='000'
                onChangeText={handleChange}
                keyboardType="numeric"
                maxLength={5}
                color="#808080"
              />
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12 }}>mg/dL</Text>
            </View>
          </View>
          <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal: 16 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
            <Text style={{ fontSize: 16, fontFamily: 'Poppins-Medium' }}>Notes</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput style={{ fontFamily: 'Poppins-Medium', fontSize: 16 }} placeholder={'Add your notes'} />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={{ padding: 16, alignItems: 'center' }} onPress={() => confirmDelete()}>
            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 16, color: 'red' }}>Delete</Text>
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
  );
};

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
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    marginVertical: 24,
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
    marginHorizontal: 16,
  },
});

export default editGlucose;
