import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

//import LoginPageBackground from '.../.../ ';
const image = {uri: 'C:\Users\Hansen Yonatan\OneDrive - SIM - Singapore Institute of Management\Pictures\UI Design'};

const FreemiumRegister= () => {
    return (
    
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}/>
        </View>
        <View style={{flexDirection:'row', borderBottomColor:'#ccc', marginTop: 100, marginBottom: 50}}>
        <Text style={{
            fontFamily: 'Roboto',
            fontSize: 20,
            fontWeight: '500',
            color: '#FAF5E1',
            paddingTop: 20,
            marginTop: 30,
            marginBottom: 5,
            paddingLeft: 5
            }}> Sign up </Text>
        </View>

        <Text style={{
            fontFamily: 'Roboto',
            fontSize: 20,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 5
            }}>
            Username
        </Text>
        <View style={{ paddingLeft: 20, flexDirection:'row', borderBottomColor:'#ccc', borderBottomWidth:1, paddingBottom:2, marginBottom:10}}>
            <TextInput style={styles.input} placeholder= 'Enter your username'  keyboardType="default" />
        </View>

        <Text style={{
            fontFamily: 'Roboto',
            fontSize: 18,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 5
            }}>
            Name
        </Text>
        <View style={{ paddingLeft: 20, flexDirection:'row', borderBottomColor:'#ccc', borderBottomWidth:1, paddingBottom:2, marginBottom:15}}>
            <TextInput style={styles.input} placeholder= 'Enter your name'  keyboardType="default" />
        </View>

        <Text style={{
            fontFamily: 'Roboto',
            fontSize: 18,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 5
            }}>
            Email
        </Text>
        <View style={{ paddingLeft: 20, flexDirection:'row', borderBottomColor:'#ccc', borderBottomWidth:1, paddingBottom:2, marginBottom:15}}>
            <TextInput style={styles.input} placeholder= 'Enter your email'  keyboardType="email-address" />
        </View>

        <Text style={{
            fontFamily: 'Roboto',
            fontSize: 18,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 5
            }}>
            Password
        </Text>
        <View style={{ paddingLeft: 20, flexDirection:'row', borderBottomColor:'#ccc', borderBottomWidth:1, paddingBottom:2, marginBottom:15}}>
            <TextInput style={styles.input} placeholder= 'Enter your password'  secureTextEntry={true} />
        </View>

        <Text style={{
            fontFamily: 'Roboto',
            fontSize: 20,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 5
            }}>
            Confirm Password
        </Text>
        <View style={{ paddingLeft: 20, flexDirection:'row', borderBottomColor:'#ccc', borderBottomWidth:1, paddingBottom:2, marginBottom: 15}}>
            <TextInput style={styles.input} placeholder= 'Enter your confirmation password' secureTextEntry={true} />
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
            <Text style={{ marginBottom: 25, justifyContent: 'center', textAlign: 'center', fontWeight: '700'}}> Log In </Text>
        </TouchableOpacity>
        
        </View>
    </SafeAreaView>
    );
};

    const styles = StyleSheet.create({
        container: 1,
        safeArea: {flex: 1, justifyContent: 'center'},
        registerButtonContainer: {
            elevation: 6,
            backgroundColor: "#FFFFFF",
            borderRadius: 60,
            resizeBorder: 10,
            paddingVertical: 8,
            paddingHorizontal: 30
        },
        image: {
            flex: 1,
            justifyContent: 'center',
        },
        input: {
            flex:1,
            width: 300,
            height: 40,
            backgroundColor: '#fff',
            paddingVertical: 3,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 15,
            fontSize: 16,
        },
        registerButtonText: {
            fontSize: 18,
            color: "#FAF5E1",
            fontWeight: "bold",
            alignSelf: "center",
            textTransform: "uppercase"
        },
        previousButtonContainer: {
            elevation: 6,
            backgroundColor: "#E58B68",
            borderRadius: 60,
            resizeBorder: 10,
            paddingVertical: 8,
            paddingHorizontal: 30
        },
});


export default FreemiumRegister;