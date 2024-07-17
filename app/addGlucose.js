import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Alert, TextInput, ScrollView, Platform, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack, router} from 'expo-router'
import { images } from './constants/images';
import { Picker } from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Feather from 'react-native-vector-icons/Feather'
import { useAuth } from './service/AuthContext';
import { addGlucoseLog } from './service/diaryService';
import CreateGlucoseLogsController from './Controller/CreateGlucoseLogsController';


const preReg = () => {
  const { user } = useAuth()
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
    // Allow only numbers and a single decimal point
    const newText = text.replace(/[^0-9.]/g, '');

    // Allow only one decimal point
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
        await CreateGlucoseLogsController.createGlucoseLogs(user.uid, newGlucoseLog)
        console.log('Meal log saved:', newGlucoseLog);
        router.replace('Boundary/home')
      } catch (error) {
        console.error('Error saving meal log:', error);
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
        title: 'Add glucose',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold'},
        headerLeft: () => (
            <TouchableOpacity onPress={() => router.back('/home')}>
                <AntDesign name='close' size={24} color='white'/>
            </TouchableOpacity>
        ),headerRight: () => (
            <TouchableOpacity onPress={() => saveGlucose()}>
                <Text style={{padding:2, marginHorizontal:8, fontFamily: 'Poppins-SemiBold', fontSize:16, color:'white'}}>Save</Text>
            </TouchableOpacity>
        ),
        headerTitle: 'Add glucose',
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
            <View style={{borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal:16}}/>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding:16}}>
              <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium'}}>Period</Text>
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
          <View style={{alignItems:'center'}}>
            <TouchableOpacity style={styles.button}  onPress={() => router.push('/glucoseScanner')}>
              <Feather name="camera" size={24}/>
              <Text style={{fontFamily:'Poppins-Medium', fontSize:14}}>Camera</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.section}>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding:16}}>
              <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium'}}>Glucose</Text>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <TextInput style={{fontFamily: 'Poppins-Medium', fontSize: 16, marginRight:16}}defaultValue={glucoseValue} placeholder='000' onChangeText={handleChange} keyboardType="numeric" maxLength={3} color= "#808080"></TextInput>
                <Text style={{fontFamily: 'Poppins-Regular', fontSize: 12}}>mmol/L</Text>
              </View>
            </View>
            <View style={{borderBottomWidth: StyleSheet.hairlineWidth, marginHorizontal:16}}/>
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
      display='inline'
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
    marginVertical:24
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
