import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Platform, Modal, Button, Image } from 'react-native'
import React, { useState } from 'react'
import { Stack, router } from 'expo-router'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useProfile } from './context/ProfileContext'
import ImageButton from '../components/ImageButton';
import { useAuth } from './context/authContext'

const Profile = () => {
    const { profileData, setProfileData } = useProfile();

    const [photoUri, setPhotoUri] = useState(profileData.photoUri);
    const [username, setUsername] = useState(profileData.username);
    const [name, setName] = useState(profileData.name);
    const [email, setEmail] = useState(profileData.email);
    const [birthdate, setBirthdate] = useState(new Date(profileData.birthdate));
    const [gender, setGender] = useState(profileData.gender);
    const [isEditable, setIsEditable] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showGenderPicker, setShowGenderPicker] = useState(false);

    const toggleEdit = () => {
        if (isEditable) {
            saveProfile();
        }
        setIsEditable(!isEditable);
    };

    const saveProfile = () => {
        setProfileData({ photoUri, username, name, email, birthdate, gender });
    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || birthdate;
        setBirthdate(currentDate);
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

    return (
        <>
        <Stack.Screen options={{
            title: 'Profile',
            headerStyle: { backgroundColor: '#E58B68' },
            headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold'},
            headerLeft: () => (
              <ImageButton
                source={require("../assets/back.png")}
                imageSize={{width:24, height:24}}
                onPress={() => router.back('/setting')}
              />
            ),
            headerRight: () => (
              <TouchableOpacity style={styles.button}
                onPress={toggleEdit}>
                <Text style={{fontFamily: 'Poppins-SemiBold', fontSize:14, color:'white'}}>
                  {isEditable ? 'Save' : 'Edit'}
                </Text>
              </TouchableOpacity>
            ),
            headerTitle: 'Profile',
            headerTitleAlign: 'center',
          }}/>

        <ScrollView style={styles.safeArea} keyboardShouldPersistTaps="handled">
            <TouchableOpacity style={{ alignItems: 'center', margin: 24 }} onPress={isEditable ? pickImage : null}>
                <Image style={styles.profileImage} source={{uri: photoUri}}/>
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
                            value={username}
                            onChangeText={setUsername}
                            editable={false} 
                        />
                </View>

                <View style={styles.item}>
                    <Text>Name</Text>
                    {isEditable ? (
                        <TextInput
                            style={styles.input}
                            placeholder='Enter your name'
                            value={name}
                            onChangeText={setName}
                            editable={isEditable}
                        />
                    ) : (
                        <Text style={styles.input}>{name}</Text>
                    )}   
                </View>

                <View style={styles.item}>
                    <Text>Email</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            editable={isEditable} 
                        />
                </View>    
            </View>
            
            {/* Section for user information */}
            <Text style={styles.sectionText}>USER INFORMATION</Text>
            <View style={styles.section}>

                {/* Birthdate field */}
                <View style={styles.item}>
                    <Text>Birthdate</Text>
                    {isEditable ? (
                        <DateTimePicker
                            value={birthdate}
                            mode="date"
                            display="default"
                            onChange={onDateChange}
                        />
                    ) : (
                        <Text style={styles.input}>{birthdate.toDateString()}</Text>
                    )}
                </View>

                <View style={styles.item}>
                    <Text>Gender</Text>
                    {isEditable ? (
                        <Picker
                            selectedValue={gender}
                            onValueChange={handleGenderChange}
                            style={styles.picker}
                            itemStyle={styles.pickerItem}
                        >
                            <Picker.Item label="Male" value="Male" />
                            <Picker.Item label="Female" value="Female" />
                        </Picker>
                    ) : (
                        <Text style={styles.input}>{gender}</Text>
                    )}
                </View>
            </View>
        </ScrollView>
        </>
    );
};
    
export default Profile

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    profileImage: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 100,
        width: 80,
        height: 80
    },
    changePhotoText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: '#E58B68',
        marginTop: 8
    },
    sectionText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 10,
        paddingLeft: 16,
        paddingTop: 24,
        paddingBottom: 4
    },
    section: {
        backgroundColor: 'white'
    },
    item: {
        borderBottomColor: '#d9d9d9',
        borderBottomWidth: 1,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#808080',
    },
    picker: {
        width: '40%'
    },
    pickerItem: {
        height:40,
        borderRadius:16
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