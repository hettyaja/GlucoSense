import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PopupMenu from '../components/PopupMenu';
import DeleteDietPlanController from '../Controller/DeleteDietPlanController';
import { useAuth } from '../service/AuthContext';

const DietPlanCard = ({ dietPlan, onEdit, onDelete }) => {
  const { user } = useAuth()

  const handleEdit = () => {
    onEdit(dietPlan);
  };

  const handleDelete = async () => {
    try {
      // await DeleteDietPlanController.deleteDietPlan(user.uid, dietPlan.id);
      onDelete(dietPlan.id);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <>
    <View style={styles.card}>
      <View style={styles.titleSection}>
        <Text style={styles.title}>{dietPlan.planName}</Text>
        <PopupMenu
          onEdit={() => handleEdit()}
          onDelete={() => handleDelete()}
        />
      </View>
      <Text style={styles.label}>Price per day: {dietPlan.price}</Text>
      <Text style={styles.label}>Subscriber: </Text>
    </View>
  </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom:8,
    padding:16,
    elevation:4
    
  },
  titleSection: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  title: {
    fontFamily:'Poppins-SemiBold',
    fontSize:14,
    paddingBottom:8
  },
  label: {
    fontFamily:'Poppins-Regular',
    fontSize:12,
    color:'#808080'
  }
});

export default DietPlanCard;
