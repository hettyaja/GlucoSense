import React from 'react';
import { Button, StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';

//import LoginPageBackground from '.../.../ ';

const FreemiumRegister= () => {
    return (
    
    <SafeAreaView style={{flex: 2, justifyContent: 'Right'}}>
    <Button
        title="Left button"
        onPress={() => Alert.alert('Left button pressed')}
    />
        <View style={{flexDirection:'row', borderBottomColor:'#ccc', borderBottomWidth:1, paddingBottom:2, marginTop: 110, marginBottom: 50}}>
        <Text style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 20,
            fontWeight: '500',
            color: '#333',
            marginBottom: 10,
            }}> Business registration details
        </Text>
        </View>

        <Text style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 20,
            fontWeight: '500',
            color: '#333',
            marginBottom: 15,
            }}>
            Entity Name
        </Text>
        <View style={{flexDirection:'row', borderBottomColor:'#ccc', borderBottomWidth:1, paddingBottom:2, marginBottom:25}}>
            <TextInput placeholder= 'Enter your username' style={{flex: 1, paddingVertical: 0}} keyboardType="default" />
        </View>

        <Text style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 20,
            fontWeight: '500',
            color: '#333',
            marginBottom: 15,
            }}>
            Unique Entity Number (UEN)
        </Text>
        <View style={{flexDirection:'row', borderBottomColor:'#ccc', borderBottomWidth:1, paddingBottom:2, marginBottom:25}}>
            <TextInput placeholder= 'Enter your password' style={{flex: 1, paddingVertical: 0}} keyboardType="default" />
        </View>

        <Text style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 20,
            fontWeight: '500',
            color: '#333',
            marginBottom: 15,
            }}>
            Contract Signee Name
        </Text>
        <View style={{flexDirection:'row', borderBottomColor:'#ccc', borderBottomWidth:1, paddingBottom:2, marginBottom:25}}>
            <TextInput placeholder= 'Enter your username' style={{flex: 1, paddingVertical: 0}} keyboardType="default" />
        </View>

        <Text style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 20,
            fontWeight: '500',
            color: '#333',
            marginBottom: 15,
            }}>
            Contract Signee NRIC
        </Text>
        <View style={{flexDirection:'row', borderBottomColor:'#ccc', borderBottomWidth:1, paddingBottom:2, marginBottom:25}}>
            <TextInput placeholder= 'Enter your password' style={{flex: 1, paddingVertical: 0}} keyboardType="default" />
        </View>

        <Text style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 20,
            fontWeight: '500',
            color: '#333',
            marginBottom: 15,
            }}>
            Password
        </Text>
        <View style={{flexDirection:'row', borderBottomColor:'#ccc', borderBottomWidth:1, paddingBottom:2, marginBottom: 15}}>
            <TextInput placeholder= 'Enter your password' style={{flex: 1, paddingVertical: 0}} secureTextEntry={true} />
        </View>

        <Text style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 20,
            fontWeight: '500',
            color: '#333',
            marginBottom: 15,
            }}>
            Password
        </Text>
        <View style={{flexDirection:'row', borderBottomColor:'#ccc', borderBottomWidth:1, paddingBottom:2, marginBottom: 15}}>
            <TextInput placeholder= 'Enter your password' style={{flex: 1, paddingVertical: 0}} secureTextEntry={true} />
        </View>
        
        <View>
            <Button style={styles.ButtonContainer} title="Register" onPress={() => {}}/>
        </View>
        
        <TouchableOpacity onPress={onPress} style={styles.registerButtonContainer}>
            <Text style={styles.registerButtonText}> Register </Text>
        </TouchableOpacity>
    </SafeAreaView>
    );
};

    const styles = StyleSheet.create({
        registerButtonContainer: {
            elevation: 8,
            backgroundColor: "#009688",
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 12
        },
        registerButtonText: {
            fontSize: 18,
            color: "#fff",
            fontWeight: "bold",
            alignSelf: "center",
            textTransform: "uppercase"
        }
});


export default FreemiumRegister;