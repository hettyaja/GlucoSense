import { View, Image, Pressable, Text } from 'react-native'
import React from 'react'

const ImageButton = ({source, onPress}) => {
  return (
    <Pressable
    onPress={onPress}
    style={( { pressed }) => {
        return { opacity: pressed ? 0.8 : 1}
    }}>
      <Image source={source} resizeMode="contain"></Image>
    </Pressable>
  )
}

export default ImageButton