import React, {useState} from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { images } from '../../constants/images';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useAuth } from '../context/authContext'

const BusinessRegister= () => {
    const { register } = useAuth()
    const [entityName, setEntityName] = useState('')
    const [UEN, setUEN] = useState('')
    const [NRIC, setNRIC] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSignUp = async () => {
        if(password !== confirmPassword) {
            alert('Password do not match!')
            return;
        }

        try {
            const additionalData = {
                entityName,
                UEN,
                NRIC,
                userType: 'businessPartner'
            }
            const user = await register(email, password, additionalData)
        } catch (error) {
            alert(error.message)
        }
    }

    return (
    <SafeAreaView style={styles.safeArea}>
      <Image source={images.header} style={{position:"absolute", width:430, height:275}}/>
      <View style={{alignItems:'flex-start', width:"100%", paddingHorizontal:16}}>
        <TouchableOpacity onPress={() => router.back('/preReg')}>
            <Ionicons name='chevron-back' size={32} color='white'/>
        </TouchableOpacity>

        <Text style={{fontFamily:"Poppins-Bold", fontSize: 24, paddingLeft: 25, paddingTop: 50, color: 'white'}}>Business{'\n'}registration{'\n'}details</Text>
      </View>
      <View style={{paddingTop:50}}>
        <Text style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 14,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 12
            }}>
            Entity Name
        </Text>
        <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection:'row', paddingBottom:2, marginBottom: 15}}>
            <TextInput
                style={styles.input}
                keyboardType="default"
                value={entityName}
                onChangeText={text => setEntityName(text)}
            />
        </View>

        <Text style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 14,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 12
            }}>
            Unique Entity Number (UEN)
        </Text>
        <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection:'row', paddingBottom:2, marginBottom: 15}}>
            <TextInput
                style={styles.input}
                value={UEN}
                onChangeText={text => setUEN(text)}
            />
        </View>

        <Text style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 14,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 12
            }}>
            Contract Signee NRIC
        </Text>
        <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection:'row', paddingBottom:2, marginBottom:15}}>
            <TextInput
                style={styles.input}
                value={NRIC}
                onChangeText={text => setNRIC(text)}
            />
        </View>

        <Text style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 14,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 12
            }}>
            Email
        </Text>
        <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection:'row', paddingBottom:2, marginBottom:15}}>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={text => setEmail(text)}
            />
        </View>

        <Text style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 14,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 12
            }}>
            Password
        </Text>
        </View>
        <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection:'row', paddingBottom:2, marginBottom:15}}>
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
            />
        </View>

        <Text style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 14,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 12
            }}>
            Confirm Password
        </Text>
        <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection:'row',paddingBottom:2, marginBottom: 25}}>
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
            />
        </View>
        
        <View style={{ paddingBottom:10, alignItems:'center'}}>
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
    </SafeAreaView>
    );
};

    const styles = StyleSheet.create({
        container: {flex: 1, alignItems: 'center'},
        safeArea: {flex: 1, backgroundColor:'white'},
        registerButtonContainer: {
            elevation: 5,
            backgroundColor: "#E58B68",
            borderRadius: 8,
            borderColor: "#000000",
            resizeBorder: 8,
            borderWidth: 0,
            paddingVertical: 8,
            paddingHorizontal: 65,
        },
        image: {
            paddingBottom: 500,
            alignItems:'center',
            resizeMode:  "contain",
        },
        input: {
            fontFamily: 'Poppins-Medium',
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
            color: "#FAF5E1",
            fontWeight: "bold",
            alignSelf: 'center',
            alignItems:'center'
        },
        back: {
            flex: 1,
            width: 50,
            height: 100,
            size: 30,
            color: '#FAF5E1',
            paddingLeft: 30,
            justifyContent: 'left',
            alignItems: 'left',
        }
    });

export default BusinessRegister;