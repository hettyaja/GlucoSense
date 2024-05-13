import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
//import { Link } from 'expo-router';


//import registerImage images.registerBP from '.../.../ '
//import registerPreviousButton back.png from '.../.../ '
//import { images } from '../../constants/images';

const BusinessRegister= () => {
        const handleRegister = () => {
        // handle register
        console.log('Register button pressed');
        };

        const handleBack = () => {
        // handle back
        console.log('Back button pressed');
        };
    return (
    
    <SafeAreaView style={styles.safeArea}>
        <Image  style={{position:"absolute", right: 0.5, top:35}}
        source={require('../assets/registerBP.png')}/>
        <Image onPress={handleBack} style={{position:"absolute", alignItems: 'left', right: 365, top: 60}}
        source={require('../assets/back.png')}/>
        
        <View style={{ paddingLeft:5 }}>
        <Text style={{
            fontFamily: 'Poppins',
            fontSize: 30,
            fontWeight: '500',
            color: '#FAF5E1',
            paddingTop: 35,
            marginTop: 320,
            paddingLeft: 5,
            fontWeight: "bold"
            }}> Business 
        </Text>
        </View>
        
        <View style={{ paddingLeft:5 }}>
        <Text style={{
            fontFamily: 'Poppins',
            fontSize: 30,
            fontWeight: '500',
            color: '#FAF5E1',
            paddingLeft: 5,
            fontWeight: "bold"
            }}> registration
        </Text>
        </View>
        <View style={{ paddingLeft:5, marginBottom: 53}}>
        <Text style={{
            fontFamily: 'Poppins',
            fontSize: 30,
            fontWeight: '500',
            color: '#FAF5E1',
            paddingLeft: 5,
            fontWeight: "bold"
            }}> details
        </Text>
        </View>
        
        <Text style={{
            fontFamily: 'Poppins',
            fontSize: 18,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 12,
            fontWeight: "bold"
            }}>
            Entity Name
        </Text>
        <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection:'row', paddingBottom:2, marginBottom: 15}}>
            <TextInput style={styles.input}  keyboardType="default" />
        </View>

        <Text style={{
            fontFamily: 'Poppins',
            fontSize: 18,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 12,
            fontWeight: "bold",
            }}>
            Unique Entity Number (UEN)
        </Text>
        <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection:'row', paddingBottom:2, marginBottom: 15}}>
            <TextInput style={styles.input} secureTextEntry={true} />
        </View>

        <Text style={{
            fontFamily: 'Roboto',
            fontSize: 18,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 12,
            fontWeight: "bold"
            }}>
            Contract Signee NRIC
        </Text>
        <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection:'row', paddingBottom:2, marginBottom:15}}>
            <TextInput style={styles.input} secureTextEntry={true} />
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
            <TextInput style={styles.input} secureTextEntry={true} />
        </View>

        <Text style={{
            fontFamily: 'Poppins',
            fontSize: 18,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 12,
            fontWeight: "bold"
            }}>
            Confirm Password
        </Text>
        <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection:'row',paddingBottom:2, marginBottom: 25}}>
            <TextInput style={styles.input} secureTextEntry={true} />
        </View>
        
        <View style={{ paddingBottom: 300, alignItems:'center'}}>
        <TouchableOpacity onPress={handleRegister} style={styles.registerButtonContainer}>
            <Text style={styles.registerButtonText}> Register </Text>
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
            borderRadius: 8,
            borderColor: "#000000",
            resizeBorder: 10,
            borderWidth: 0,
            paddingVertical: 8,
            paddingHorizontal: 65,
        },
        image: {
             paddingBottom: 500, alignItems:'center',
            resizeMode:  "contain",
        },
        input: {
            fontFamily: 'Poppins',
            flex:1,
            width: 300,
            height: 40,
            backgroundColor: '#fff',
            paddingVertical: 3,
            paddingLeft: 5,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
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