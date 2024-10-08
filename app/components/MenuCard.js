// MenuCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { router } from 'expo-router';
import PopupMenu from './PopupMenu';
import DeleteMenuController from '../Controller/DeleteMenuController';
import { useAuth } from '../service/AuthContext';
import { encode } from 'base-64';
 
const MenuCard = ({ menu, onDelete , onEdit}) => {

  const {user} = useAuth()

  return (
    <TouchableOpacity style={styles.card} onPress={() => router.push({ pathname: 'Boundary/UpdateMenuUI', params: {menuData: encode(JSON.stringify(menu))} })}>      
      {menu.image && <Image source={{ uri: menu.image }} style={styles.image} />}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{menu.foodName}</Text>
        <Text style={styles.price}>${menu.price}</Text>
      </View>
      <View style={{ paddingTop: 10, marginLeft: 20, paddingRight: 8 }}>
        <PopupMenu
          onEdit={() => onEdit(menu)}
          onDelete={() => onDelete(menu.id)}
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
    borderTopLeftRadius:8,
    borderBottomLeftRadius:8
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
  sold: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  soldOut: {
    fontSize: 14,
    color: '#f00',
    marginTop: 5,
    fontWeight: 'bold',
  },
  editButton: {
    position: 'absolute',
    top: 80,
    right: 10,
    zIndex: 1,
  }
});

export default MenuCard;
