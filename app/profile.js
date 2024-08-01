import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Stack, router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useProfile } from './context/ProfileContext';
import ImageButton from './components/ImageButton';
import { useAuth } from './service/AuthContext';
import getProfileController from './Controller/getProfileController';
import setBodyProfileController from './Controller/SetBodyProfileController';
import setAccountProfileController from './Controller/SetAccountProfileController';
import setDiabetesTypeController from './Controller/setDiabetesTypeController';

const Profile = () => {
    const { profileData } = useProfile();
    const { user } = useAuth();
    const [photoUri, setPhotoUri] = useState(profileData?.photoUri || '');
    const [localUsername, setUsername] = useState('');
    const [localName, setName] = useState('');
    const [localEmail, setEmail] = useState('');
    const [localBirthdate, setBirthdate] = useState(profileData.birthdate ? new Date(profileData.birthdate) : null);
    const [localWeight, setWeight] = useState('');
    const [localHeight, setHeight] = useState('');
    const [localGender, setGender] = useState('');
    const [localDiabetesType, setDiabetesType] = useState('');
    const [isEditable, setIsEditable] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const maxBirthdate = new Date();
    maxBirthdate.setFullYear(maxBirthdate.getFullYear() - 10);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const profileData = await getProfileController.getProfile(user.uid);
                console.log('Profile Data:', profileData);


                const birthdateTimestamp = profileData.birthdate;
                console.log('Raw Birthdate Timestamp:', birthdateTimestamp);


                // Convert Firebase timestamp to JavaScript Date
                const birthdate = birthdateTimestamp
                    ? new Date(birthdateTimestamp.seconds * 1000)
                    : new Date();
                console.log('Converted Birthdate:', birthdate);


                // Check if the converted date is valid
                const isValidDate = !isNaN(birthdate.getTime());
                console.log('Is Valid Date:', isValidDate);


                // Set the state with a valid date
                setBirthdate(isValidDate ? birthdate : new Date());


                // Set other profile data
                setUsername(profileData.username);
                setName(profileData.name);
                setEmail(profileData.email);
                setWeight(profileData.weight);
                setHeight(profileData.height);
                setGender(profileData.gender);
            setDiabetesType(profileData.diabetesType);
            } catch (error) {
                console.error(error);
            }
        };


        if (user.uid) {
            getProfile();
        }
    }, [user.uid]);

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
                await setAccountProfileController.setAccProfile(user.uid, localName, localEmail, localUsername);
                await setBodyProfileController.setBodProfile(user.uid, localGender, localBirthdate, localWeight, localHeight, localDiabetesType);
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
                        source={require("./assets/back.png")}
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

                <Text style={styles.sectionText}>ACCOUNT DETAILS</Text>
                <View style={styles.section}>
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
                        <TextInput
                            style={styles.input}
                            value={localName}
                            onChangeText={setName}
                            editable={isEditable}
                        />
                    </View>

                    <View style={styles.item}>
                        <Text>Email</Text>
                        <Text style={styles.input}>{localEmail}</Text>
                    </View>
                </View>

                <Text style={styles.sectionText}>USER INFORMATION</Text>
                <View style={styles.section}>
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
                                        maximumDate={maxBirthdate}
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
                        <Text>Height</Text>
                        {isEditable ? (
                            <TextInput
                                style={styles.input}
                                value={localHeight}
                                onChangeText={setHeight}
                                editable={isEditable}
                            />
                        ) : (
                            <Text style={styles.input}>{localHeight}</Text>
                        )}
                    </View>

                    <View style={styles.item}>
                        <Text>Gender</Text>
                        {isEditable ? (
                            <Picker
                                selectedValue={localGender}
                                onValueChange={setGender}
                                style={styles.picker}
                            >
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                            </Picker>
                        ) : (
                            <Text style={styles.input}>{localGender}</Text>
                        )}
                    </View>

                    <View style={styles.item}>
                        <Text>Diabetes Type</Text>
                        {isEditable ? (
                            <Picker
                                selectedValue={localDiabetesType}
                                onValueChange={setDiabetesType}
                                style={styles.picker}
                            >
                                <Picker.Item label="Type 1" value="Type1" />
                                <Picker.Item label="Type 2" value="Type2" />
                                <Picker.Item label="Gestational" value="Gestational" />
                                <Picker.Item label="Pre Diabetes" value="PreDiabetes" />
                                <Picker.Item label="Not Sure" value="NotSure" />
                            </Picker>
                        ) : (
                            <Text style={styles.input}>{localDiabetesType}</Text>
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
        color: 'blue',
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
        width: '50%',

    },
});