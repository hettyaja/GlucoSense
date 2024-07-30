import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Tabs } from 'expo-router';

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState('To receive');

  const orders = [
    {
      id: '1',
      store: 'Yummy Store',
      item: 'Chicken Rice',
      price: '4.50',
      image: 'https://via.placeholder.com/80',
      status: 'To receive',
    },
    {
      id: '2',
      store: 'Yummy Store',
      item: 'Chicken Rice',
      price: '4.50',
      image: 'https://via.placeholder.com/80',
      status: 'Completed',
    },
  ];

  const filteredOrders = orders.filter(order => order.status === activeTab);

  return (
    <>
      <Tabs.Screen options={{
        title: 'Order',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold' },
        headerTitle: 'Order',
        headerTitleAlign: 'center',
      }} />
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'To receive' && styles.activeTab]}
            onPress={() => setActiveTab('To receive')}
          >
            <Text style={[styles.tabText, activeTab === 'To receive' && styles.activeTabText]}>To receive</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Completed' && styles.activeTab]}
            onPress={() => setActiveTab('Completed')}
          >
            <Text style={[styles.tabText, activeTab === 'Completed' && styles.activeTabText]}>Completed</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {filteredOrders.map(order => (
            <View key={order.id} style={styles.orderCard}>
              <Image source={{ uri: order.image }} style={styles.orderImage} />
              <View style={styles.orderInfo}>
                <Text style={styles.storeName}>{order.store}</Text>
                <Text style={styles.itemName}>{order.item}</Text>
                <Text style={styles.price}>${order.price}</Text>
                {activeTab === 'To receive' ? (
                  <TouchableOpacity style={styles.cancelButton}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.reorderButton}>
                    <Text style={styles.buttonText}>Re-Order</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    padding: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#E58B68',
  },
  tabText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#E58B68',
    fontFamily: 'Poppins-Bold',
  },
  scrollViewContent: {
    padding: 16,
  },
  orderCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  orderImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  orderInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  storeName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  itemName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#333',
  },
  cancelButton: {
    backgroundColor: '#E58B68',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  reorderButton: {
    backgroundColor: '#E58B68',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
  },
});

export default OrderHistory;
