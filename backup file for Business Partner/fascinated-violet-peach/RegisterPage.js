import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function RegisterPage({ navigation }) {
  const [entityName, setEntityName] = useState('');
  const [uen, setUen] = useState('');
  const [signeeName, setSigneeName] = useState('');
  const [nric, setNric] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    navigation.navigate('CreateRecipe');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('/assets/view.png')}
        style={styles.header}
        imageStyle={styles.headerImage}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Business registration details</Text>
      </ImageBackground>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Entity Name"
          value={entityName}
          onChangeText={setEntityName}
        />
        <TextInput
          style={styles.input}
          placeholder="Unique Entity Number (UEN)"
          value={uen}
          onChangeText={setUen}
        />
        <TextInput
          style={styles.input}
          placeholder="Contract Signee Name"
          value={signeeName}
          onChangeText={setSigneeName}
        />
        <TextInput
          style={styles.input}
          placeholder="Contract Signee NRIC"
          value={nric}
          onChangeText={setNric}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmation Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <Button title="Register" onPress={handleRegister} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});
