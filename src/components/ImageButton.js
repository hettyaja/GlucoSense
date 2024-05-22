import { View, Image, Pressable, Text } from 'react-native'
import React from 'react'

const ImageButton = ({source, onPress, imageSize, customStyle}) => {
  return (
    <Pressable
    onPress={onPress}
    style={( { pressed }) => {
        return [{ opacity: pressed ? 0.8 : 1}, customStyle]
    }}>
      <Image source={source} style={imageSize}></Image>
    </Pressable>
  )
}

export default ImageButton