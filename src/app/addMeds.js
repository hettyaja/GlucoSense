import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Touchable, TextInput, ScrollView} from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack, router} from 'expo-router'
import { images } from '../constants/images';
import { Picker } from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Feather from 'react-native-vector-icons/Feather'
import { useAuth } from './context/authContext';
import { addGlucoseLog } from './service/diaryService';
import Ionicons from 'react-native-vector-icons/Ionicons'



const preReg = () => {
  const { user } = useAuth()
  const [selectedDate, setSelectedDate] = useState(new Date())


  const saveMeds = async () => {
    if (user) {

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
              <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between', padding:16, alignItems:'center'}} onPress={() => router.push('/selectMedicine')}>
                  <Text style={{fontFamily:'Poppins-Medium'}}>Add medicine</Text>
                <Ionicons name='chevron-forward' size={24} color='black' />
              </TouchableOpacity>
          </View>
          <View style={styles.section}>
            <View  style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding:16}}>
              <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium'}}>Notes</Text>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <TextInput style={{fontFamily: 'Poppins-Medium', fontSize: 16}} placeholder={'Add your notes'}></TextInput>
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
});
export default preReg
