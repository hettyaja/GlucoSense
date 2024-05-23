import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Touchable, ScrollView} from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router} from 'expo-router'
import { images } from '../constants/images';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker'


const preReg = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedValue, setSelectedValue] = useState("Breakfast");
  const [dateTime, setDateTime] = useState(new Date())

  const handleButtonPress = (buttonIndex) => {
    setSelectedButton(buttonIndex === selectedButton ? null : buttonIndex);
  }
  return (
    <ScrollView style={{flex:1, marginTop:16, backgroundColor:'#f5f5f5'}}>
          <View style={styles.section}>
            <View style={styles.item}>
              <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium'}}>Time</Text>
              <TouchableOpacity>
                <DateTimePicker
                  value={dateTime}
                  mode="datetime"
                  display='default'
                />
            </TouchableOpacity>
            </View>
            <View style={{borderColor:'#808080', borderWidth:0.5, marginHorizontal:8}}></View>
            <View style={styles.item}>
            <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium'}}>Period</Text>
                <Picker
                selectedValue={selectedValue}
                style={styles.picker}
                itemStyle={styles.pickerItem}
                mode="dropdown"
                onValueChange={(itemValue) => setSelectedValue(itemValue)}
                >
                  <Picker.Item label="Breakfast" value="Breakfast" />
                  <Picker.Item label="Lunch" value="Lunch" />
                  <Picker.Item label="Dinner" value="Dinner" />
                </Picker>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
            <TouchableOpacity style={{borderColor: '#808080',backgroundColor: "#ffffff",width: 160,height: 70,paddingVertical: 10,paddingHorizontal: 20,borderBottomLeftRadius: 8, borderRightWidth: 1,
            borderTopLeftRadius: 8, marginBottom: 10, elevation: 3}}>
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderColor: '#808080', backgroundColor: "#ffffff",width: 160,height: 70,paddingVertical: 10,paddingHorizontal: 20,borderBottomRightRadius: 8, borderLeftWidth: 1,
            borderTopRightRadius: 8, marginBottom: 10, elevation: 3}}>
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10,backgroundColor: 'white',paddingVertical: 12,paddingHorizontal: 30,
            elevation: 3,borderColor: '#808080', width: 320, alignSelf: 'center', borderRadius: 8, flexDirection: 'row'}}>
              <Text>Fried Rice</Text>
              <Text style={{marginLeft: 120, color: '#808080'}}>1 Serving</Text>
          </View>
          <View style={{ marginTop: 20, backgroundColor: 'white', paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, justifyContent: 'space-between',
            borderColor: '#808080'}}>
            <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium', marginLeft: 20, marginVertical: 3}}>Calories</Text>
              <Text style={{fontFamily: 'Poppins-Regular', fontSize: 12,  marginRight: 40, marginTop: 6}}>Cal</Text>
            </View>
            <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#808080', width: 370, alignSelf: 'center'}}/>
            <View style = {{flexDirection: 'row', justifyContent: 'space-between',}}>
              <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium', marginTop: 6, marginLeft: 20}}>Carbs</Text>
              <Text style={{fontFamily: 'Poppins-Regular', fontSize: 12, marginTop: 6, marginRight: 40}}>g</Text>
            </View>
            <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#808080', width: 370, alignSelf: 'center'}}/>
            <View style = {{flexDirection: 'row', justifyContent: 'space-between',}}>
              <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium', marginTop: 6, marginLeft: 20}}>Protein</Text>
              <Text style={{fontFamily: 'Poppins-Regular', fontSize: 12, marginTop: 6,  marginRight: 40}}>g</Text>
            </View>
            <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#808080', width: 370, alignSelf: 'center'}}/>
            <View style = {{flexDirection: 'row', justifyContent: 'space-between',}}>
              <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium', marginTop: 6, marginLeft: 20}}>Fat</Text>
              <Text style={{fontFamily: 'Poppins-Regular', fontSize: 12, marginTop: 6,  marginRight: 40}}>g</Text>
            </View>
            <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#808080', width: 370, alignSelf: 'center'}}/>
              <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium', marginTop: 6, marginLeft: 20}}>Notes{"\n\n\n"}</Text>
            </View>
          <Text>{"\n\n\n\n\n\n\n"}</Text>
    </ScrollView>
    
  )
}
const styles = StyleSheet.create({
  section: {
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#808080'
  },
  item: {
    padding:8,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
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
  picker: {
    fontFamily: 'Poppins-Regular',
    width:'40%',
    color: '#808080',
  },
  pickerItem: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    height:36
  },
});
export default preReg