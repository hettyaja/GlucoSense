import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { router } from 'expo-router';
import Header from '../components/Header';
import ViewUserFoodOrderController from '../Controller/ViewUserFoodOrderController';
import { useAuth } from '../service/AuthContext'; // Assuming you have an AuthContext to get user data
import { encode } from 'base-64'

const ToReceiveRoute = ({ orders }) => (
  <ScrollView style={styles.container}>
    {orders.map((order, index) => (
      <TouchableOpacity key={`${order.orderId}-${index}`} style={styles.orderCard} onPress={() => router.push({ pathname: 'Boundary/UserFoodOrderDetails', params: { orderDetails: encode(JSON.stringify(order)) } })}>
        <Text style={styles.storeName}>{order.businessPartnerName}</Text>
        <View style={styles.orderInfo}>
          <Image source={{ uri: order.menuImage }} style={styles.orderImage} />
          <View style={{flex:1}}>
            <View style={styles.row}>
              <Text style={styles.itemName}>{order.menuName}</Text>
              <Text style={styles.itemName}>x{order.quantity}</Text>
            </View>
            <Text style={styles.notes}>Ordered on {order.orderDate.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</Text>
            <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
              <Text style={styles.price}>${order.totalPayment}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const CompletedRoute = ({ orders }) => (
  <ScrollView style={styles.container}>
    {orders.map((order, index ) => (
      <TouchableOpacity key={`${order.orderId}-${index}`} style={styles.orderCard} onPress={() => router.push({ pathname: 'Boundary/UserFoodOrderDetails', params: { orderDetails: encode(JSON.stringify(order)) } })}>
      <Text style={styles.storeName}>{order.businessPartnerName}</Text>
      <View style={styles.orderInfo}>
        <Image source={{ uri: order.menuImage }} style={styles.orderImage} />
        <View style={{flex:1}}>
          <View style={styles.row}>
            <Text style={styles.itemName}>{order.menuName}</Text>
            <Text style={styles.itemName}>x{order.quantity}</Text>
          </View>
          <Text style={styles.notes}>Delivered on {order.deliverDate.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</Text>
          <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
            <Text style={styles.price}>${order.totalPayment}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  orderImage: {
    width: 88,
    height: 88,
    borderRadius: 8,
    marginRight: 16,
  },
  orderInfo: {
    flex: 1,
    flexDirection:'row'
  },
  row: {
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  storeName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  itemName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  notes: {
    fontFamily:'Poppins-Regular',
    fontSize:14,
    color:'#808080'
  },
  price: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
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
