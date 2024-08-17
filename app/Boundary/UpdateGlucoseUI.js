// UpdateGlucoseUI.js
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import DateTimePickerModal from "react-native-modal-datetime-picker";
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
  const [notes, setNotes] = useState(parsedGlucoseData.notes);

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
        glucose: glucoseValue,
        notes: notes
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
      await DeleteGlucoseLogsController.deleteGlucoseLogs(user.uid, parsedGlucoseData.id);
      router.replace('Boundary/home');
    } catch (error) {
      console.error('Error deleting log:', error);
    }
  };

  return (
    <>
      <Header
        title="Edit Glucose Log"
        leftButton="Close"
        onLeftButtonPress={() => router.back('/home')}
        rightButton="Save"
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

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Glucose</Text>
            <View style={styles.glucoseInputContainer}>
              <TextInput
                style={styles.glucoseInput}
                value={glucoseValue}
                placeholder="000"
                onChangeText={handleChange}
                keyboardType="numeric"
                maxLength={5}
              />
              <Text style={styles.unit}>mg/dL</Text>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Add your notes"
              value={notes}
              onChangeText={(text) => setNotes(text)}
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
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'black',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  value: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#808080',
    marginHorizontal: 16,
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
  glucoseInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  glucoseInput: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    width: 50,
    color: '#808080',
  },
  unit: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  notesInput: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
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

export default editGlucose;
