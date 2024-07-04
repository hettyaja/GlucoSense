import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

const NotificationScreen = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>Push notifications</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#f2a154" }}
          thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 14,
    fontWeight: 'SemiBold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default NotificationScreen;
