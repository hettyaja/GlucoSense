import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import FetchDietPlanOrdersController from '../Controller/FetchDietPlanOrdersController';
import Header from '../components/Header';

const DietPlanOrderBP = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await FetchDietPlanOrdersController.fetchDietPlanOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderName}>{item.name}</Text>
      <Text>Buyer: {item.buyer}</Text>
      <Text>Order date: {item.orderDate}</Text>
      <Text style={styles.linkText}>View diet plan menu &gt;&gt;</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.approveButton}>
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectButton}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Diet Plan Order" />
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  orderCard: {
    backgroundColor: 'white',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 3,
  },
  orderName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#1E90FF',
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  approveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
  },
  rejectButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DietPlanOrderBP;
