import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { db } from '../../firebase'; // Import the Firestore instance
import { collection, getDocs } from 'firebase/firestore';

const PendingAccountList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingAccounts, setPendingAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPendingAccounts = async () => {
      try {
        const pendingAccountsCollection = await getDocs(collection(db, 'pendingAccounts'));
        const pendingAccountsData = pendingAccountsCollection.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setPendingAccounts(pendingAccountsData);
      } catch (error) {
        console.error("Error fetching pending accounts: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingAccounts();
  }, []);

  const filteredPendingAccounts = pendingAccounts.filter(account => {
    return searchQuery ? account.username?.toLowerCase().includes(searchQuery.toLowerCase()) : true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Pending Account</Text>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Account"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderCell}>Username</Text>
        <Text style={styles.tableHeaderCell}>Registered</Text>
        <Text style={styles.tableHeaderCell}>Status</Text>
      </View>
      {loading ? (
        <View style={styles.noAccounts}>
          <Text style={styles.noAccountsText}>Loading...</Text>
        </View>
      ) : filteredPendingAccounts.length === 0 ? (
        <View style={styles.noAccounts}>
          <Text style={styles.noAccountsText}>NO ACCOUNT FOUND</Text>
        </View>
      ) : (
        <FlatList
          data={filteredPendingAccounts}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.accountRow} onPress={() => router.push(`/pendingAccountDetails?id=${item.id}`)}>
              <Text style={styles.accountCell}>{item.username}</Text>
              <Text style={styles.accountCell}>{item.registerTime ? new Date(item.registerTime.seconds * 1000).toLocaleDateString() : 'N/A'}</Text>
              <Text style={[styles.accountCell, styles.pendingStatus]}>{item.status}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
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
    backgroundColor: '#D9A37E',
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
  accountRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  accountCell: {
    flex: 1,
    textAlign: 'center',
  },
  pendingStatus: {
    color: 'red',
    fontWeight: 'bold',
  },
  noAccounts: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAccountsText: {
    fontSize: 18,
    color: '#ccc',
  },
});

export default PendingAccountList;
