import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { router } from 'expo-router';
import Header from '../components/Header';
import ViewUserFoodOrderController from '../Controller/ViewUserFoodOrderController';
import { useAuth } from '../service/AuthContext'; // Assuming you have an AuthContext to get user data

const ToReceiveRoute = ({ orders }) => (
  <ScrollView style={styles.container}>
    {orders.map((order, index) => (
      <View key={`${order.orderId}-${index}`} style={styles.orderCard}>
        <Image source={{ uri: order.menuImage }} style={styles.orderImage} />
        <View style={styles.orderInfo}>
          <Text style={styles.storeName}>{order.businessPartnerName}</Text>
          <Text style={styles.itemName}>{order.menuName}</Text>
          <Text style={styles.price}>${order.price}</Text>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    ))}
  </ScrollView>
);

const CompletedRoute = ({ orders }) => (
  <ScrollView style={styles.container}>
    {orders.map((order, index ) => (
      <View key={`${order.orderId}-${index}`} style={styles.orderCard}>
        <Image source={{ uri: order.menuImage }} style={styles.orderImage} />
        <View style={styles.orderInfo}>
          <Text style={styles.storeName}>{order.businessPartnerName}</Text>
          <Text style={styles.itemName}>{order.quantity}</Text>
          <Text style={styles.price}>${order.price}</Text>
          <TouchableOpacity style={styles.reorderButton}>
            <Text style={styles.buttonText}>Re-Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    ))}
  </ScrollView>
);

const MyFoodOrderUI = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'toReceive', title: 'To receive' },
    { key: 'completed', title: 'Completed' },
  ]);

  const { user } = useAuth(); // Get the authenticated user's data
  const [toReceiveOrders, setToReceiveOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await ViewUserFoodOrderController.viewFoodOrderByUserId(user.uid);
        setToReceiveOrders(orders.filter(order => order.status === 'waiting'));
        setCompletedOrders(orders.filter(order => order.status === 'complete'));
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [user.uid]);

  const renderScene = SceneMap({
    toReceive: () => <ToReceiveRoute orders={toReceiveOrders} />,
    completed: () => <CompletedRoute orders={completedOrders} />,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#E58B68' }} // Change the indicator color
      style={{ backgroundColor: 'white' }} // Change the tab bar background color
      activeColor="#E58B68" // Change the active tab text color
      inactiveColor="#808080" // Change the inactive tab text color
      labelStyle={{ fontFamily: 'Poppins-Medium' }} // Customize the tab label font
    />
  );

  return (
    <>
      <Header
        title='My Food Order'
        leftButton='Back'
        onLeftButtonPress={() => router.back()}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
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

export default MyFoodOrderUI;
