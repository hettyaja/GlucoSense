// MenuCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const MenuCard = ({ menu }) => {
  return (
    <View style={styles.card}>
      {menu.image && <Image source={{ uri: menu.image }} style={styles.image} />}
      <View style={styles.infoContainer}>
        
        <Text style={styles.title}>{menu.foodName}</Text>
        <Text style={styles.price}>${menu.price}</Text>
        <Text style={styles.sold}>Sold: {menu.status}</Text>
        {menu.isSoldOut && <Text style={styles.soldOut}>Sold Out</Text>}
        {/* Render additional details if needed */}
      </View>
    </View>
  );
};

MenuCard.propTypes = {
  menu: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    sold: PropTypes.number.isRequired,
    isSoldOut: PropTypes.bool,
  }).isRequired,
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
});

export default MenuCard;
