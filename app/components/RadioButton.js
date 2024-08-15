import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const RadioButton = ({ selected }) => {
  return (
    <View style={styles.radioButtonContainer}>
      {selected ? <FontAwesome name="dot-circle-o" size={24} color="#E68B67" /> : <FontAwesome name="circle-o" size={24} color="grey" />}
    </View>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
});

export default RadioButton;