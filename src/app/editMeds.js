import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useAuth } from './Controller/authController';
import { updateMedicineLog, deleteLog } from './service/diaryService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const editMeds = () => {
  const { user } = useAuth();
  const { medicineData } = useLocalSearchParams();
  const [parsedMedicineData, setParsedMedicineData] = useState(medicineData ? JSON.parse(medicineData) : null);

  const [selectedDate, setSelectedDate] = useState(new Date(parsedMedicineData.timestamp.seconds * 1000));
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
        timestamp: selectedDate,
        medicine: medicineAmount,
        notes: notes
      };

      try {
        await updateMedicineLog(user.uid, updatedMedicineLog);
        console.log('Medicine log updated:', updatedMedicineLog);
        router.replace('/home');
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
      await deleteLog(user.uid, 'medicineLogs', parsedMedicineData.id);
      router.replace('home')
    } catch (error) {
      console.error('Error deleting log:', error);
    }
  };

  return (
    <>
      <Stack.Screen options={{
        title: 'Edit meds',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold' },
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back('/home')}>
            <AntDesign name='close' size={24} color='white' />
          </TouchableOpacity>
        ), headerRight: () => (
          <TouchableOpacity onPress={() => saveMeds()}>
            <Text style={{ padding: 2, marginHorizontal: 8, fontFamily: 'Poppins-SemiBold', fontSize: 16, color: 'white' }}>Save</Text>
          </TouchableOpacity>
        ),
        headerTitle: 'Edit meds',
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
