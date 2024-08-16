import { useFocusEffect, useRouter } from 'expo-router';
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import { encode } from 'base-64';
import getProfileController from '../../Controller/getProfileController';
import { useAuth } from '../../service/AuthContext';
import ViewMenuController from '../../Controller/ViewMenuController';
import ViewDietPlanController from '../../Controller/ViewDietPlanController';

const Food = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [featuredMenu, setFeaturedMenu] = useState([]);
  const [dietPlans, setDietPlans] = useState([]);
  const [subscriptionType, setSubscriptionType] = useState();

  const fetchProfileData = async () => {
    try {
      const profileData = await getProfileController.getProfile(user.uid);
      setSubscriptionType(profileData.subscriptionType);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfileData();
    }, [])
  );

  useEffect(() => {
    const fetchFeaturedMenu = async () => {
      try {
        const menuCollection = await ViewMenuController.viewAllMenu(); // Fetch menu data
        setFeaturedMenu(menuCollection.slice(0, 5)); // Assuming you want to show the first 5 items as featured
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };
    fetchFeaturedMenu();
  }, []);

  useEffect(() => {
    const fetchDietPlansData = async () => {
      try {
        const dietPlanCollection = await ViewDietPlanController.fetchAllDietPlansForUser(); // Fetch diet plan data
        setDietPlans(dietPlanCollection.slice(0, 5));
      } catch (error) {
        console.error('Error fetching diet plan data:', error);
      }
    };
    fetchDietPlansData();
  }, []);

  const handleFoodOrder = (menu) => {
    router.push({ pathname: 'Boundary/MenuDetailsUI', params: { menuData: encode(JSON.stringify(menu)) } });
  };

  const handleDietPlanOrder = (plan) => {
    if (subscriptionType === 'free') {
      Alert.alert(
        'Premium Feature',
        'Diet plans are only available for premium users. Would you like to upgrade?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Upgrade',
            onPress: () => router.push('Boundary/Subscribe'),
          },
        ]
      );
    } else {
      router.push({ pathname: 'Boundary/OrderDietPlan', params: { planData: encode(JSON.stringify(plan)) } });
    }
  };

  const handleViewDietPlans = () => {
    if (subscriptionType === 'free') {
      Alert.alert(
        'Premium Feature',
        'Diet plans are only available for premium users. Would you like to upgrade?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Upgrade',
            onPress: () => router.push('Boundary/Subscribe'),
          },
        ]
      );
    } else {
      router.push('Boundary/ViewDietPlan');
    }
  };

  return (
    <>
      <Header title="Food" />
      <ScrollView style={styles.container}>
        <View style={styles.statusContainer}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusHeaderText}>My Food</Text>
            <TouchableOpacity style={styles.statusBox} onPress={() => router.push('Boundary/MyFoodOrderUI')}>
              <Text>Orders</Text>
              <Ionicons name="chevron-forward" size={24} color="grey" />
            </TouchableOpacity>
          </View>

          <View style={styles.statusHeader}>
            <Text style={styles.statusHeaderText}>My Diet Plan</Text>
            <TouchableOpacity style={styles.statusBox} onPress={() => router.push('Boundary/MyDietPlanOrderUI')}>
              <Text>Plans</Text>
              <Ionicons name="chevron-forward" size={24} color="grey" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.recipeBox} onPress={() => router.push('recipePage')}>
          <Text style={styles.recipeText}>Discover our recipe</Text>
          <Ionicons name="chevron-forward" size={24} color="grey" />
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.sectionTitle}>Featured Menu</Text>
          <TouchableOpacity onPress={() => router.push('Boundary/ViewMenuUI')}>
            <Ionicons name="chevron-forward" size={24} color="grey" />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal contentContainerStyle={styles.featuredMenuContainer}>
          {featuredMenu.map((menu, index) => (
            <TouchableOpacity key={index} style={styles.menuCard} onPress={() => handleFoodOrder(menu)}>
              <Image source={{ uri: menu.image }} style={styles.menuImage} />
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>{menu.title}</Text>
                <Text style={styles.menuPrice}>$ {menu.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.row}>
          <Text style={styles.sectionTitle}>Featured Diet Plan</Text>
          <TouchableOpacity onPress={handleViewDietPlans}>
            <Ionicons name="chevron-forward" size={24} color="grey" />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal contentContainerStyle={styles.featuredMenuContainer}>
          {dietPlans.map((plan, index) => (
            <TouchableOpacity key={index} style={styles.menuCard} onPress={() => handleDietPlanOrder(plan)}>
              <Image source={{ uri: plan.planImage || 'https://via.placeholder.com/150' }} style={styles.menuImage} />
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>{plan.planName}</Text>
                <Text style={styles.menuPrice}>Start from $ {plan.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  statusHeader: {
    width: '48%',
  },
  statusHeaderText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  statusBox: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 0.5,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recipeBox: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 0.5,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recipeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  featuredMenuContainer: {
    marginLeft: 16,
    marginBottom: 16,
    marginTop: 8,
  },
  menuCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#808080',
    width: 200,
    marginRight: 16,
    height: 160,
  },
  menuImage: {
    flex: 3, // Takes 3/4 of the card height
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  menuTextContainer: {
    flex: 1, // Takes 1/4 of the card height
    padding: 8,
    justifyContent: 'center',
  },
  menuTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  menuPrice: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#808080',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
  },
});

export default Food;
