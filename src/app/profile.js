// profile.js
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Platform, Modal, Button } from 'react-native'
import React, { useState } from 'react'
import { useGlobalSearchParams } from 'expo-router'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const Profile = () => {
    const { name } = useGlobalSearchParams();
    const [isEditable, setIsEditable] = useState(false)
    const [birthdate, setBirthdate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showGenderPicker, setShowGenderPicker] = useState(false);
    const [gender, setGender] = useState('Male');

    const toggleEdit = () => {
        alert('hi')
    };

    const onDateChange = (event, selectedDate) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }
        if (selectedDate) {
            setBirthdate(selectedDate);
        }
    };

    const showDatePickerModal = () => {
        setShowDatePicker(true);
    };

    const handleGenderChange = (selectedGender) => {
        setGender(selectedGender);
        setShowGenderPicker(false);
    };

    return (
        <ScrollView style={styles.safeArea}>
            <TouchableOpacity style={{ alignItems: 'center', margin: 24 }} >
                <View style={styles.profileImage}>
                </View>
            </TouchableOpacity>
            <Text style={styles.sectionText}>ACCOUNT DETAILS</Text>
            <View style={styles.section}>
                <View style={styles.item}>
                    <Text>Username</Text>
                    <TextInput style={styles.input} defaultValue={'Jon'} editable={isEditable} />
                </View>
                <View style={styles.item}>
                    <Text>Name</Text>
                    <TextInput style={styles.input} defaultValue={'name'} />
                </View>
                <View style={styles.item}>
                    <Text>Email</Text>
                    <TextInput style={styles.input} defaultValue={name} />
                </View>
            </View>
            <Text style={styles.sectionText}>USER INFORMATION</Text>
            <View style={styles.section}>
                <View style={styles.item}>
                    <Text>Birthdate</Text>
                    <TouchableOpacity onPress={showDatePickerModal}>
                        <TextInput
                            style={styles.input}
                            value={birthdate.toDateString()}
                            editable={false}
                        />
                    </TouchableOpacity>
                    {showDatePicker && Platform.OS === 'ios' && (
                        <Modal
                            transparent={true}
                            animationType="slide"
                            visible={showDatePicker}
                            onRequestClose={() => setShowDatePicker(false)}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.pickerContainer}>
                                    <DateTimePicker
                                        value={birthdate}
                                        mode="date"
                                        display="default"
                                        onChange={onDateChange}
                                    />
                                    <Button title="Done" onPress={() => setShowDatePicker(false)} />
                                </View>
                            </View>
                        </Modal>
                    )}
                    {showDatePicker && Platform.OS === 'android' && (
                        <DateTimePicker
                            value={birthdate}
                            mode="date"
                            display="default"
                            onChange={onDateChange}
                        />
                    )}
                </View>
                <View style={styles.item}>
                    <Text>Gender</Text>
                    <TouchableOpacity onPress={() => setShowGenderPicker(true)}>
                        <TextInput
                            style={styles.input}
                            value={gender}
                            editable={false}
                        />
                    </TouchableOpacity>
                    <Modal
                        transparent={true}
                        visible={showGenderPicker}
                        animationType="slide"
                        onRequestClose={() => setShowGenderPicker(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.pickerContainer}>
                                <Text style={styles.pickerTitle}>Select gender</Text>
                                <Picker
                                    selectedValue={gender}
                                    style={styles.picker}
                                    onValueChange={(itemValue) => handleGenderChange(itemValue)}
                                >
                                    <Picker.Item label="Male" value="Male" />
                                    <Picker.Item label="Female" value="Female" />
                                </Picker>
                                <Button title="Done" onPress={() => setShowGenderPicker(false)} />
                            </View>
                        </View>
                    </Modal>
                </View>
                <View style={styles.item}>
                    <Text>Weight</Text>
                    <TextInput style={styles.input} defaultValue={'50'} />
                </View>
            </View>
        </ScrollView>
    )
}

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
        color: '#808080'
    },
    picker: {
        width: '100%',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
