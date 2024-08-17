import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PopupMenu from '../components/PopupMenu';
import { encode } from 'base-64';
import { router } from 'expo-router';

const DietPlanCard = ({ dietPlan, onEdit, onDelete }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({ pathname: 'Boundary/EditDietPlan', params: { dietPlanData: encode(JSON.stringify(dietPlan)) } })}
    >
      {dietPlan.planImage && (
        <Image source={{ uri: dietPlan.planImage }} style={styles.image} />
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{dietPlan.planName}</Text>
        <Text style={styles.price}>${dietPlan.price} per week</Text>
      </View>
      <View style={{ paddingTop: 10, marginLeft: 20, paddingRight: 8 }}>
        <PopupMenu
          onEdit={() => onEdit(dietPlan)}
          onDelete={() => onDelete(dietPlan.id)}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  infoContainer: {
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
});

export default DietPlanCard;
