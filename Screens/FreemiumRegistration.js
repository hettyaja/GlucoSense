import React from 'react';
import { Button, StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity, View, Separator } from 'react-native';

//import LoginPageBackground from '.../.../ ';

const FreemiumRegister= () => {
    return (
    
    <SafeAreaView style={{flex: 3, justifyContent: 'Right'}}>
        
        <View style={{flexDirection:'row', borderBottomColor:'#ccc', marginTop: 100, marginBottom: 50}}>
        <Text style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 20,
            fontWeight: '500',
            color: '#333',
            paddingTop: 20,
            marginTop: 30,
            marginBottom: 5,
            paddingLeft: 5
            }}> Sign up </Text>
        </View>

        <Text style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 20,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 5
            }}>
            Username
        </Text>
        <View style={{ paddingLeft: 20, flexDirection:'row', borderBottomColor:'#ccc', borderBottomWidth:1, paddingBottom:2, marginBottom:10}}>
            <TextInput placeholder= 'Enter your username' style={{flex: 1, paddingVertical: 0}} keyboardType="default" />
        </View>

        <Text style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 18,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 5
            }}>
            Name
        </Text>
        <View style={{ paddingLeft: 20, flexDirection:'row', borderBottomColor:'#ccc', borderBottomWidth:1, paddingBottom:2, marginBottom:15}}>
            <TextInput placeholder= 'Enter your name' style={{flex: 1, paddingVertical: 0}} keyboardType="default" />
        </View>

        <Text style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 18,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 5
            }}>
            Email
        </Text>
        <View style={{ paddingLeft: 20, flexDirection:'row', borderBottomColor:'#ccc', borderBottomWidth:1, paddingBottom:2, marginBottom:15}}>
            <TextInput placeholder= 'Enter your email' style={{flex: 1, paddingVertical: 0}} keyboardType="email-address" />
        </View>

        <Text style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 18,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 5
            }}>
            Password
        </Text>
        <View style={{ paddingLeft: 20, flexDirection:'row', borderBottomColor:'#ccc', borderBottomWidth:1, paddingBottom:2, marginBottom:15}}>
            <TextInput placeholder= 'Enter your password' style={{flex: 1, paddingVertical: 0}} secureTextEntry={true} />
        </View>

        <Text style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 20,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 5
            }}>
            Confirm Password
        </Text>
        <View style={{ paddingLeft: 20, flexDirection:'row', borderBottomColor:'#ccc', borderBottomWidth:1, paddingBottom:2, marginBottom: 15}}>
            <TextInput placeholder= 'Enter your confirmation password' style={{flex: 1, paddingVertical: 3}} keyboardType="" />
        </View>
        
        <View style={{alignItems:'center'}}>
        <TouchableOpacity onPress={() => {}} style={styles.registerButtonContainer}>
            <Text style={styles.registerButtonText}> Register </Text>
        </TouchableOpacity>
        </View>
        <View style={{ flexDirection:'row', borderBottomColor:'#ccc', borderBottomWidth:1, paddingBottom:2, marginBottom: 25, justifyContent: 'center'}}>
        
        <Text style={{ alignItems:'center', textAlign: 'center', marginTop: 25}}> Already have an account? 
        </Text>
        </View>
        
        <View style={{ alignItems:'center'}}>
        <TouchableOpacity onPress={() => {}}>
            <Text style={{ marginBottom: 25, justifyContent: 'center', textAlign: 'center', fontWeight: '700'}}> Login </Text>
        </TouchableOpacity>
        
        </View>
    </SafeAreaView>
    );
};

    const styles = StyleSheet.create({
        registerButtonContainer: {
            elevation: 6,
            backgroundColor: "#009688",
            borderRadius: 60,
            resizeBorder: 10,
            paddingVertical: 8,
            paddingHorizontal: 30
        },
        registerButtonText: {
            fontSize: 18,
            color: "#fff",
            fontWeight: "bold",
            alignSelf: "center",
            textTransform: "uppercase"
        },
        registerButtonContainer: {
            elevation: 6,
            backgroundColor: "#009688",
            borderRadius: 60,
            resizeBorder: 10,
            paddingVertical: 8,
            paddingHorizontal: 30
        },
});


export default FreemiumRegister;