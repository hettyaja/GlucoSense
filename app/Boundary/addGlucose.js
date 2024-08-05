import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Alert, TextInput, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Feather from 'react-native-vector-icons/Feather';
import { useAuth } from '../service/AuthContext';
import { addGlucoseLog } from '../service/diaryService';
import CreateGlucoseLogsController from '../Controller/CreateGlucoseLogsController';
import Header from '../components/Header';

const preReg = () => {
  const { user } = useAuth();
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedValue, setSelectedValue] = useState("Breakfast");
  const [glucoseValue, setGlucoseValue] = useState('');

  const getSingaporeTime = () => {
    const now = new Date();
    const options = { timeZone: 'Asia/Singapore', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const parts = formatter.formatToParts(now);

    const singaporeTime = new Date(`${parts.find(p => p.type === 'year').value}-${parts.find(p => p.type === 'month').value}-${parts.find(p => p.type === 'day').value}T${parts.find(p => p.type === 'hour').value}:${parts.find(p => p.type === 'minute').value}:${parts.find(p => p.type === 'second').value}`);

    if (isNaN(singaporeTime.getTime())) {
      console.error("Invalid Date generated for Singapore time");
    }

    return singaporeTime;
  };

  const [selectedDate, setSelectedDate] = useState(getSingaporeTime());

  const handleChange = (text) => {
    const newText = text.replace(/[^0-9.]/g, '');

    if (newText.split('.').length > 2) {
      return;
    }

    setGlucoseValue(newText);
  };

  const saveGlucose = async () => {
    if (!glucoseValue) {
      Alert.alert(
        "No Glucose Reading",
        "Please input glucose reading before saving.",
        [{ text: "OK" }]
      );
      return;
    }

    if (user) {
      const newGlucoseLog = {
        time: selectedDate,
        period: selectedValue,
        glucose: glucoseValue
      }

      try {
        await CreateGlucoseLogsController.createGlucoseLogs(user.uid, newGlucoseLog);
        console.log('Glucose log saved:', newGlucoseLog);
        router.replace('Boundary/home');
      } catch (error) {
        console.error('Error saving glucose log:', error);
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
    console.log("A date has been picked: ", date);
    hideDatePicker();
  };

  return (
    <>
      <Header
        title = 'Glucose'
        leftButton= 'Close'
        onLeftButtonPress={() => router.back('/home')}
        rightButton= 'Save'
        onRightButtonPress={() => saveGlucose()}
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
          <View style={styles.row}>
            <Text style={styles.label}>Period</Text>
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
        <View style={styles.centered}>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/glucoseScanner')}>
            <Feather name="camera" size={24} />
            <Text style={styles.buttonText}>Camera</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Glucose</Text>
            <View style={styles.glucoseInputContainer}>
              <TextInput
                style={styles.glucoseInput}
                defaultValue={glucoseValue}
                placeholder='000'
                onChangeText={handleChange}
                keyboardType="numeric"
                maxLength={3}
                color="#808080"
              />
              <Text style={styles.unit}>mg/dL</Text>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.label}>Notes</Text>
            <TextInput style={styles.notesInput} placeholder='Add your notes' />
          </View>
        </View>
      </ScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        display='inline'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: 'white',
    marginVertical: 24,
    padding: 16,
    borderTopWidth:0.5,
    borderBottomWidth:0.5,
    borderColor:'#808080'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#333',
  },
  value: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#808080',
  },
  separator: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
    marginVertical: 8,
  },
  picker: {
    width: '55%',
    color: '#808080',
  },
  pickerItem: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  centered: {
    alignItems: 'center',
    marginVertical: 16,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: 'black',
    marginLeft: 8,
  },
  glucoseInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  glucoseInput: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginRight: 8,
    width: 50,
  },
  unit: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#808080',
  },
  notesInput: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    flex: 1,
    textAlign: 'right',
  },
  saveButtonText: {
    padding: 2,
    marginHorizontal: 8,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: 'white',
  },
});

export default preReg;
