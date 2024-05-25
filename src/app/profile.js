// profile.js
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Platform, Modal, Button, Image } from 'react-native'
import React, { useState } from 'react'
import { Stack, router } from 'expo-router'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useProfile } from './context/ProfileContext'
import ImageButton from '../components/ImageButton';

const Profile = () => {
    // const { name } = useGlobalSearchParams();

    const { profileData, setProfileData } = useProfile();

    const [photoUri, setPhotoUri] = useState(profileData.photoUri);
    const [username, setUsername] = useState(profileData.username);
    const [name, setName] = useState(profileData.name);
    const [email, setEmail] = useState(profileData.email);
    
    const [isEditable, setIsEditable] = useState(false)
    const [birthdate, setBirthdate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showGenderPicker, setShowGenderPicker] = useState(false);
    const [gender, setGender] = useState();

    
    const toggleEdit = () => {
       // alert('hi')
       setIsEditable(!isEditable);
    };

    // const onDateChange = (event, selectedDate) => {
    //     if (Platform.OS === 'android') {
    //         setShowDatePicker(false);
    //     }
    //     if (selectedDate) {
    //         setBirthdate(selectedDate);
    //     }
    // };

    //Heti added
    const saveChanges = () =>{
        setIsEditable(false);
    };

    const showDatePickerModal = () => {
        setShowDatePicker(true);
    };
    
    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || birthdate;
        setBirthdate(currentDate);
    };

    const onChangeTextHandler = (text) => {
        setName(text);
    };
    
    
    const handleGenderChange = (selectedGender) => {
        setGender(selectedGender);
        setShowGenderPicker(false);
    };

    const saveProfile = () => {
        setProfileData({ photoUri, username, name, email});
        router.back('/(tabsBP)/settingBP');
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
                onPress={() => router.back('/setting')} //Perbaiki 
              />
            ),
            headerRight: () => (
              <TouchableOpacity style={styles.button}
                onPress={saveProfile}>
                <Text style={{fontFamily: 'Poppins-SemiBold', fontSize:14, color:'white'}}>Save</Text>
              </TouchableOpacity>
            ),
            headerTitle: 'Edit profile',
            headerTitleAlign: 'center',
          }}/>

        <ScrollView style={styles.safeArea} keyboardShouldPersistTaps="handled">
            <TouchableOpacity style={{ alignItems: 'center', margin: 24 }} >
                <Image style={styles.profileImage} source={{uri: photoUri}}/>
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
                            editable={isEditable} 
                        />
                </View>

                <View style={styles.item}>
                    <Text>Name</Text>
                    {isEditable ?(
                        <TextInput
                            style={styles.input}
                            placeholder='Enter your name'
                            value={name}
                            onChangeText={onChangeTextHandler}
                            editable={isEditable}
                        />
                    ) : (
                        <Text style={styles.input}>{name}</Text>
                    
                    )}   
                </View>

                <View style={styles.item}>
                    <Text> Email </Text>
                        <TextInput
                            style={styles.input}
                            value={email}
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
                        <TouchableOpacity onPress={toggleEdit}>
                            <DateTimePicker
                                value={birthdate}
                                mode="date"
                                display="default"
                                onChange={onDateChange}
                            />
                        </TouchableOpacity>
                    ) : (
                        <Text style={styles.input}>{birthdate.toDateString()}</Text>
                    )}
                </View>

                <View style={styles.item}>
                    <Text>Gender</Text>
                    {isEditable?(
                        <Picker
                        selectedValue={gender}
                        onValueChange={handleGenderChange}
                        style={styles.picker}
                    >
                        <Picker.Item label="Male" value="Male" />
                        <Picker.Item label="Female" value="Female" />
                    </Picker>

                    ):(
                        <Text style={styles.input}>{gender}</Text>
                    )}
                    
                </View>


                


              
                
            </View>
            
            {/* Button to toggle between edit mode and view mode */}
            <TouchableOpacity onPress={isEditable ? saveChanges : toggleEdit}>
                <Text>{isEditable ? "Save" : "Edit"}</Text>
            </TouchableOpacity>
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
        width: '100%',
    },
    // modalContainer: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // },
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
