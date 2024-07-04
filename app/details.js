import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Touchable, TextInput, ScrollView,} from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack, router} from 'expo-router'
import { images } from './constants/images';
import { Picker } from '@react-native-picker/picker';
import ImageButton from './components/ImageButton';
import Ionicons from 'react-native-vector-icons/Ionicons'

const preReg = () => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleButtonPress = (buttonIndex) => {
    setSelectedButton(buttonIndex === selectedButton ? null : buttonIndex);
  }
  return (
    <>
      <Stack.Screen options={{
        title: 'Details',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold'},
        headerLeft: () => (
            <TouchableOpacity onPress={() => router.back('/food')}>
                <Ionicons name="chevron-back" size={32} color='white'/>
            </TouchableOpacity>
        ),
        headerTitle: 'Details',
        headerTitleAlign: 'center',
      }}/>

    <ScrollView>
      <View style={{backgroundColor:'#f5f5f5'}}>
              <View style={styles.container2}/>
            <View style={styles.container1}>
              <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{fontFamily: 'Poppins-Bold', fontSize: 16, marginLeft: 20}}>Chicken Rice</Text>
                  <Text style={{fontFamily: 'Poppins-Bold', fontSize: 16, marginRight: 20}}>$4.50</Text>
              </View>
              <Text style={{fontFamily: 'Poppins-Regular', fontSize: 10, marginRight: 20, alignSelf: 'flex-end'}}>Base price</Text>
              <Text style={{fontFamily: 'Poppins-Regular', fontSize: 12, marginRight: 20, alignSelf: 'center', color: '#9A9A9A', marginTop: 20, marginHorizontal: 20}}>Perfect chicken, yummy yummy yummy yummy yummy 
                  yummy yummy yummy yuummy yummmy yummy yummy yummy yummy yummy yummy yummy yummy</Text>
            </View>
            <View style={styles.container3}>
              <Text style={{fontFamily: 'Poppins-Bold', fontSize: 16, marginLeft: 20}}>Ingredients</Text>
              <View style={styles.container}>
                  <View style={styles.column}>
                      <Text style={styles.item}>• Chicken</Text>
                      <Text style={styles.item}>• rice</Text>
                      <Text style={styles.item}>• ginger</Text>
                  </View>
                  <View style={styles.column}>
                      <Text style={styles.item}>• Sugar</Text>
                      <Text style={styles.item}>• Water</Text>
                      <Text style={styles.item}>• Oil</Text>
                  </View>
              </View>
            </View>
            <View style={styles.container4}>
              <TouchableOpacity onPress={decrement} style={styles.button1}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity onPress={increment} style={styles.button2}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ alignItems: 'center', marginTop: 10 }} onPress = {() => router.push('/confirm')}>
              <View style={{ backgroundColor: "#D96B41", width: 164, height: 42, borderRadius: 8, justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, fontFamily: "Poppins-Medium", textAlign: 'center', color: '#FAF5E1' }}>Buy</Text>
              </View>
            </TouchableOpacity>
      </View>
    </ScrollView>
    </>
  )
}
const styles = StyleSheet.create({
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
  container2: {
    alignSelf: 'center',
    borderRadius: 8,
    width: 342,
    height: 238,
    backgroundColor: '#D9D9D9',
    marginVertical: 20,
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