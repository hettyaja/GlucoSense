import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Touchable, TextInput, ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack, router, useLocalSearchParams} from 'expo-router'
import { images } from '../constants/images';
import { Picker } from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Feather from 'react-native-vector-icons/Feather'
import { useAuth } from './context/authContext';
import { addMedicineLog, getMedicineByIds } from './service/diaryService';
import Ionicons from 'react-native-vector-icons/Ionicons'

const preReg = () => {
  const { user } = useAuth()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const { selectedMedicineIds } = useLocalSearchParams();
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [ medicineAmount, setMedicineAmount] = useState({})
  const [ notes, setNotes] = useState('')

  useEffect(() => {
    const fetchSelectedMedicines = async () => {
      if (user && selectedMedicineIds) {
        try {
          const ids = JSON.parse(selectedMedicineIds);
          const medicines = await getMedicineByIds(user.uid, ids);
          setSelectedMedicines(medicines);
        } catch (error) {
          console.error('Error fetching selected medicines:', error);
        }
      }
    };
    fetchSelectedMedicines();
  }, [user, selectedMedicineIds]);

  const handleInputChange = (id, value) => {
    setMedicineAmount((prev) => ({
      ...prev,
      [id]: value,
    }));
  };


  const saveMeds = async () => {
    if (user) {
      const newMedicineLog = {
        timestamp: selectedDate,
        medicine: medicineAmount,
        notes: notes
      }

      try {
        await addMedicineLog(user.uid, newMedicineLog)
        console.log('Medicine log saved:', newMedicineLog);
        router.replace('home')
      } catch (error) {
        console.error('Error saving medicine log:', error);
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
    setSelectedDate(date)
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };
  return (
    <>
      <Stack.Screen options={{
        title: 'Add meds',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold'},
        headerLeft: () => (
            <TouchableOpacity onPress={() => router.back('/home')}>
                <AntDesign name='close' size={24} color='white'/>
            </TouchableOpacity>
        ),headerRight: () => (
            <TouchableOpacity onPress={() => saveMeds()}>
                <Text style={{padding:2, marginHorizontal:8, fontFamily: 'Poppins-SemiBold', fontSize:16, color:'white'}}>Save</Text>
            </TouchableOpacity>
        ),
        headerTitle: 'Add meds',
        headerTitleAlign: 'center',
      }}/>

    <ScrollView style={{flex:1, backgroundColor:'#f5f5f5'}}>
          <View style={styles.section}>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding:16}}>
              <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium'}}>Time</Text>
                <TouchableOpacity onPress={showDatePicker}>
                <Text>{selectedDate.toLocaleString('en-GB', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
              {selectedMedicines.map((medicine) => (
                <View key={medicine.id} style={styles.medicineContainer}>
                  <Text style={styles.medicineName}>{medicine.medicineName}</Text>
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    <TextInput
                      placeholder='000'
                      textAlign='right'
                      value={medicineAmount[medicine.id] || ''}
                      onChangeText={(text) => handleInputChange(medicine.id, text)}
                    />
                    <Text style={styles.unit}>{medicine.unit}</Text>
                  </View>
                </View>
              ))}
              <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between', padding:16, alignItems:'center'}} onPress={() => router.push('/selectMedicine')}>
                  <Text style={{fontFamily:'Poppins-Medium'}}>Add medicine</Text>
                <Ionicons name='chevron-forward' size={24} color='black' />
              </TouchableOpacity>
          </View>
          <View style={styles.section}>
            <View  style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding:16}}>
              <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium'}}>Notes</Text>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <TextInput placeholder={'Add your notes'} textAlign="right"></TextInput>
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
  )
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor:'white',
    borderRadius:16,
    width:'25%',
    alignItems:'center',
    justifyContent:'center',
    padding:16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset:{width:0, height:2},
    elevation: 5,
  },
  buttonText: {
    fontSize:12,
    fontFamily:"Poppins-Regular",
    textAlign: 'center',
    color: 'black',
  },
  section: {
    backgroundColor: 'white',
    borderColor:'#808080',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop:24
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
    height:36,
    marginHorizontal:16
  },
  medicineContainer: {
    flexDirection:'row',
    padding:16,
    justifyContent:'space-between',
    borderColor:'#808080',
    borderBottomWidth:0.5,
  },
  medicineName: {
    fontFamily:'Poppins-Regular',
    fontSize:14
  },
  unit: {
    fontSize:14,
    fontFamily:'Poppins-Regular',
    paddingLeft:8
  }
});
export default preReg
