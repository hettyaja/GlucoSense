import React, {useState} from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Header from '../../components/Header';
import RegisterBPController from '../../Controller/RegisterBPController';


const validatePassword = (password) => {
  const errors = {};
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  if (!password) {
    errors.password = 'Password is required';
  } else if (!passwordRegex.test(password)) {
    errors.password = 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character';
  }

  return errors;
};

const validateUEN = (UEN) => {
    const errors = {};
    if (!UEN) {
      errors.UEN = 'UEN is required';
    } else if (UEN.length < 9 || UEN.length > 10) {
      errors.UEN = 'UEN number must be 9 to 10 digits';
    }
    return errors;
  };
  

const RegisterBPUI = ({}) => {
  const [entityName, setEntityName] = useState('');
  const [UEN, setUEN] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [postal, setPostal] = useState('');
  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // Password validation
    const passwordErrors = validatePassword(password);
    if (Object.keys(passwordErrors).length > 0) {
      newErrors.password = passwordErrors.password;
    }

    const UENErrors = validateUEN(UEN);
    if (Object.keys(UENErrors).length > 0) {
      newErrors.UEN = UENErrors.UEN;
    }

    // Additional validation
    if (!entityName) newErrors.entityName = 'Entity name is required';
    if (!UEN || UEN.length < 9 || UEN.length > 10) newErrors.UEN = 'UEN number must be 9 to 10 digits';
    if (!city || !/^[a-zA-Z\s]+$/.test(city)) newErrors.city = 'Invalid city name; only letters are allowed.';
    if (!address) newErrors.address = 'Address is required';
    if (!postal || postal.length !== 6) newErrors.postal = 'Postal code must be 6 digits';
    if (!name) newErrors.name = 'Name is required';
    if (!phoneNum || phoneNum.length !== 8) newErrors.phoneNum = 'Phone number must be 8 digits';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email address';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (validate()) {
      try {
        const additionalData = {
          entityName,
          UEN,
          city,
          address, 
          postal,
          name,
          phoneNum
        };

        console.log('Registering with data:', {
            email,
            password,
            confirmPassword,
            additionalData
          });
        // Replace with your registration logic
        await RegisterBPController.register(email, password, confirmPassword, additionalData);
        Alert.alert('Success', 'Your business account is pending approval');
        router.dismiss(2);
      } catch (error) {
        console.log('Register Error', error.message);
      }
    }
  };

  return (
    <>
      <Header
        title="Register"
        leftButton='Back'
        onLeftButtonPress={() => router.back('/welcomePage')}
      />
      <ScrollView style={styles.safeArea}>
        <Text style={styles.subheader}>Business Information</Text>
        <View style={styles.container1}>
          <Text style={styles.textStyle}>Entity Name</Text>
          <View style={styles.boxStyle}>
            <TextInput
              style={styles.input}
              value={entityName}
              onChangeText={text => setEntityName(text)}
            />
          </View>

          {errors.entityName && <Text style={styles.errorText}>{errors.entityName}</Text>}
          
          <Text style={styles.textStyle}>Unique Entity Number (UEN)</Text>
          <View style={styles.boxStyle}>
            <TextInput
              style={styles.input}
              value={UEN}
              onChangeText={text => setUEN(text)}
            />
          </View>
          {errors.UEN && <Text style={styles.errorText}>{errors.UEN}</Text>}
        </View>

        <Text style={styles.subheader}>Enterprise Address</Text>
        <View style={styles.container1}>
          <Text style={styles.textStyle}>City/Town</Text>
          <View style={styles.boxStyle}>
            <TextInput
              style={styles.input}
              value={city}
              onChangeText={text => setCity(text)}
            />
          </View>
          {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
          
          <Text style={styles.textStyle}>Address</Text>
          <View style={styles.boxStyle}>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={text => setAddress(text)}
            />
          </View>
          {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
          
          <Text style={styles.textStyle}>Postal Code</Text>
          <View style={styles.boxStyle}>
            <TextInput
              style={styles.input}
              value={postal}
              onChangeText={text => setPostal(text)}
              minLength={6}
              maxLength={6}
              keyboardType="numeric"
            />
          </View>
          {errors.postal && <Text style={styles.errorText}>{errors.postal}</Text>}
        </View>

        <Text style={styles.subheader}>Personal Information</Text>
        <View style={styles.container1}>
          <Text style={styles.textStyle}>Full Name</Text>
          <View style={styles.boxStyle}>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={text => setName(text)}
            />
          </View>
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          
          <Text style={styles.textStyle}>Phone Number</Text>
          <View style={styles.boxStyle}>
            <TextInput
              style={styles.input}
              value={phoneNum}
              onChangeText={text => setPhoneNum(text)}
              keyboardType="numeric"
              maxLength={8}
            />
          </View>
          {errors.phoneNum && <Text style={styles.errorText}>{errors.phoneNum}</Text>}
        </View>

        <Text style={styles.subheader}>Other Information</Text>
        <View style={styles.container1}>
          <Text style={styles.textStyle}>Email</Text>
          <View style={styles.boxStyle}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          
          <Text style={styles.textStyle}>Password</Text>
          <View style={styles.boxStyle}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry
            />
          </View>
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          
          <Text style={styles.textStyle}>Confirmation Password</Text>
          <View style={styles.boxStyle}>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              secureTextEntry
            />
          </View>
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
        </View>

        <View style={{ paddingBottom: 10, alignItems: 'center', marginTop: 24 }}>
          <TouchableOpacity onPress={() => handleSignUp()} style={styles.registerButtonContainer}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center', flexDirection: 'row', marginBottom: 5, justifyContent: 'center' }}>
          <Text style={{ fontSize: 14, alignItems: 'center', textAlign: 'center', marginTop: 10, fontFamily: 'Poppins-Medium' }}>
            Already have an account?
          </Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => router.push('/loginPage')}>
            <Text style={{ alignItems: 'center', fontFamily: 'Poppins-Medium', fontSize: 14, paddingBottom: 35, color: '#0044CC', justifyContent: 'center', textAlign: 'center' }}>
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
        
        );
    };

    const styles = StyleSheet.create({
        // container: {flex: 1, alignItems: 'center'},
        safeArea: {flex: 1, backgroundColor:'#F5F5F5'},
        registerButtonContainer: {
            backgroundColor: "#E58B68",
            borderRadius: 8,
            borderColor: "#000000",
            resizeBorder: 8,
            borderWidth: 0,
            paddingVertical: 8,
            paddingHorizontal: 65,
        },
        textStyle: {
            fontFamily: 'Poppins-Medium',
            fontSize: 14,
            color: '#333',
            paddingLeft: 16,
        },
       
        input: {
            fontFamily: 'Poppins-Regular',
            flex:1,
            width: 300,
            height: 40,
            backgroundColor: '#fff',
            paddingVertical: 3,
            paddingLeft: 5,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            fontSize: 14
        },
        registerButtonText: {
            fontFamily: 'Poppins-Bold',
            fontSize: 16,
            color: "white",
            fontWeight: "bold",
            alignSelf: 'center',
            alignItems:'center'
        },

        boxStyle:{ 
            paddingHorizontal: 16,
            flexDirection:'row',
            marginBottom: 8
        },

        items:{
            paddingVertical: 16,
        },

        container1:{
            marginTop: 8,
            paddingVertical: 16,
            backgroundColor: '#ffff',
        },
        
        subheader:{
            paddingHorizontal: 16,
            marginTop: 24,
            fontSize: 10,
            fontFamily: "Poppins-Regular"
        },
        errorText:{
            fontFamily: 'Poppins-Regular',
            fontSize: 12,
            color: 'red',
            marginBottom: 15,  
            paddingHorizontal :16,
        }
    
    });

export default RegisterBPUI;