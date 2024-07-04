import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Modal, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../../firebase'; // Import the Firestore instance
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const userSA = () => {
  const [filter, setFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersCollection = await getDocs(collection(db, 'users'));
      const usersData = usersCollection.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users: ", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    return (
      (filter ? user.subscriptionType === filter : true) &&
      (searchQuery ? user.username?.toLowerCase().includes(searchQuery.toLowerCase()) : true)
    );
  });

  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.seconds) return "";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const handleSuspend = async () => {
    if (selectedUser && selectedUser.status !== 'suspended') {
      try {
        await updateDoc(doc(db, 'users', selectedUser.id), { status: 'suspended' });
        fetchUsers(); // Refresh the user list
        setModalVisible(false); // Close the modal
      } catch (error) {
        console.error("Error suspending user: ", error);
      }
    }
  };

  const handleUnsuspend = async () => {
    if (selectedUser && selectedUser.status === 'suspended') {
      try {
        await updateDoc(doc(db, 'users', selectedUser.id), { status: 'active' });
        fetchUsers(); // Refresh the user list
        setModalVisible(false); // Close the modal
      } catch (error) {
        console.error("Error unsuspending user: ", error);
      }
    }
  };

  const renderUserItem = ({ item }) => (
    <TouchableOpacity onPress={() => { setSelectedUser(item); setModalVisible(true); }}>
      <View style={styles.userRow}>
        <Text style={styles.userCell}>{item.username}</Text>
        <Text style={styles.userCell}>{item.subscriptionType}</Text>
        <Text style={styles.userCell}>{formatDate(item.registerTime)}</Text>
        <Text style={styles.userCell}>{item.status}</Text>
      </View>
    </TouchableOpacity>
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
          keyExtractor={(item) => item.id}
        />
      )}

      {selectedUser && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Account Details</Text>
              <Text>Username: {selectedUser.username}</Text>
              <Text>Type: {selectedUser.subscriptionType}</Text>
              <Text>Registered: {formatDate(selectedUser.registerTime)}</Text>
              <View style={styles.modalButtons}>
                <Button
                  title="Suspend"
                  onPress={handleSuspend}
                  disabled={selectedUser.status === 'suspended'}
                />
                <Button
                  title="Unsuspend"
                  onPress={handleUnsuspend}
                  disabled={selectedUser.status !== 'suspended'}
                />
              </View>
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default userSA;
