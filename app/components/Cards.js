import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import MenuDetailsController from '../Controller/MenuDetailsController';
import UpdateFoodOrderController from '../Controller/UpdateFoodOrderController';
import { useAuth } from '../service/AuthContext';

const FoodCard = ({ item }) => {
  const { user } = useAuth(); // Use the auth context to get the user
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        console.log(user.uid, item.menuId)
        const data = await MenuDetailsController.fetchMenu(user.uid, item.menuId);
        console.log(data)
        setMenuData(data);
      } catch (error) {
        console.error('Error fetching menu data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchMenu();
  }, [user.uid, item.menuId]); // Dependency array includes user.uid and item.menuId

  if (loading) {
    return (
      <View style={styles.card}>
        <ActivityIndicator size="large" color="#E58B68" />
      </View>
    );
  }

  if (!menuData) {
    return (
      <View style={styles.card}>
        <Text style={styles.errorText}>Failed to load menu data.</Text>
      </View>
    );
  }

  const handleDeliver = async () => {
    try {
      await UpdateFoodOrderController.updateFoodOrder(item.id, {deliverDate: new Date(),  status: 'complete' }); // Update the order status to 'complete'
      console.log('Order status updated to complete');
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: menuData.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>Order {item.orderRefNumber}</Text>
        <View style={{borderBottomWidth:0.5, borderColor:'#808080'}}/>
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <Text style={styles.cardSubtitle}>{menuData.foodName}</Text>
          <Text style={styles.cardSubtitle}>Qty: {item.quantity}</Text>
        </View>
        <Text style={styles.cardLabel}>Notes: {item.notes ? item.notes : '-'}</Text>
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <Text style={[styles.cardSubtitle]}>$ {item.totalPayment}</Text>
          <TouchableOpacity style={styles.deliverButton} onPress={handleDeliver}>
            <Text style={styles.deliverText}>Deliver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const DietPlanCard = ({ item }) => (
  <TouchableOpacity style={styles.card}>
    <Image source={{ uri: item.planImage }} style={styles.cardImage} />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>Order {item.orderRefNumber}</Text>
      <View style={{borderBottomWidth:0.5, borderColor:'#808080'}}/>
      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
        <Text style={styles.cardSubtitle}>{item.planName}</Text>
        <Text style={styles.cardSubtitle}>Qty: {item.quantity}</Text>
      </View>
      <Text style={styles.cardLabel}>Notes: {item.notes ? item.notes : '-'}</Text>
      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
        <Text style={[styles.cardSubtitle]}>$ {item.totalPayment}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  cardImage: {
    width: 120,
    height: 120,
  },
  cardContent: {
    flex: 1,
    padding: 8,
  },
  cardTitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  cardLabel: {
    fontSize:12,
    fontFamily:'Poppins-Regular',
    color:'#808080'
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: 'red',
    padding: 16,
  },
  deliverButton: {
    backgroundColor:"green",
    borderRadius:8,
    paddingVertical:8,
    paddingHorizontal:16
  },
  deliverText: {
    fontFamily:'Poppins-Medium',
    fontSize:12,
    color:'white'
  }
});


export { FoodCard, DietPlanCard };
