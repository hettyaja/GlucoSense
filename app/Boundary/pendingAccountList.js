import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import ViewPendingAccountListController from '../Controller/ViewPendingAccountListController';
import Header from '../components/Header';
import Fontisto from 'react-native-vector-icons/Fontisto';

const PendingAccountList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingAccounts, setPendingAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchPendingAccounts = async () => {
    try {
      const accounts = await ViewPendingAccountListController.getPendingAccounts();
      setPendingAccounts(accounts);
    } catch (error) {
      console.error("Error fetching pending accounts: ", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPendingAccounts();
    }, [])
  );

  const filteredPendingAccounts = pendingAccounts.filter(account => {
    return searchQuery ? account.name && account.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
  });

  const renderPendingAccountItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.accountRow} 
      onPress={() => router.push({
        pathname: `/Boundary/pendingAccountDetails`,
        params: { accountId: item.id }
      })}
      key={item.id}
    >
      <Text style={[styles.accountCell, {flex:1.5}]}>{item.name}</Text>
      <Text style={styles.accountCell}>{new Date(item.registerTime.seconds * 1000).toLocaleString() }</Text>
      <Text style={[styles.accountCell, {flex:1}, {color: 'red'}]}>{item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <Header
        title='Pending Account'
        leftButton='Back'
        onLeftButtonPress={() => router.back()}
      />
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Fontisto name='search' size={16} color='gray' />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Account"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
          </View>
        </View>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, {flex:1.5}]}>Username</Text>
          <Text style={styles.tableHeaderCell}>Registered</Text>
          <Text style={[styles.tableHeaderCell, {flex:1}]}>Status</Text>
        </View>
        {loading ? (
          <View style={styles.noAccounts}>
            <Text style={styles.noAccountsText}>Loading...</Text>
          </View>
        ) : filteredPendingAccounts.length === 0 ? (
          <View style={styles.noAccounts}>
            <Text style={styles.noAccountsText}>NO PENDING ACCOUNTS</Text>
          </View>
        ) : (
          <FlatList
            data={filteredPendingAccounts}
            renderItem={renderPendingAccountItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </>
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
    padding: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 8,
  },
  tableHeaderCell: {
    flex: 2,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'left',
    paddingLeft:8
  },
  accountRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  accountCell: {
    flex: 2,
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    paddingLeft:8,
    fontSize: 14,
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
  searchIcon: {
    flexDirection: 'row',
    flex: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 8,
  },
});

export default PendingAccountList;
