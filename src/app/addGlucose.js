import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Touchable, TextInput, ScrollView} from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack, router} from 'expo-router'
import { images } from '../constants/images';
import { Picker } from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign'

const preReg = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedValue, setSelectedValue] = useState("Breakfast");
  const [value, setValue] = useState('5.7');

  const handleChange = (text) => {
    // Allow only numbers and a single decimal point
    const newText = text.replace(/[^0-9.]/g, '');

    // Allow only one decimal point
    if (newText.split('.').length > 2) {
      return;
    }

    setValue(newText);
  };
  const handleButtonPress = (buttonIndex) => {
    setSelectedButton(buttonIndex === selectedButton ? null : buttonIndex);
  }
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
            <TouchableOpacity style={styles.button}>
                <Text style={{padding:2, marginHorizontal:8, fontFamily: 'Poppins-SemiBold', fontSize:16, color:'white'}}>Save</Text>
            </TouchableOpacity>
        ),
        headerTitle: 'Add glucose',
        headerTitleAlign: 'center',
    }}/>

    <ScrollView style={{flex:3}}>
        <View style = {{backgroundColor: '#f5f5f5', marginTop: 8, height: 700}}>
          <View style={styles.container1}>
            <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium', marginLeft: 20, marginVertical: 10}}> Time</Text>
            <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#808080', width: 370, alignSelf: 'center'}}/>
            <View style = {{flexDirection: 'row'}}>
              <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium', marginTop: 15, marginLeft: 20}}> Period</Text>
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
          <View style={{alignSelf: 'center', marginTop: 20 }}>
            <TouchableOpacity style={{borderColor: '#808080',backgroundColor: "#ffffff",width: 160,height: 70,paddingVertical: 10,paddingHorizontal: 20, borderRadius: 8, marginBottom: 10, elevation: 3}}>
              <Text style={styles.buttonText}>Camera</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20, backgroundColor: 'white', paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, justifyContent: 'space-between',
            borderColor: '#808080'}}>
            <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium', marginLeft: 20, marginVertical: 3}}>Glucose</Text>
              <TextInput style={{marginLeft: 200, flex: 1, textAlign: 'center', fontFamily: 'Poppins-Medium', fontSize: 16}}defaultValue={value} onChangeText={handleChange} keyboardType="numeric" maxLength={3} color= "#808080"></TextInput>
              <Text style={{fontFamily: 'Poppins-Regular', fontSize: 12,  marginRight: 40, marginTop: 6}}>mmol/L</Text>
            </View>
            <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#808080', width: 370, alignSelf: 'center'}}/>
              <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium', marginTop: 6, marginLeft: 20}}>Notes{"\n\n\n"}</Text>
            </View>
          <Text>{"\n\n\n\n\n\n\n"}</Text>
        </View>
    </ScrollView>
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
});
export default preReg