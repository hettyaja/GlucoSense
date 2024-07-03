import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase'; // Ensure this path is correct

const InsightSA = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalActiveUsers, setTotalActiveUsers] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const collections = ['users', 'businessPartner', 'systemAdmin'];
        let usersCount = 0;
        let activeUsersCount = 0;

        for (const collectionName of collections) {
          const querySnapshot = await getDocs(collection(db, collectionName));
          querySnapshot.forEach((doc) => {
            usersCount++;
            if (doc.data().status === 'active') {
              activeUsersCount++;
            }
          });
        }

        setTotalUsers(usersCount);
        setTotalActiveUsers(activeUsersCount);
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Insight</Text>
      </View>
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Users</Text>
          <Text style={styles.cardValue}>{totalUsers}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Active Users</Text>
          <Text style={styles.cardValue}>{totalActiveUsers}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Revenue</Text>
          <Text style={styles.cardValue}>S$ 1,245</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#D9A37E',
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
    width: '30%',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InsightSA;
