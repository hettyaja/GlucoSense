import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const BottomSheetModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <Text>This is a bottom sheet modal!</Text>
        <Button title="Close" onPress={onClose} />
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
    padding: 22,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
  },
});

export default BottomSheetModal;
