import React, {useState} from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native';
import { images } from '../../constants/images'
import { router } from 'expo-router'
import ImageButton from '../../components/ImageButton'
import {useAuth } from '../context/authContext'

const FreemiumRegister= () => {
    const {register} = useAuth()
    const [username ,setUsername] = useState('')
    const [name, setName] = useState('')
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
                username,
                name,
                userType: 'free'
            }
            const user = await register(email, password, additionalData)
            router.push('/(question)/question1');
        } catch (error) {
            alert(error.message)
        }
        
    }
    return (
    
    <SafeAreaView style={styles.safeArea}>
        <Image source={images.header} style={{position:"absolute", width:430, height:275}}/>
        <View style={{alignItems:'flex-start', width:"100%", paddingHorizontal:20, paddingTop: Platform.OS === 'ios' ? 0 : 50}}>
        <ImageButton
            source={require("../../assets/back.png")}
            imageSize={{width:24, height:24}}
            onPress={() => router.back('/welcomePage')}
        />
        </View>
        <Text style={{fontFamily:"Poppins-Bold", fontSize: 24, paddingLeft: 25, paddingTop: 100, color: '#FAF5E1'}}>Sign up</Text>

        <View style={{marginTop:80}}>
        <Text style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 14,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 12,
            fontWeight: "bold"
            }}>
            Username
        </Text>
        <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection:'row', paddingBottom:2, marginBottom:10}}>
            <TextInput
                style={styles.input}
                keyboardType="default"
                value={username}
                onChangeText={text => setUsername(text)}
            />
        </View>

        <Text style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 14,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 12,
            fontWeight: "bold",
            }}>
            Name
        </Text>
        <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection:'row', paddingBottom:2, marginBottom:15}}>
            <TextInput
                style={styles.input}
                keyboardType="default"
                value={name}
                onChangeText={text => setName(text)}
            />
        </View>

        <Text style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 14,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 12,
            fontWeight: "bold"
            }}>
            Email
        </Text>
        <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection:'row', paddingBottom:2, marginBottom:15}}>
            <TextInput
                style={styles.input}
                keyboardType="email-address"
                value={email}
                onChangeText={text => setEmail(text)}
            />
        </View>

        <Text style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 14,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 12,
            fontWeight: "bold"
            }}>
            Password
        </Text>
        <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection:'row', paddingBottom:2, marginBottom:15}}>
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}/>
        </View>

        <Text style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 14,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 12,
            fontWeight: "bold"
            }}>
            Confirm Password
        </Text>
        </View>
        <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection:'row',paddingBottom:2, marginBottom: 15}}>
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
            />
        </View>
        
        <View style={{alignItems:'center', paddingTop:50}}>
        <TouchableOpacity onPress={() => handleSignUp()} style={styles.registerButtonContainer}>
            <Text style={styles.registerButtonText}> Register </Text>
        </TouchableOpacity>
        </View>
        
        <View style={{ alignItems:'center',flexDirection:'row', marginBottom: 5, justifyContent: 'center'}}>
        
        <Text style={{fontSize: 14, alignItems:'center', textAlign: 'center', marginTop: 20, fontFamily: 'Poppins-Medium'}}> Already have an account? 
        </Text>
        </View>
        
        <View style={{ alignItems:'center'}}>
        <TouchableOpacity onPress={() => {}}>
            <Text style={{ alignItems:'center', fontFamily: 'Poppins-Medium', fontSize: 14, paddingBottom: 35, color: '#0044CC', justifyContent: 'center', textAlign: 'center', fontFamily:'Poppins-Medium'}}> Log In </Text>
        </TouchableOpacity> 
        </View>
    </SafeAreaView>
    );
};

    const styles = StyleSheet.create({
        container: {flex: 1, alignItems: 'center'},
        safeArea: {flex: 1, backgroundColor: 'white'},
        registerButtonContainer: {
            elevation: 5,
            backgroundColor: "#E58B68",
            borderRadius: 8,
            borderColor: "#000000",
            resizeBorder: 10,
            borderWidth: 0,
            paddingVertical: 8,
            paddingHorizontal: 65
        },
        image: {
            width: 50,
            height: 200,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
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
            fontFamily: 'Poppins-Medium',
            fontSize: 18,
            color: "#FAF5E1",
            fontWeight: "bold",
            alignSelf: 'center',
            alignItems:'center'
        },
        touchablePreviousArrow: {
            flex: 1,
            paddingLeft: 30,
            justifyContent: 'left',
            alignItems: 'left',
        },
        previousArrowIcon: {
            width: 50,
            height: 100,
            size: 30,
            color: '#FAF5E1',
            paddingLeft: 30,
            justifyContent: 'left',
            alignItems: 'left',
        }
});

export default FreemiumRegister;