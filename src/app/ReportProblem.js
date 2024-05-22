import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ReportProblem = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    // Handle submit logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Name </Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.title}> Email </Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        
      />

      <Text style={styles.title}> Description </Text>
      <TextInput
        style={styles.desc}
        value={feedback}
        onChangeText={setFeedback}
        multiline={true}
        numberOfLines={4}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};


//CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: '#F5F5F',
  },

  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    paddingLeft: 8,
    borderRadius: 8,
    backgroundColor: '#ffff'
  },
  
  desc: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius:8,
    backgroundColor: '#ffff'
  },

  title:{
    fontSize:14,
    fontFamily: "Poppins-SemiBold",
  }
});

export default ReportProblem;
