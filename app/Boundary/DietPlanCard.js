import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DeleteDietPlanController from '../Controller/DeleteDietPlanController';
import { useAuth } from '../service/AuthContext';

const DietPlanCard = ({ dietPlan, onEdit, onDelete }) => {
  const { user } = useAuth()
  const [modalVisible, setModalVisible] = useState(false);

  const handleEdit = () => {
    setModalVisible(false);
    onEdit(dietPlan);
  };

  const handleDelete = async () => {
    setModalVisible(false);
    try {
      await DeleteDietPlanController.deleteDietPlan(user.uid, dietPlan.id);
      onDelete(dietPlan.id);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <>
    
    <View style={styles.card}>
        <Text style={styles.title}>{dietPlan.planName}</Text>
      <TouchableOpacity style={styles.menuIcon} onPress={() => setModalVisible(true)}>
        <MaterialIcons name="more-vert" size={24} color="black" />
      </TouchableOpacity>
      <View>
      
      </View>
      <Text>{dietPlan.price}</Text>
    </View>


    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => setModalVisible(false)}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
          <MaterialIcons name="close" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalOption} onPress={handleEdit}>
          <Text>Edit Diet Plan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalOption} onPress={handleDelete}>
          <Text>Delete This Diet Plan</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    padding:16
  },
  title: {
    fontFamily:'Poppins-SemiBold',
    fontSize:14,
  },
  day: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  meal: { marginTop: 10 },
  mealTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  mealImage: { width: 100, height: 100, borderRadius: 10, marginBottom: 10 },
  mealDetails: { fontSize: 14, color: '#333' },
  menuIcon: { position: 'absolute', top: 10, right: 10 },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 10,
  },
  modalOption: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
});

export default DietPlanCard;
