import { router, Stack } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, useWindowDimensions, ScrollView, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { DietPlanCard, FoodCard } from '../../components/Cards';
import Header from '../../components/Header';
import ViewBusinessPartnerDietPlanOrderController from '../../Controller/ViewBusinessPartnerDietPlanOrderController';
import ViewBusinessPartnerFoodOrderController from '../../Controller/ViewBusinessPartnerFoodOrderController';
import { useAuth } from '../../service/AuthContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const FirstRoute = ({ refreshFlag, triggerRefresh }) => {
  const { user } = useAuth();
  const [foodOrderData, setFoodOrderData] = useState([]);

  useEffect(() => {
    const loadFoodData = async () => {
      try {
        const data = await ViewBusinessPartnerFoodOrderController.viewFoodOrderByBusinessPartnerId(user.uid);
        // Filter out orders with status 'complete'
        const filteredData = data.filter(order => order.status !== 'complete');
        setFoodOrderData(filteredData);
      } catch (error) {
        console.error('Error loading food data:', error);
      }
    };

    loadFoodData();
  }, [user.uid, refreshFlag]); // Adding refreshFlag as a dependency

  return (
    <ScrollView style={styles.container}>
      {foodOrderData.map((item, index) => (
        <FoodCard key={`${item.id}-${index}`} item={item} onOrderDelivered={triggerRefresh} />
      ))}
    </ScrollView>
  );
};

const SecondRoute = ({ refreshFlag, triggerRefresh }) => {
  const { user } = useAuth();
  const [dietPlanOrderData, setDietPlanOrderData] = useState([]);

  useEffect(() => {
    const loadDietPlanData = async () => {
      try {
        const data = await ViewBusinessPartnerDietPlanOrderController.viewDietPlanOrderByBusinessPartnerId(user.uid);
        // Filter out diet plan orders with status 'complete'
        const filteredData = data.filter(order => order.status !== 'complete');
        setDietPlanOrderData(filteredData);
      } catch (error) {
        console.error('Error loading diet plan data:', error);
      }
    };

    loadDietPlanData();
  }, [user.uid, refreshFlag]); // Adding refreshFlag as a dependency

  return (
    <ScrollView style={styles.container}>
      {dietPlanOrderData.map((item, index) => (
        <DietPlanCard key={`${item.id}-${index}`} item={item} onOrderDelivered={triggerRefresh} />
      ))}
    </ScrollView>
  );
};

const OrderBP = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [refreshFlag, setRefreshFlag] = useState(false); // State to control refresh

  const triggerRefresh = () => {
    setRefreshFlag(prev => !prev); // Toggling the flag to trigger a re-fetch
  };

  const routes = [
    { key: 'first', title: 'Food' },
    { key: 'second', title: 'Diet Plan' },
  ];

  const renderScene = SceneMap({
    first: () => <FirstRoute refreshFlag={refreshFlag} triggerRefresh={triggerRefresh} />,
    second: () => <SecondRoute refreshFlag={refreshFlag} triggerRefresh={triggerRefresh} />,
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
      <Stack.Screen options={{
                title: 'Order',
                headerStyle: { backgroundColor: '#E58B68' },
                headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Medium', fontSize: 16 },

                headerRight: () => (
                    <TouchableOpacity style={{marginHorizontal:16}} onPress={() => router.push('Boundary/ViewOrderHistoryUI')}>
                      <MaterialCommunityIcons name='history' size={32} color='white'/>
                    </TouchableOpacity>
                ),
                headerTitle: 'Order',
                headerTitleAlign: 'center',
            }} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar} // Use custom tab bar
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
});

export default OrderBP;
