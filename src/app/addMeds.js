import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Touchable, TextInput} from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router, Stack} from 'expo-router'
import { images } from '../constants/images';
import { Picker } from '@react-native-picker/picker';
import ImageButton from '../components/ImageButton';
import AntDesign from 'react-native-vector-icons/AntDesign'
import DateTimePickerModal from "react-native-modal-datetime-picker";

const preReg = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedValue, setSelectedValue] = useState("Breakfast");
  const [value, setValue] = useState('1');
  const [selectedDate, setSelectedDate] = useState(new Date())

  
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

    const handleChange = (text) => {
      // Allow only numbers and limit length to 2
      const newText = text.replace(/[^0-9]/g, '');
      if (newText.length <= 2) {
        setValue(newText);
      }
    };
  const handleButtonPress = (buttonIndex) => {
    setSelectedButton(buttonIndex === selectedButton ? null : buttonIndex);
  }
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
                <TouchableOpacity style={styles.button} onPress={() => router.back()}>
                    <Text style={{padding:2, marginHorizontal:8, fontFamily: 'Poppins-SemiBold', fontSize:16, color:'white'}}>Save</Text>
                </TouchableOpacity>
            ),
            headerTitle: 'Add meds',
            headerTitleAlign: 'center',
        }}/>

        <View style={{flex:1}}>
            <View style = {{backgroundColor: '#f5f5f5', marginTop: 8, height: 700}}>
            <View style={styles.container1}>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding:16}}>
              <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium'}}>Time</Text>
                <TouchableOpacity onPress={showDatePicker}>
                <Text>{selectedDate.toLocaleString('en-GB', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</Text>
              </TouchableOpacity>
            </View>
            </View>
            <View style={{backgroundColor: '#ffffff', width: 350, borderRadius: 8, elevation: 3, alignSelf: 'center',  marginTop: 20}}>
                <View style={{flexDirection: 'row', marginVertical: 10, justifyContent:'space-between'}}>
                <Text style={styles.text}>ABC Pills</Text>
                <TextInput style={{marginLeft: 160, fontFamily: 'Poppins-Medium', fontSize: 14}}defaultValue={value} onChangeText={handleChange} keyboardType="numeric" maxLength={3} color= "#808080"></TextInput>
                <Text style={styles.textUnits}>Units</Text>            
                </View>
                <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#808080', width: 350, alignSelf: 'center'}}/>
                <Link href="login/createMeds" style={{fontFamily: 'Poppins-Medium', fontSize: 14, color: '#E58B68', alignSelf: 'center', marginVertical: 10}}>Create Medicine</Link>
            </View>  
                <View style={{ marginTop: 20, backgroundColor: 'white', paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, justifyContent: 'space-between',
                borderColor: '#808080'}}>
                <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium', marginTop: 6, marginLeft: 20}}>Notes{"\n\n\n"}</Text>
                </View>
            <Text>{"\n\n\n\n\n\n\n"}</Text>
            </View>
        </View>
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
  selectedButton: {
    backgroundColor: '#FAF5E1',
    borderColor: '#E58B68', 
  },
  buttonText: {
    fontSize:12,
    fontFamily:"Poppins-Regular",
    textAlign: 'center',
    color: 'black',
  },
  saveButtonContainer: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 3, // Adjust the padding to increase the width
    paddingLeft: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  container1: {
    marginTop: 25,
    backgroundColor: 'white',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#808080'
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
  },
  text: {
    marginLeft: 30,
    fontFamily: 'Poppins-Medium',
    fontSize: 14
  },
  textUnits:{
    color: '#808080', 
    textAlign: 'center', 
    fontFamily: 'Poppins-Medium', 
    fontSize: 14,
    marginRight: 30,
  }
});
export default preReg
