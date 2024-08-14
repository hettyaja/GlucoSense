import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const BottomSheetModal = ({ isVisible, onClose }) => {
  const [currentSection, setCurrentSection] = useState('Diary');

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      backdropOpacity={0.2}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Add your diary</Text>
        </View>

        <View style={styles.content}>
              <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.button} onPress={() => router.push({pathname: 'Boundary/AddGlucoseUI', query: onClose()})}>
                  <FontAwesome name="tint" size={24} color="#000" />
                  <Text style={styles.buttonText}>Glucose</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => router.push({pathname: 'Boundary/AddMealsUI', query: onClose()})}>
                  <FontAwesome name="cutlery" size={24} color="#000" />
                  <Text style={styles.buttonText}>Meals</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => router.push({pathname: 'Boundary/addMeds', query: onClose()})}>
                  <FontAwesome5 name="pills" size={24} color="#000" />
                  <Text style={styles.buttonText}>Meds</Text>
                </TouchableOpacity>
              </View>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    
  },
  modalContent: {
    backgroundColor: 'white',
    height: 200,
    width: '100%',
    borderTopLeftRadius:16,
    borderTopRightRadius:16
  },
  header: {
    backgroundColor:'#E58B68',
    padding:16,
    justifyContent:'center',
    alignItems:'center',
    borderTopLeftRadius:16,
    borderTopRightRadius:16
  },
  headerText: {
    fontFamily: 'Poppins-Bold',
    fontSize:18,
    color:'white'
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection:'row',
    padding:16,
  },
  button: {
    paddingVertical:16,
    paddingHorizontal:32,
    alignItems:'center'
  },
  buttonText: {
    fontFamily: 'Poppins-Regular',
    fontSize:14
  }
});

export default BottomSheetModal;
