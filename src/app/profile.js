// profile.js
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const profile = () => {
    const { name } = useLocalSearchParams();
  return (
    <ScrollView style={styles.safeArea}>
        <TouchableOpacity style={{alignItems:'center', margin:24}}>
            <View style={styles.profileImage}> 
            </View>
        </TouchableOpacity>
        <Text style={styles.sectionText}>ACCOUNT DETAILS</Text>
        <View style={styles.section}>
            <View style={styles.item}>
                <Text>Username</Text>
                <TextInput defaultValue={name}/>
            </View>
            <View style={styles.item}>
                <Text>Name</Text>
                <TextInput defaultValue={name}/>
            </View>
            <View style={styles.item}>
                <Text>Email</Text>
                <TextInput defaultValue={name}/>
            </View>
        </View>
        <Text style={styles.sectionText}>USER INFORMATION</Text>
        <View style={styles.section}>
            <View style={styles.item}>
                <Text>Select Birthdate</Text>
                <TextInput defaultValue={name}/>
            </View>
            <View style={styles.item}>
                <Text>Gender</Text>
                <TextInput defaultValue={name}/>
            </View>
            <View style={styles.item}>
                <Text>Weight</Text>
                <TextInput defaultValue={name}/>
            </View>
        </View>

    </ScrollView>
  )
}

export default profile

const styles = StyleSheet.create({
    safeArea: {
        flex:1,
        backgroundColor:'#f5f5f5'
    },
    profileImage: {
        borderWidth:1,
        borderColor:'black',
        borderRadius:100,
        width:80,
        height:80
    },
    sectionText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize:10,
        paddingLeft:16,
        paddingTop:24,
        paddingBottom:4
    },
    section: {
        backgroundColor:'white'
    },
    item: {
        borderBottomColor:'#d9d9d9',
        borderBottomWidth:1,
        padding:16,
        flexDirection:'row',
        justifyContent:'space-between'
    }
})