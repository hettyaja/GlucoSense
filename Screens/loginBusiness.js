import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
//import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons or another icon library

//import LoginPageBackground from '.../.../ ';
//const image = {uri: 'https://www.figma.com/file/81VSHMByukPMHkt0NWPm1z/Untitled?type=design&node-id=8%3A2&mode=design&t=chxWX4diUoWXY6Na-1.png'};

const loginBusiness= () => {
    return (
    
    <SafeAreaView style={styles.safeArea}>
       {/* <TouchableOpacity onPress={() => {}} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity> */}
         <View style={styles.image}>
         <Image source={require('./Image/logo.png')} />
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
            fontWeight: "bold"
            }}>
            Password
        </Text>
        <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection:'row', paddingBottom:2, marginBottom:15}}>
            <TextInput style={styles.input} placeholder= 'Enter your password'  secureTextEntry={true} />
        </View>
  <View style={{ alignItems:'flex-end',flexDirection:'row', marginBottom: 5, justifyContent: 'flex-end'}}>
        
        <Text style={{ fontSize: 16, alignItems:'flex-end', textAlign: 'flex-end', marginTop: 1, fontWeight: "bold",}}> Forgot your password?
        </Text>
        </View>
     
        
      
        
        <View style={{alignItems:'center'}}>
    <TouchableOpacity onPress={() => {}} style={[styles.loginButtonContainer, { marginTop: 130 }]}>
        <Text style={styles.loginButtonText} > Login</Text>
    </TouchableOpacity>
</View>

        
        <View style={{ alignItems:'center',flexDirection:'row', marginBottom: 5, justifyContent: 'center'}}>
        
        <Text style={{ fontSize: 16, alignItems:'center', textAlign: 'center', marginTop: 20, fontWeight: "bold"}}> Don't have an account? 
        </Text>
        </View>
        
        <View style={{ alignItems:'center'}}>
        <TouchableOpacity onPress={() => {}}>
            <Text style={{ fontFamily: 'Roboto', fontSize: 17, paddingBottom: 35, color: '#077167', marginTop: 15, marginBottom: 35, justifyContent: 'center', textAlign: 'center', fontWeight: 'bold'}}> Sign up </Text>
        </TouchableOpacity>
        
        </View>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: 1,
    safeArea: {flex: 1, justifyContent: 'center'},
    loginButtonContainer: {
        elevation: 6,
        backgroundColor: "#00BFFF",
        borderRadius: 12,
        borderColor: "#000000",
        resizeBorder: 10,
        borderWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 30
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
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
        fontSize: 16,
    },
    loginButtonText: {
        fontSize: 18,
        color: "#FAF5E1",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    //previousButtonContainer: {
        ///elevation: 6,
        //backgroundColor: "#E58B68",
        //borderRadius: 60,
        //resizeBorder: 10,
        //paddingVertical: 8,
        //paddingHorizontal: 30
    //},
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
    },
});

export default loginBusiness;
