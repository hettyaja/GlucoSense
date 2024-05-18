import React, { useState } from 'react';
import { TextInput, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Switch } from 'react-native';

const Notification = () => {
  // State for managing the switch
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image
        style={{ position: 'absolute', width: 1000 }}
        source={require('./image/view(3).png')}
      />
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => {}} style={{ position: 'absolute', alignItems: 'left', right: 295, top: 60 }}>
          <Image source={require('./image/back(4).png')} />
        </TouchableOpacity>
      </View>
      <View style={{ fontFamily: 'Poppins' }}>
        <Text style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginLeft: 120, marginTop: 60, marginBottom: 50, fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' }}>
          Notification
        </Text>
      </View>

      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>Push Notification</Text>
        <Switch
          trackColor={{ false: '#cccc', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#fffff' : '#f4f3f4'}
          backgroundColor="#fffff"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={styles.switch}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    marginBottom: 500,
  },
  notificationText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  switch: {
    marginLeft: 'auto', // Align the switch to the right
    marginRight: 20,   // Add some right margin for better alignment
  },
});

export default Notification;
