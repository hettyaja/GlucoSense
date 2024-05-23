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
          <TouchableOpacity onPress={() => setCurrentSection('Diary')} style={[styles.section, currentSection === 'Diary' && styles.activeSection]}>
            <Text style={[styles.headerText, currentSection === 'Diary' && styles.activeTab]}>Diary</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentSection('Reminder')} style={[styles.section, currentSection === 'Reminder' && styles.activeSection]}>
            <Text style={[styles.headerText, currentSection === 'Reminder' && styles.activeTab]}>Reminder</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {currentSection === 'Diary' ? (
            <>
              <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.button}>
                  <FontAwesome name="tint" size={24} color="#000" />
                  <Text style={styles.buttonText}>Glucose</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => router.push({pathname: '/addDiary', query: onClose()})}>
                  <FontAwesome name="cutlery" size={24} color="#000" />
                  <Text style={styles.buttonText}>Meals</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <FontAwesome5 name="pills" size={24} color="#000" />
                  <Text style={styles.buttonText}>Meds</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
            <View style={styles.contentContainer}>
              <TouchableOpacity style={styles.button} onPress={() => router.push()}>
                <FontAwesome name="tint" size={24} color="#000" />
                <Text style={styles.buttonText}>Glucose</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => router.push({pathname: '/addDiary', query: onClose()})}>
                <FontAwesome name="cutlery" size={24} color="#000" />
                <Text style={styles.buttonText}>Meals</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <FontAwesome5 name="pills" size={24} color="#000" />
                <Text style={styles.buttonText}>Meds</Text>
              </TouchableOpacity>
            </View>
          </>
          )}
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
    width: '100%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize:16
  },
  section: {
    backgroundColor:'#E58B68',
    width:'50%',
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderBottomWidth:1,
    borderColor:'#f1f1f1'
  },
  activeSection: {
    backgroundColor: 'white',
    justifyContent:'center',
    alignItems:'center'
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
