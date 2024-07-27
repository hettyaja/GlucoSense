import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { router } from 'expo-router';
import RegisterUserController from '../../Controller/RegisterUserController';
import Header from '../../components/Header';

const RegisterUserUI = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async () => {
        try {
            const additionalData = { username, name };
            await RegisterUserController.register(email, password, confirmPassword, additionalData);
        } catch (error) {
            alert(error.message);
        }
    };

    const renderInputField = (label, value, onChangeText, secureTextEntry = false) => (
        <>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    secureTextEntry={secureTextEntry}
                    value={value}
                    onChangeText={onChangeText}
                />
            </View>
        </>
    );

    return (
        <>
            <Header
                title='Register'
                leftButton='Back'
                onLeftButtonPress={() => router.back()}
            />
            <ScrollView style={styles.safeArea}>
                <View style={styles.formContainer}>
                    {renderInputField('Username', username, setUsername)}
                    {renderInputField('Name', name, setName)}
                    {renderInputField('Email', email, setEmail)}
                    {renderInputField('Password', password, setPassword, true)}
                    {renderInputField('Confirm Password', confirmPassword, setConfirmPassword, true)}
                </View>
                <TouchableOpacity onPress={handleSignUp} style={styles.registerButtonContainer}>
                    <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
                <View style={styles.loginPrompt}>
                    <Text style={styles.loginText}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => {}}>
                        <Text style={styles.loginLink}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    formContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
        flex: 1,
    },
    label: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        paddingLeft: 4,
        paddingBottom: 4,
    },
    inputContainer: {
        paddingBottom: 16,
    },
    input: {
        fontFamily: 'Poppins-Regular',
        width: '100%',
        height: 40,
        backgroundColor: '#fff',
        paddingVertical: 4,
        paddingLeft: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        fontSize: 12,
    },
    registerButtonContainer: {
        backgroundColor: "#E58B68",
        width: '50%',
        borderRadius: 8,
        padding: 8,
        marginVertical: 24,
        alignSelf: 'center',
    },
    registerButtonText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: "white",
        alignSelf: 'center',
        
    },
    loginPrompt: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom:40
    },
    loginText: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
    },
    loginLink: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        color: '#0044CC',
        paddingLeft: 4,
        textAlign: 'center',
    }
});

export default RegisterUserUI;
