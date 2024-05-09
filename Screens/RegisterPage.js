import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

//import LoginPageBackground from '.../.../ '
const FreemiumRegister= () => {
    return (
    
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
        <Image
        style={styles.image}
        source= {require('../assets/register.png')}/>
        </View>
        <View style={styles.touchablePreviousArrow}>
        <TouchableOpacity onPress={() => {}}>
        <Image
        style={styles.previousArrowIcon}
        source= {require('../assets/back.png')}/>
        </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row', borderBottomColor:'#ccc', marginTop: 100, marginBottom: 50}}>
        <Text style={{
            fontFamily: 'Poppins',
            fontSize: 30,
            fontWeight: '500',
            color: '#FAF5E1',
            paddingTop: 20,
            marginTop: 30,
            marginBottom: 5,
            paddingLeft: 5,
            fontWeight: "bold"
            }}> Sign up </Text>
        </View>

        <Text style={{
            fontFamily: 'Roboto',
            fontSize: 18,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 12,
            fontWeight: "bold"
            }}>
            Username
        </Text>
        <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection:'row', paddingBottom:2, marginBottom:10}}>
            <TextInput style={styles.input} placeholder= 'Enter your username'  keyboardType="default" />
        </View>

        <Text style={{
            fontFamily: 'Roboto',
            fontSize: 18,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 12,
            fontWeight: "bold",
            }}>
            Name
        </Text>
        <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection:'row', paddingBottom:2, marginBottom:15}}>
            <TextInput style={styles.input} placeholder= 'Enter your name'  keyboardType="default" />
        </View>

        <Text style={{
            fontFamily: 'Roboto',
            fontSize: 18,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 12,
            fontWeight: "bold"
            }}>
            Email
        </Text>
        <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection:'row', paddingBottom:2, marginBottom:15}}>
            <TextInput style={styles.input} placeholder= 'Enter your email'  keyboardType="email-address" />
        </View>

        <Text style={{
            fontFamily: 'Roboto',
            fontSize: 18,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 12,
            fontWeight: "bold"
            }}>
            Password
        </Text>
        <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection:'row', paddingBottom:2, marginBottom:15}}>
            <TextInput style={styles.input} placeholder= 'Enter your password'  secureTextEntry={true} />
        </View>

        <Text style={{
            fontFamily: 'Roboto',
            fontSize: 18,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 12,
            fontWeight: "bold"
            }}>
            Confirm Password
        </Text>
        <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection:'row',paddingBottom:2, marginBottom: 15}}>
            <TextInput style={styles.input} placeholder= 'Enter your confirmation password' secureTextEntry={true} />
        </View>
        
        <View style={{alignItems:'center'}}>
        <TouchableOpacity onPress={() => {}} style={styles.registerButtonContainer}>
            <Text style={styles.registerButtonText}> Register </Text>
        </TouchableOpacity>
        </View>
        
        <View style={{ alignItems:'center',flexDirection:'row', marginBottom: 5, justifyContent: 'center'}}>
        
        <Text style={{ fontSize: 16, alignItems:'center', textAlign: 'center', marginTop: 20, fontWeight: "bold"}}> Already have an account? 
        </Text>
        </View>
        
        <View style={{ alignItems:'center'}}>
        <TouchableOpacity onPress={() => {}}>
            <Text style={{ alignItems:'center', fontFamily: 'Roboto', fontSize: 17, paddingBottom: 35, color: '#0044CC', marginTop: 15, marginBottom: 35, justifyContent: 'center', textAlign: 'center', fontWeight: 'bold'}}> Log In </Text>
        </TouchableOpacity> 
        </View>
    </SafeAreaView>
    );
};

    const styles = StyleSheet.create({
        container: {flex: 1, alignItems: 'center'},
        safeArea: {flex: 1, justifyContent: 'center'},
        registerButtonContainer: {
            elevation: 5,
            backgroundColor: "#E58B68",
            borderRadius: 12,
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
            fontFamily: 'Roboto',
            flex:1,
            width: 300,
            height: 40,
            backgroundColor: '#fff',
            paddingVertical: 3,
            paddingLeft: 5,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 15,
            fontSize: 16
        },
        registerButtonText: {
            fontFamily: 'Roboto',
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