import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, Modal, Button, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Stack, router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useProfile } from './context/ProfileContext';
import ImageButton from '../components/ImageButton';
import { useAuth } from './context/authContext';

const Profile = () => {
    const { setAccountProfile, setBodyProfile, name, email, username, weight, gender, birthdate } = useAuth();
    const { profileData, setProfileData } = useProfile();
    const { user } = useAuth()
    const uid = user.uid
    const [localName, setName] = useState(name);
    const [photoUri, setPhotoUri] = useState(profileData?.photoUri || '');
    const [localUsername, setUsername] = useState(username);
    const [localEmail] = useState(email);
    const [localBirthdate, setBirthdate] = useState(birthdate ? new Date(birthdate) : new Date());
    const [localWeight, setWeight] = useState(weight);
    const [localGender, setGender] = useState(gender);
    const [isEditable, setIsEditable] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showGenderPicker, setShowGenderPicker] = useState(false);
    const [localGenderVisible, setLocalGenderVisible] = useState(true);

    useEffect(() => {
    }, []);

    const toggleEdit = async () => {
        
        if (isEditable) {
            if (!localName) {
                Alert.alert("Empty Field", "Name cannot be empty.");
                return;
            } else if (!localUsername) {
                Alert.alert("Empty Field", "Username cannot be empty.");
                return;
            }
            try {
                await setAccountProfile(uid, localName, localEmail, localUsername);
                await setBodyProfile(uid, localGender, localBirthdate, localWeight);
            } catch (error) {
                alert(error.message);
            }
        }
        setIsEditable(!isEditable);
    };

    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setBirthdate(selectedDate);
        }
    };

    const handleGenderChange = (selectedGender) => {
        setGender(selectedGender);
        setShowGenderPicker(false);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setPhotoUri(result.assets[0].uri);
        }
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        });
    };

    return (
        <>
            <Stack.Screen options={{
                title: 'Profile',
                headerStyle: { backgroundColor: '#E58B68' },
                headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold' },
                headerLeft: () => (
                    <ImageButton
                        source={require("../assets/back.png")}
                        imageSize={{ width: 24, height: 24 }}
                        onPress={() => router.back('/setting')}
                    />
                ),
                headerRight: () => (
                    <TouchableOpacity style={styles.button} onPress={toggleEdit}>
                        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 14, color: 'white' }}>
                            {isEditable ? 'Save' : 'Edit'}
                        </Text>
                    </TouchableOpacity>
                ),
                headerTitle: 'Profile',
                headerTitleAlign: 'center',
            }} />

            <ScrollView style={styles.safeArea} keyboardShouldPersistTaps="handled">
                <TouchableOpacity style={{ alignItems: 'center', margin: 24 }} onPress={isEditable ? pickImage : null}>
                    <Image style={styles.profileImage} source={{ uri: photoUri }} />
                    {isEditable && <Text style={styles.changePhotoText}>Change Photo</Text>}
                </TouchableOpacity>

                {/* Section for account details */}
                <Text style={styles.sectionText}>ACCOUNT DETAILS</Text>
                <View style={styles.section}>
                    {/* Username field */}
                    <View style={styles.item}>
                        <Text>Username</Text>
                        <TextInput
                            style={styles.input}
                            value={localUsername}
                            onChangeText={setUsername}
                            editable={isEditable}
                        />
                    </View>

                    <View style={styles.item}>
                        <Text>Name</Text>
                        {isEditable ? (
                            <TextInput
                                style={styles.input}
                                value={localName}
                                onChangeText={setName}
                                editable={isEditable}
                            />
                        ) : (
                            <Text style={styles.input}>{name}</Text>
                        )}
                    </View>

                    <View style={styles.item}>
                        <Text>Email</Text>
                        <Text style={styles.input}>{localEmail}</Text>
                    </View>
                </View>

                {/* Section for user information */}
                <Text style={styles.sectionText}>USER INFORMATION</Text>
                <View style={styles.section}>

                    {/* Birthdate field */}
                    <View style={styles.item}>
                        <Text>Birthdate</Text>
                        {isEditable ? (
                            <>
                                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                    <Text style={styles.input}>{formatDate(localBirthdate)}</Text>
                                </TouchableOpacity>
                                {showDatePicker && (
                                    <DateTimePicker
                                        value={localBirthdate}
                                        mode="date"
                                        display="default"
                                        onChange={onDateChange}
                                    />
                                )}
                            </>
                        ) : (
                            <Text style={styles.input}>{formatDate(localBirthdate)}</Text>
                        )}
                    </View>

                    <View style={styles.item}>
                        <Text>Weight</Text>
                        {isEditable ? (
                            <TextInput
                                style={styles.input}
                                value={localWeight}
                                onChangeText={setWeight}
                                editable={isEditable}
                            />
                        ) : (
                            <Text style={styles.input}>{localWeight}</Text>
                        )}
                    </View>

                    <View style={styles.item}>
                        <Text>Gender</Text>
                        {isEditable ? (
                            <>
                                <TouchableOpacity onPress={() => {
                                    setShowGenderPicker(true);
                                    setLocalGenderVisible(false);
                                }}>
                                    {localGenderVisible && <Text style={styles.input}>{localGender}</Text>}
                                </TouchableOpacity>
                                {showGenderPicker && (
                                    <Picker
                                        selectedValue={localGender}
                                        onValueChange={(itemValue) => {
                                            setGender(itemValue);
                                            setShowGenderPicker(false);
                                            setLocalGenderVisible(true);
                                        }}
                                        style={styles.picker}
                                        itemStyle={styles.pickerItem}
                                    >
                                        <Picker.Item label="Male" value="Male" />
                                        <Picker.Item label="Female" value="Female" />
                                    </Picker>
                                )}
                            </>
                        ) : (
                            <Text style={styles.input}>{gender}</Text>
                        )}
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

export default Profile;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    profileImage: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 100,
        width: 80,
        height: 80,
    },
    changePhotoText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: '#E58B68',
        marginTop: 8,
    },
    sectionText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 10,
        paddingLeft: 16,
        paddingTop: 24,
        paddingBottom: 4,
    },
    section: {
        backgroundColor: 'white',
    },
    item: {
        borderBottomColor: '#d9d9d9',
        borderBottomWidth: 1,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#808080',
    },
    picker: {
        width: '40%',
    },
    pickerItem: {
        height: 40,
        borderRadius: 16,
    },
    pickerContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 300,
        alignItems: 'center',
        padding: 20,
    },
    pickerTitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        marginBottom: 10,
    },
});
