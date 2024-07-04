import React from 'react';
import { View, StyleSheet } from 'react-native';

const Divider = ({ withMargin }) => (
  <View style={[styles.divider, withMargin ? styles.withMargin : styles.noMargin]} />
);

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: '#808080',
    borderBottomWidth: 0.5,
  },
  withMargin: {
    marginHorizontal: 16,
  },
  noMargin: {
    marginHorizontal: 0,
  },
});

export default Divider;