// UpdateMedicineUI.js
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useAuth } from '../service/AuthContext';
import UpdateMedicineLogsController from '../Controller/UpdateMedicineLogsController';
import { Picker } from '@react-native-picker/picker';
import DeleteMedicineLogsController from '../Controller/DeleteMedicineLogsController';
import Header from '../components/Header';

const editMeds = () => {
  const { user } = useAuth();
  const { medicineData } = useLocalSearchParams();
  const [parsedMedicineData, setParsedMedicineData] = useState(medicineData ? JSON.parse(medicineData) : null);
  const [selectedValue, setSelectedValue] = useState(parsedMedicineData.period);
  const [selectedDate, setSelectedDate] = useState(new Date(parsedMedicineData.time.seconds * 1000));
  const [medicineAmount, setMedicineAmount] = useState(parsedMedicineData.medicine || {});
  const [notes, setNotes] = useState(parsedMedicineData.notes);

  const handleInputChange = (medicineName, value) => {
    setMedicineAmount((prev) => ({
      ...prev,
      [medicineName]: value,
    }));
  };

  const saveMeds = async () => {
    if (user) {
      const updatedMedicineLog = {
        id: parsedMedicineData.id,
        time: selectedDate,
        medicine: medicineAmount,
        notes: notes,
        period: selectedValue,
      };

      try {
        await UpdateMedicineLogsController.updateMedicineLogs(user.uid, updatedMedicineLog);
        console.log('Medicine log updated:', updatedMedicineLog);
        router.replace('Boundary/home');
      } catch (error) {
        console.error('Error updating medicine log:', error);
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
      await DeleteMedicineLogsController.deleteMedicineLogs(user.uid, parsedMedicineData.id);
      router.replace('Boundary/home');
    } catch (error) {
      console.error('Error deleting log:', error);
    }
  };

  return (
    <>
      <Header
        title="Edit Medicine Log"
        leftButton="Close"
        onLeftButtonPress={() => router.back('/home')}
        rightButton="Save"
        onRightButtonPress={saveMeds}
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
          {Object.keys(medicineAmount).map((medicineName) => (
            <View key={medicineName} style={styles.medicineContainer}>
              <Text style={styles.label}>{medicineName}</Text>
              <View style={styles.medicineInputContainer}>
                <TextInput
                  style={styles.medicineInput}
                  placeholder="000"
                  textAlign="right"
                  value={medicineAmount[medicineName]}
                  onChangeText={(text) => handleInputChange(medicineName, text)}
                />
                <Text style={styles.unit}>unit</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
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
  medicineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#808080',
  },
  medicineInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  medicineInput: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    width: 40,
    color: '#808080',
  },
  unit: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    paddingLeft: 8,
    paddingRight:16
  },
  notesInput: {
    fontFamily: 'Poppins-Regular',
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

export default editMeds;
