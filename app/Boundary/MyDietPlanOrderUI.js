import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { router } from 'expo-router';
import Header from '../components/Header';
import ViewUserDietPlanOrderController from '../Controller/ViewUserDietPlanOrderController';
import { useAuth } from '../service/AuthContext';

const OngoingRoute = ({ orders }) => (
  <ScrollView style={styles.container}>
    {orders.map((order, index) => (
      <View key={`${order.orderId}-${index}`} style={styles.orderCard}>
        <Image source={{ uri: order.dietPlanImage }} style={styles.orderImage} />
        <View style={styles.orderInfo}>
          <Text style={styles.planName}>{order.dietPlanName}</Text>
          <Text style={styles.price}>${order.totalPayment}</Text>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    ))}
  </ScrollView>
);

const EndedRoute = ({ orders }) => (
  <ScrollView style={styles.container}>
    {orders.map((order, index) => (
      <View key={`${order.orderId}-${index}`} style={styles.orderCard}>
        <Image source={{ uri: order.planImage }} style={styles.orderImage} />
        <View style={styles.orderInfo}>
          <Text style={styles.planName}>{order.planName}</Text>
          <Text style={styles.price}>${order.totalPayment}</Text>
          <TouchableOpacity style={styles.reorderButton}>
            <Text style={styles.buttonText}>Re-Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    ))}
  </ScrollView>
);

const MyDietPlanOrderUI = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'ongoing', title: 'Ongoing' },
    { key: 'ended', title: 'Ended' },
  ]);

  const { user } = useAuth();
  const [ongoingOrders, setOngoingOrders] = useState([]);
  const [endedOrders, setEndedOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await ViewUserDietPlanOrderController.viewDietPlanOrderByUserId(user.uid);
        const todayDate = new Date();

        setOngoingOrders(orders.filter(order => new Date(order.endDate) >= todayDate));
        setEndedOrders(orders.filter(order => new Date(order.endDate) < todayDate));
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [user.uid]);

  const renderScene = SceneMap({
    ongoing: () => <OngoingRoute orders={ongoingOrders} />,
    ended: () => <EndedRoute orders={endedOrders} />,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#E58B68' }}
      style={{ backgroundColor: 'white' }}
      activeColor="#E58B68"
      inactiveColor="#808080"
      labelStyle={{ fontFamily: 'Poppins-Medium' }}
    />
  );

  return (
    <>
      <Header
        title='My Diet Plan Order'
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
  planName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
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

export default MyDietPlanOrderUI;
