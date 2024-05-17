import React, { useState } from 'react';
import { TextInput, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';

const ReportProblem = () => {
  const handleSubmit = () => {
        // handle submit
        console.log('Submit button pressed');
        };
  return (
    <SafeAreaView style={styles.safeArea}>
    <Image  style={{position:"absolute", width: 1000}}
        source={require('./image/view(2).png')}/>
      <View  style={{
        flex:1,
        flexDirection: 'row'}}>
        <TouchableOpacity onPress={() =>{}} style={{ position:"absolute", alignItems: 'left', right: 295, top: 60}}>
        <Image 
        source={require('./image/back(3).png')}/>
        </TouchableOpacity>
      </View>
      <View style={{ fontFamily: 'Poppins'}}>
      <Text style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginLeft: 120, top: 40, fontSize: 17, fontWeight: 'bold', color:'#FFFFFF'}}>Report Problem
      </Text>
      </View>

    <View style={{ paddingLeft:5 }}>
    <Text style={{
    
            fontSize: 15,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 5,
            fontWeight: 'bold',
            paddingTop: 90 
            }}>
            Name
      </Text>

        <View style={{ paddingLeft: 5, paddingRight: 10, flexDirection:'row', paddingBottom:2, marginBottom: 15}}>
            <TextInput style={styles.input}  keyboardType="default" />
        </View>
        <Text style={{
            fontSize: 15,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 5,
            fontWeight: 'bold'
            }}>
            Email
        </Text>
        <View style={{ paddingLeft: 5, paddingRight: 10, flexDirection:'row', paddingBottom:2, marginBottom: 15}}>
            <TextInput style={styles.input}  keyboardType="email-address" />
        </View>
        <Text style={{
            fontSize: 15,
            fontWeight: '500',
            color: '#333',
            paddingLeft: 5,
            fontWeight: 'bold'
            }}>
            Feedback or problem
        </Text>
        <View style={{ paddingLeft: 5, paddingRight: 10, flexDirection:'row', paddingBottom:2, marginBottom: 50}}>
            <TextInput style={styles.feedback}  keyboardType="email-address" />
        </View>

       <View style={{ fontFamily: 'Poppins', paddingBottom: 200, alignItems:'center'}}>
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButtonContainer}>
            <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
        </View>
    </View>
    </SafeAreaView>
  );
};





const styles = StyleSheet.create({
    safeArea: { flex: 1 },
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
    feedback: {
            fontFamily: 'Poppins',
            flex:1,
            width: 300,
            height: 120,
            backgroundColor: '#fff',
            paddingVertical: 3,
            paddingLeft: 5,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            fontSize: 16
        },
    submitButtonText: {
            fontSize: 18,
            color: "#FAF5E1",
            fontWeight: "bold",
            alignSelf: 'center',
            alignItems:'center'
        },
    submitButtonContainer: {
            elevation: 5,
            backgroundColor: "#E58B68",
            borderRadius: 8,
            borderColor: "#000000",
            resizeBorder: 10,
            borderWidth: 0,
            paddingVertical: 8,
            paddingHorizontal: 65,
        }
});

export default ReportProblem;
