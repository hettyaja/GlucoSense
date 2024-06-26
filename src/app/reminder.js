import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Touchable, TextInput, ScrollView} from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack, router} from 'expo-router'
import { images } from '../constants/images';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Header from '../components/Header';



const reminder = () => {


  return (
    <>
      <Header
        title='Reminder'
        leftButton='Back'
        rightButton='Add'
      />

    <ScrollView style={{flex:1, backgroundColor:'#f5f5f5'}}>
        
    </ScrollView>
    </>
  )
}
const styles = StyleSheet.create({
  
});
export default reminder
