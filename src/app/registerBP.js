import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { images } from '../constants/images';
import ImageButton from '../components/ImageButton';

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
      <Image source={images.header} style={{position:"absolute", width:430, height:275}}/>
      <View style={{alignItems:'flex-start', width:"100%", paddingHorizontal:20}}>
        <ImageButton
          source={require("../assets/back.png")}
          imageSize={{width:24, height:24}}
          onPress={() => router.back('/welcomePage')}
        />
        <Text style={{fontFamily:"Poppins-Bold", fontSize: 24, paddingLeft: 25, paddingTop: 75, color: '#FAF5E1'}}>Business{'\n'}registration{'\n'}details</Text>
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
            <TextInput style={styles.input}  keyboardType="default" />
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
            <TextInput style={styles.input} secureTextEntry={true} />
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
            <TextInput style={styles.input} secureTextEntry={true} />
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
            <TextInput style={styles.input} secureTextEntry={true} />
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
            <TextInput style={styles.input} secureTextEntry={true} />
        </View>
        
        <View style={{ paddingBottom:10, alignItems:'center', paddingTop:50}}>
        <TouchableOpacity onPress={handleRegister} style={styles.registerButtonContainer}>
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