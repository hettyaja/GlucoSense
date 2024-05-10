import { View, Image, Pressable, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({title, onPress, buttonColor, customStyle}) => {
  return (
    <TouchableOpacity
    onPress={onPress}
    style={[{
      backgroundColor:buttonColor,
      borderRadius:8,
      width:"55%",
      height:"5%",
      alignItems:'center',
      justifyContent:'center',
    }, customStyle]}>
        <Text style={{color:"#FFFFFF", fontFamily:"Poppins-Bold", fontSize:13}}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton