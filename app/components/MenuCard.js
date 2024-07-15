// MenuCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { router } from 'expo-router';
import PopupMenu from './PopupMenu';
import DeleteMenuController from '../Controller/DeleteMenuController';
import { useAuth } from '../service/AuthContext';

 
const MenuCard = ({ menu, onDelete , onEdit}) => {

  const {user} = useAuth()

  return (
    <TouchableOpacity onPress={() => router.push({ pathname: 'Boundary/EditMenuPage', params: { menuData: JSON.stringify(menu) } })}>      
    <View style={styles.card}>
      {menu.image && <Image source={{ uri: menu.image }} style={styles.image} />}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{menu.foodName}</Text>
        <Text style={styles.price}>${menu.price}</Text>
        <Text style={styles.sold}>Sold: {menu.status}</Text>
        {menu.isSoldOut && <Text style={styles.soldOut}>Sold Out</Text>}
      </View>
      <View style={{ paddingTop: 10, marginLeft: 20, paddingRight: 8 }}>
        <PopupMenu
          onEdit={() => onEdit(menu)}
          onDelete={() => onDelete(menu.id)}
        />
      </View>
    </View>
  </TouchableOpacity>
);
};

MenuCard.propTypes = {
  menu: PropTypes.shape({
    image: PropTypes.string,
    foodName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    isSoldOut: PropTypes.bool,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit : PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
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
