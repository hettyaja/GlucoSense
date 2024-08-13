import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useAuth } from '../service/AuthContext';
import UpdateMedicineLogsController from '../Controller/UpdateMedicineLogsController';
import DeleteMedicineLogsController from '../Controller/DeleteMedicineLogsController';
import { Picker } from '@react-native-picker/picker';
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
      await DeleteMedicineLogsController.deleteMedicineLogs(user.uid, parsedMedicineData.id);
      router.replace('Boundary/home')
    } catch (error) {
      console.error('Error deleting log:', error);
    }
  };

  return (
    <>
      <Header
        title = 'Edit'
        leftButton='Close'
        onLeftButtonPress={()=> router.back('Boundary/home')}
        rightButton='Save'
        onRightButtonPress={()=> saveMeds}
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
        <View style={styles.section}>
          {Object.keys(medicineAmount).map((medicineName) => (
            <View key={medicineName} style={styles.medicineContainer}>
              <Text style={styles.medicineName}>{medicineName}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  placeholder='000'
                  textAlign='right'
                  value={medicineAmount[medicineName]}
                  onChangeText={(text) => handleInputChange(medicineName, text)}
                />
                <Text style={styles.unit}>unit</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
            <Text style={{ fontSize: 16, fontFamily: 'Poppins-Medium' }}>Notes</Text>
            <TextInput
              style={{ fontFamily: 'Poppins-Medium', fontSize: 16 }}
              placeholder='Add your notes'
              value={notes}
              onChangeText={(text) => setNotes(text)}
            />
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
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'white',
    borderColor: '#808080',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginVertical: 24,
  },
  picker: {
    fontFamily: 'Poppins-Regular',
    width: '55%',
    marginLeft: 170,
    color: '#808080',
  },
  pickerItem: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    height: 36,
    marginHorizontal: 16
  },
  medicineContainer: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    borderColor: '#808080',
    borderBottomWidth: 0.5,
  },
  medicineName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14
  },
  unit: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    paddingLeft: 8
  }
});

export default editMeds;
