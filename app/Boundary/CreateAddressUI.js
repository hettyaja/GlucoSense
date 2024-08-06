import React, { useState } from 'react';
import Header from '../components/Header';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';

const CreateAddressUI = () => {
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNum] = useState('');
    const [postCode, setPostCode] = useState('');
    const [unit, setUnit] = useState('');
    const [details, setDetails] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errors = {};
        if (!name) errors.name = 'Enter your full name';
        if (!phoneNumber || phoneNumber.length !== 10) errors.phoneNumber = 'Enter a valid phone number';
        if (!postCode) errors.postCode = 'Enter a valid postcode';
        if (!address) errors.address = 'Enter a valid address';
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSave = () => {
        if (validate()) {
            Alert.alert('Validation', 'All inputs are valid');
            // Proceed with saving the address or other actions
        } else {
            console.log('Validation', 'Please correct the errors');
        }
    };

    return (
        <>
            <Header
                title='Add new address'
                leftButton='Back'
                onLeftButtonPress={() => router.back('')}
            />
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Contact information</Text>
                <View style={styles.item}>
                    <TextInput
                        style={styles.inputBox}
                        placeholder="First and last name"
                        onChangeText={setName}
                        autoCapitalize="words"
                        value={name}
                    />
                    <View style={{ borderBottomColor: errors.name ? 'red' : '#808080', borderBottomWidth: 0.5, marginHorizontal: 16 }} />
                    {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                    <TextInput
                        style={styles.inputBox}
                        placeholder="Phone number"
                        onChangeText={setPhoneNum}
                        keyboardType="numeric"
                        value={phoneNumber}
                    />
                    <View style={{ borderBottomColor: errors.phoneNumber ? 'red' : '#808080', borderBottomWidth: 0.5, marginHorizontal: 16 }} />
                    {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}
                </View>

                <Text style={styles.title}>Address information</Text>
                <View style={styles.item}>
                    <TextInput
                        style={styles.inputBox}
                        placeholder="Enter postcode"
                        onChangeText={setPostCode}
                        value={postCode}
                    />
                    <View style={{ borderBottomColor: errors.postCode ? 'red' : '#808080', borderBottomWidth: 0.5, marginHorizontal: 16 }} />
                    {errors.postCode && <Text style={styles.errorText}>{errors.postCode}</Text>}
                    <TextInput
                        style={styles.inputBox}
                        placeholder="Enter complete address for delivery"
                        onChangeText={setAddress}
                        value={address}
                    />
                    <View style={{ borderBottomColor: errors.address ? 'red' : '#808080', borderBottomWidth: 0.5, marginHorizontal: 16 }} />
                    {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
                    <TextInput
                        style={styles.inputBox}
                        placeholder="Enter unit or floor"
                        onChangeText={setUnit}
                        value={unit}
                    />
                    <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5, marginHorizontal: 16 }} />
                    <TextInput
                        style={styles.inputBox}
                        placeholder="Enter other details (optional)"
                        onChangeText={setDetails}
                        value={details}
                    />
                    <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5, marginHorizontal: 16 }} />
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default CreateAddressUI;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 6,
    },
    item: {
        backgroundColor: 'white',
    },
    title: {
        paddingHorizontal: 16,
        paddingTop: 16,
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
    },
    inputBox: {
        padding: 16,
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginHorizontal: 16,
        marginTop: 4,
    },
    footer: {
        bottom: 0,
        width: '100%',
        padding: 16,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    saveButton: {
        backgroundColor: '#E58B68',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveText: {
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        color: 'white',
    }
});
