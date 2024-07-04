import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import React, { useState } from 'react';

const preReg = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedValue, setSelectedValue] = useState("Breakfast");
  const [modalVisible, setModalVisible] = useState(false);

  const handleButtonPress = (buttonIndex) => {
    setSelectedButton(buttonIndex === selectedButton ? null : buttonIndex);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={{ flex: 3, backgroundColor: "#f5f5f5" }}>
      <View style={{ backgroundColor: "#E58B68" }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50 }}>
          <Text style={{ color: 'white', fontFamily: 'Poppins-Bold', fontSize: 16, flex: 1, textAlign: 'center', marginBottom: 10 }}>Diary</Text>
        </View>
      </View>
      <View style={styles.container1}>
        <View style={{ marginLeft: 35, backgroundColor: '#f1f1f1', width: 250, borderRadius: 8, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
          <TextInput
            style={{ fontFamily: 'Poppins-Medium', fontSize: 12, flex: 1 }}
            placeholder="Search Diary"
            placeholderTextColor="#808080"
          />
        </View>
        <TouchableOpacity onPress={toggleModal}>
          <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, marginLeft: 50 }}>Photo</Text>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: 'white', marginVertical: 20, marginHorizontal: 30, elevation: 3, width: 350, height: 300, alignSelf: 'center', borderRadius: 8, alignItems: 'center' }}>
        <View style={{ backgroundColor: '#D9D9D9', width: 90, height: 90, marginTop: 50 }}></View>
        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 16, marginTop: 20 }}>Add food and drink</Text>
        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, marginTop: 20 }}>Search using keyword or take/upload a photo</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <View style={styles.modalPlaceholder} />
            <Text style={styles.modalTitle}>Take or upload a photo</Text>
            <Text style={styles.modalDescription}>Take or upload a photo of your food or drink</Text>
            <TouchableOpacity>
              <Text style={styles.uploadPhoto}>Upload a photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.takePhotoButton}>
              <Text style={styles.takePhotoButtonText}>Take a photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: "#ffffff",
    width: 160,
    height: 70,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: 10,
  },
  selectedButton: {
    backgroundColor: '#FAF5E1',
    borderColor: '#E58B68',
  },
  buttonText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    textAlign: 'center',
    color: 'black',
  },
  saveButtonContainer: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 3,
    paddingLeft: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  container1: {
    backgroundColor: 'white',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#808080',
    alignItems: 'center',
    flexDirection: 'row',
  },
  picker: {
    fontFamily: 'Poppins-Regular',
    width: '50%',
    marginLeft: 220,
    color: '#808080',
  },
  pickerItem: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  shadow: {
    elevation: 3,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add this line for darker background
  },
  modalContent: {
    width: '100%',
    height: '60%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#000',
  },
  modalPlaceholder: {
    backgroundColor: '#D9D9D9',
    width: 150,
    height: 150,
    marginBottom: 30,
    marginTop: 20,
  },
  modalTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    marginBottom: 10,
  },
  modalDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  uploadPhoto: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#0044CC',
    marginBottom: 20,
  },
  takePhotoButton: {
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#D96B41',
    padding: 10,
    borderRadius: 8,
    height: 42,
    width: 164,
  },
  takePhotoButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default preReg;
