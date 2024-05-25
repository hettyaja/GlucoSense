import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Touchable, TextInput, ScrollView,} from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router} from 'expo-router'
import { images } from '../../constants/images';
import { Picker } from '@react-native-picker/picker';

const preReg = () => {

  const handleButtonPress = (buttonIndex) => {
    setSelectedButton(buttonIndex === selectedButton ? null : buttonIndex);
  }
  return (
      <View style={{flex:3, backgroundColor:'#E58B68', paddingTop:24}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30 }}>
          <Text style={{ color: 'white', fontFamily: 'Poppins-Bold', fontSize: 16, flex: 1, textAlign: 'center'}}>Order Confirmation</Text>
        </View>
          <View style = {{backgroundColor: '#f5f5f5', marginTop: 8, height: 720}}>
            <View style={styles.container1}>
              <Text style={{fontFamily: 'Poppins-Medium', fontSize: 14, marginLeft: 70, marginTop: 12}}>Address</Text>
              <Text style={{fontFamily: 'Poppins-Medium', fontSize: 14, marginLeft: 70}}>Add address</Text>
              <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#808080', width: 370, alignSelf: 'center', marginTop: 20}}/>
              <Text>{'\n\n\n\n'}</Text>
            </View>
            <View style={styles.container3}>
              <Text style={[styles.commonText, { marginLeft: 70 }]}>YummyStore</Text>
              <View style = {{flexDirection: 'row'}}>
                <View style = {styles.container2}/>
                <View style = {{marginTop: 10}}>
                    <Text style={styles.commonText}>Chicken rice</Text>
                    <Text style={styles.commonText}>$4.50</Text>
                </View>
              </View>
            </View>
            <View style={styles.container3}>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.commonText, { marginLeft: 20 }]}>Notes:</Text>
              </View>
              <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#808080', width: 370, alignSelf: 'center', marginVertical: 8}}/>
              <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[styles.commonText, { marginLeft: 20 }]}>Order Total:</Text>
                <Text style={[styles.commonText, { marginRight: 20 }]}>$4.50</Text>
              </View>
            </View>
            <View style={styles.container3}>
                <Text style={[styles.commonText, { marginLeft: 70 }]}>YummyStore</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={[styles.smallText, { marginLeft: 20 }]}>Subtotal</Text>
                    <Text style={[styles.smallText, { marginRight: 20 }]}>$4.50</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={[styles.smallText, { marginLeft: 20 }]}>Services fee</Text>
                    <Text style={[styles.smallText, { marginRight: 20 }]}>$2.00</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={[styles.commonText, { marginLeft: 20 }]}>Total Payment</Text>
                    <Text style={[styles.commonText, { marginRight: 20 }]}>$7.50</Text>
                </View>
            </View>
            <View style={[styles.container5, {flexDirection:'row', justifyContent: 'flex-end'}]}>
                <View>
                    <Text style ={{fontFamily: 'Poppins-SemiBold', fontSize: 14, marginRight: 5}}>Total Payment</Text>
                    <Text style ={{fontFamily: 'Poppins-SemiBold', fontSize: 14, alignSelf: 'flex-end', marginRight: 5}}>$7.50</Text>
                </View>
                <TouchableOpacity style={{alignSelf:'flex-end', }} onPress = {() => router.push('login/reset2')}>
                <View style={{ backgroundColor: "#D96B41", width: 120, height: 47, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 14, fontFamily: "Poppins-Bold", textAlign: 'center', color: '#FAF5E1' }}>Place Order</Text>
                </View>
                </TouchableOpacity>

            </View>
          </View>
      </View>
    
  )
}
const styles = StyleSheet.create({
  smallText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
  },
  commonText: {
    fontFamily: 'Poppins-Medium', 
    fontSize: 14, 
  },
  quantity: {
    marginTop: 6,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold', 
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
  },
    column: {
    flex: 1,
  },
    item: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginBottom: 8,
  },
  selectedButton: {
    backgroundColor: '#FAF5E1',
    borderColor: '#E58B68', 
  },
  buttonText: {
    fontSize:24,
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
  button1: {
    marginLeft: 120,
    width: 40,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  button2: {
    marginRight: 120,
    width: 40,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  container1: {
    backgroundColor: 'white',
    paddingVertical: 8,
  },
  container4: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 8,
    marginTop: 20,
  },
  container3: {
    marginTop: 20,
    backgroundColor: 'white',
    paddingVertical: 8,
  },
  container5: {
    marginTop: 20,
    backgroundColor: 'white',
    height: 47,
  },
  container2: {
    marginLeft: 20,
    marginRight: 15,
    alignSelf: 'center',
    borderRadius: 8,
    width: 65,
    height: 61,
    backgroundColor: '#D9D9D9',
    marginVertical: 5,
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
    fontSize: 16, 
    fontFamily: 'Poppins-Medium', 
    marginLeft: 20, 
    marginVertical: 10,
  },
});
export default preReg