// src/app/pendingAccountList.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { fetchPendingAccounts } from '../controllers/pendingAccountController';

const PendingAccountList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingAccounts, setPendingAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const accounts = await fetchPendingAccounts();
      setPendingAccounts(accounts);
      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredAccounts = pendingAccounts.filter(account => 
    searchQuery ? account.username.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  const renderAccountItem = ({ item }) => (
    <TouchableOpacity style={styles.accountRow} onPress={() => router.push(`/pendingAccountDetails?id=${item.id}`)}>
      <Text style={styles.accountCell}>{item.username}</Text>
      <Text style={styles.accountCell}>{new Date(item.registered.seconds * 1000).toLocaleDateString()}</Text>
      <Text style={styles.pendingStatus}>{item.status}</Text>
    </TouchableOpacity>
  );

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
      ) : filteredAccounts.length === 0 ? (
        <View style={styles.noAccounts}>
          <Text style={styles.noAccountsText}>NO PENDING ACCOUNTS</Text>
        </View>
      ) : (
        <FlatList
          data={filteredAccounts}
          renderItem={renderAccountItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#D9A37E', padding: 16 },
  headerText: { fontSize: 18, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  searchBar: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#ccc' },
  searchInput: { flex: 1, padding: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 4 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#f2f2f2', padding: 8 },
  tableHeaderCell: { flex: 1, fontWeight: 'bold', textAlign: 'center' },
  accountRow: { flexDirection: 'row', padding: 8, borderBottomWidth: 1, borderColor: '#ccc' },
  accountCell: { flex: 1, textAlign: 'center' },
  pendingStatus: { color: 'red', fontWeight: 'bold' },
  noAccounts: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  noAccountsText: { fontSize: 18, color: '#ccc' },
});

export default PendingAccountList;
