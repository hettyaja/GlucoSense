import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert, LogBox } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useAuth } from '../service/AuthContext';
import CreateMedicineLogsController from '../Controller/CreateMedicineLogsController';
import Header from '../components/Header';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GetMedicineByNameController from '../Controller/GetMedicineByNameController';

const addMeds = () => {
  const { user } = useAuth();
  const { selectedMedicineNames } = useLocalSearchParams();
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [medicineAmount, setMedicineAmount] = useState({});
  const [notes, setNotes] = useState('');
  const [selectedValue, setSelectedValue] = useState("Before breakfast");


  LogBox.ignoreLogs([
    'Support for defaultProps will be removed from memo components in a future major release',
  ]);

  
  useEffect(() => {
    const fetchSelectedMedicines = async () => {
      if (user && selectedMedicineNames) {
        try {
          const names = JSON.parse(selectedMedicineNames);
          const medicines = await GetMedicineByNameController.getMedicineByName(user.uid, names);
          setSelectedMedicines(medicines);
        } catch (error) {
          console.error('Error fetching selected medicines:', error);
        }
      }
    };
    fetchSelectedMedicines();
  }, [user, selectedMedicineNames]);

  const handleInputChange = (name, value) => {
    setMedicineAmount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
  
  const saveMeds = async () => {
    if (!selectedMedicineNames) {
      Alert.alert(
        "No Medicine Selected",
        "Please select medicine before saving.",
        [{ text: "OK" }]
      );
      return;
    }

    const isAllMedicineFilled = selectedMedicines.every(
      (medicine) => medicineAmount[medicine.medicineName] && medicineAmount[medicine.medicineName].trim() !== ''
    );

    if (!isAllMedicineFilled) {
      Alert.alert(
        "Incomplete Information",
        "Please input quantity for all selected medicines.",
        [{ text: "OK" }]
      );
      return;
    }

    if (user) {
      const newMedicineLog = {
        time: selectedDate,
        medicine: medicineAmount,
        notes: notes,
        period: selectedValue
      };

      try {
        await CreateMedicineLogsController.createMedicineLogs(user.uid, newMedicineLog);
        console.log('Medicine log saved:', newMedicineLog);
        router.replace('Boundary/home');
      } catch (error) {
        console.error('Error saving medicine log:', error);
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

  return (
    <>
      <Header
        title='Create Medicine Diary'
        leftButton='Close'
        onLeftButtonPress={() => router.back('/home')}
        rightButton='Save'
        onRightButtonPress={saveMeds}
      />
      <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
            <Text style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}>Time</Text>
            <TouchableOpacity onPress={showDatePicker}>
              <Text>{selectedDate.toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</Text>
            </TouchableOpacity>
          </View>
          <View style={{borderBottomWidth: 0.5, borderColor:'#808080', marginHorizontal:16}}/>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:16}}>
              <Text style={{fontSize: 14, fontFamily: 'Poppins-Regular'}}>Period</Text>
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
          {selectedMedicines.map((medicine) => (
            <View key={medicine.id} style={styles.medicineContainer}>
              <Text style={styles.medicineName}>{medicine.medicineName}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  placeholder='000'
                  textAlign='right'
                  value={medicineAmount[medicine.medicineName] || ''}
                  onChangeText={(text) => handleInputChange(medicine.medicineName, text)}
                />
                <Text style={styles.unit}>{medicine.unit}</Text>
              </View>
            </View>
          ))}
          <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center' }} onPress={() => router.push('Boundary/SelectMedicineUI')}>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize:14 }}>Add medicine</Text>
            <Ionicons name='chevron-forward' size={24} color='grey' />
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
            <Text style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}>Notes</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                placeholder='Add your notes'
                textAlign='right'
                value={notes}
                onChangeText={(text) => setNotes(text)}
              />
            </View>
          </View>
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
    marginTop: 24
  },
  picker: {
    fontFamily: 'Poppins-Regular',
    width: '50%',
    color: '#808080',
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
  },
  picker: {
    width: '55%',
    height: 40,
    color: '#808080',
  },
});

export default addMeds;

