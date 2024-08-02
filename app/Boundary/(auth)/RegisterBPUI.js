import React, {useState} from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Header from '../../components/Header';
import RegisterBPController from '../../Controller/RegisterBPController';

const RegisterBPUI= () => {
    const [entityName, setEntityName] = useState('')
    const [UEN, setUEN] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [postal, setPostal] = useState('')
    const [name, setName] = useState('')
    const [phoneNum, setPhoneNum] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSignUp = async () => {
        try {
            const additionalData = {
                entityName,
                UEN,
                city,
                address, 
                postal,
                name,
                phoneNum
            }
            await RegisterBPController.register(email, password, confirmPassword, additionalData)
            router.back()
        } catch (error) {
            Alert.alert('Register Error', error.message)
        }
    }

    return (
        <>
          <Header
            title="Register"
            leftButton='Back'
            onLeftButtonPress={() => router.back('/welcomePage')}
          />
        <ScrollView style={styles.safeArea}>
    
        <Text style={styles.subheader}>
            Business Information
        </Text>
        <View style={styles.container1}>
            <Text style={styles.textStyle}>
                Entity Name
            </Text>
            <View style={styles.boxStyle}>
                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    value={entityName}
                    onChangeText={text => setEntityName(text)}
                />
            </View>
            <Text style={styles.textStyle}>
                Unique Entity Number (UEN)
            </Text>
            <View style={styles.boxStyle}>
                <TextInput
                    style={styles.input}
                    value={UEN}
                    onChangeText={text => setUEN(text)}
                />
            </View>
        </View>

        <Text style={styles.subheader}>
            Enterprise Address
        </Text>
        <View style={styles.container1}>
            <Text style={styles.textStyle}>
                City/Town
            </Text>
            <View style={styles.boxStyle}>
                <TextInput
                    style={styles.input}
                    value={city}
                    onChangeText={text => setCity(text)}
                />
            </View>
            <Text style={styles.textStyle}>
                Address
            </Text>
            <View style={styles.boxStyle}>
                <TextInput
                    style={styles.input}
                    value={address}
                    onChangeText={text => setAddress(text)}
                    autoCapitalize="none"
                />
            </View>
            <Text style={styles.textStyle}>
                Postal Code
            </Text>
        
            <View style={styles.boxStyle}>
                <TextInput
                    style={styles.input}
                    value={postal}
                    onChangeText={Number => setPostal(Number)}
                    maxLength={6}
                    keyboardType="numeric" 
                />
            </View>
        </View>

        
        <Text style={styles.subheader}>
            Personal Information
        </Text>
        <View style={styles.container1}>
            <Text style={styles.textStyle}>
                Full Name
            </Text>
            <View style={styles.boxStyle}>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={Text => setName(Text)}
                />
            </View>

            <Text style={styles.textStyle}>
                Phone Number
            </Text>
            <View style={styles.boxStyle}>
                <TextInput
                    style={styles.input}
                    value={phoneNum}
                    onChangeText={Number => setPhoneNum(Number)}
                />
            </View>
        </View>

        <Text style={styles.subheader}>
            Other Information
        </Text>
        <View style={styles.container1}>
            <Text style={styles.textStyle}>
                Email 
            </Text>
            <View style={styles.boxStyle}>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={Text => setEmail(Text)}
                />
            </View>

            <Text style={styles.textStyle}>
                Password
            </Text>
            <View style={styles.boxStyle}>
                <TextInput
                    style={styles.input}
                    value={password}
                    secureTextEntry = {true}
                    onChangeText={Text => setPassword(Text)}
                />
            </View>

            <Text style={styles.textStyle}>
                Confirmation Password
            </Text>
            <View style={styles.boxStyle}>
                <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={Text => setConfirmPassword(Text)}
                />
            </View>
        </View>

            
            <View style={{ paddingBottom:10, alignItems:'center', marginTop:24}}>
            <TouchableOpacity onPress={() => handleSignUp()} style={styles.registerButtonContainer}>
                <Text style={styles.registerButtonText}> Register </Text>
            </TouchableOpacity>
            </View>
            
            <View style={{ alignItems:'center',flexDirection:'row', marginBottom: 5, justifyContent: 'center'}}>
            <Text style={{fontSize: 14, alignItems:'center', textAlign: 'center', marginTop: 10, fontFamily: 'Poppins-Medium'}}> Already have an account? 
            </Text>
            </View>
            
            <View style={{ alignItems:'center'}}>
            <TouchableOpacity onPress={() => router.push('/loginPage')}>
                <Text style={{ alignItems:'center', fontFamily: 'Poppins-Medium', fontSize: 14, paddingBottom: 35, color: '#0044CC', justifyContent: 'center', textAlign: 'center', fontFamily:'Poppins-Medium'}}> Log In </Text>
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
        }
    
    });

export default RegisterBPUI;