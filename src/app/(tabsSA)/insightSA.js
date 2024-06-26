// InsightSA.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../../firebase'; // Import the Firestore instance
import { collection, getDocs } from 'firebase/firestore';

const InsightSA = () => {
  const [filter, setFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = await getDocs(collection(db, 'users'));
        const usersData = usersCollection.docs.map(doc => doc.data());
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    return (
      (filter ? user.userType === filter : true) &&
      (searchQuery ? user.username.toLowerCase().includes(searchQuery.toLowerCase()) : true)
    );
  });

  const renderUserItem = ({ item }) => (
    <View style={styles.userRow}>
      <Text style={styles.userCell}>{item.username}</Text>
      <Text style={styles.userCell}>{item.subscriptionType}</Text>
      <Text style={styles.userCell}>{item.registered}</Text>
      <Text style={styles.userCell}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>User Account</Text>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Account"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <Picker
          selectedValue={filter}
          style={styles.dropdown}
          onValueChange={(itemValue) => setFilter(itemValue)}
        >
          <Picker.Item label="All users" value="" />
          <Picker.Item label="Free user" value="free" />
          <Picker.Item label="Premium user" value="premium" />
          <Picker.Item label="Seller" value="Seller" />
        </Picker>
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderCell}>Username</Text>
        <Text style={styles.tableHeaderCell}>Type</Text>
        <Text style={styles.tableHeaderCell}>Registered</Text>
        <Text style={styles.tableHeaderCell}>Status</Text>
      </View>
      {loading ? (
        <View style={styles.noUsers}>
          <Text style={styles.noUsersText}>Loading...</Text>
        </View>
      ) : filteredUsers.length === 0 ? (
        <View style={styles.noUsers}>
          <Text style={styles.noUsersText}>NO USER REGISTERED</Text>
        </View>
      ) : (
        <FlatList
          data={filteredUsers}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.username}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#FFA07A',
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  searchInput: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  dropdown: {
    marginLeft: 8,
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 8,
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  userCell: {
    flex: 1,
    textAlign: 'center',
  },
  noUsers: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noUsersText: {
    fontSize: 18,
    color: '#ccc',
  },
});

export default InsightSA;