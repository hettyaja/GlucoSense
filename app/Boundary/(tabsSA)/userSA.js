import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FetchUsersController from '../../Controller/FetchUsersController';
import SuspendUserController from '../../Controller/SuspendUserController';
import UnsuspendUserController from '../../Controller/UnsuspendUserController';
import Header from '../../components/Header';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Modal from 'react-native-modal';

const UserSA = () => {
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
      const usersData = await FetchUsersController.fetchUsers();
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users: ", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    return (
      (filter === 'all users' || !filter || user.subscriptionType === filter) &&
      (searchQuery ? user.username?.toLowerCase().includes(searchQuery.toLowerCase()) : true)
    );
  });

  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.seconds) return "";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString() ;
  };

  const handleSuspend = async () => {
    if (selectedUser && selectedUser.status !== 'suspended') {
      try {
        await SuspendUserController.suspendUser(selectedUser.id);
        fetchUsers();
        setModalVisible(false);
      } catch (error) {
        console.error("Error suspending user: ", error);
      }
    }
  };

  const handleUnsuspend = async () => {
    if (selectedUser && selectedUser.status === 'suspended') {
      try {
        await UnsuspendUserController.unsuspendUser(selectedUser.id);
        fetchUsers();
        setModalVisible(false);
      } catch (error) {
        console.error("Error unsuspending user: ", error);
      }
    }
  };

  const renderUserItem = ({ item }) => (
    <TouchableOpacity onPress={() => { setSelectedUser(item); setModalVisible(true); }}>
      <View style={styles.userRow}>
        <Text style={styles.userCell}>{item.username}</Text>
        <Text style={[styles.userCell, {flex:1.5}]}>{item.subscriptionType}</Text>
        <Text style={[styles.userCell, {color:'grey'}]}>{formatDate(item.registerTime)}</Text>
        <Text style={[styles.userCell, {flex:1.5}]}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Header title="User Account" />
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <View style={styles.searchContainer}>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={filter}
                style={styles.dropdown}
                onValueChange={(itemValue) => setFilter(itemValue)}
              >
                <Picker.Item label="All" value="all users" style={styles.pickerItem} />
                <Picker.Item label="Free" value="free" style={styles.pickerItem} />
                <Picker.Item label="Premium" value="premium" style={styles.pickerItem} />
              </Picker>
            </View>
            <View style={styles.icons}>
              <Fontisto name='search' size={16} color='gray' />
              <TextInput
                style={styles.searchInput}
                placeholder="Search Account"
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
              />
            </View>
          </View>
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>Username</Text>
          <Text style={[styles.tableHeaderCell, {flex:1.5}]}>Type</Text>
          <Text style={styles.tableHeaderCell}>Registered</Text>
          <Text style={[styles.tableHeaderCell, {flex:1.5}]}>Status</Text>
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
            isVisible={modalVisible}
            animationType="slide"
            backdropOpacity={0.5}
            onBackdropPress={() => setModalVisible(false)}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Account Details</Text>
                <View>
                <Text>Username: {selectedUser.username}</Text>
                <Text >Type: {selectedUser.subscriptionType}</Text>
                <Text>Registered: {formatDate(selectedUser.registerTime)}</Text>
                </View>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      { backgroundColor: selectedUser.status === 'suspended' ? '#4CAF50' : '#ff4d4d' }
                    ]}
                    onPress={selectedUser.status === 'suspended' ? handleUnsuspend : handleSuspend}
                  >
                    <Text style={styles.buttonText}>
                      {selectedUser.status === 'suspended' ? 'Unsuspend' : 'Suspend'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  searchInput: {
    flex: 8,
    marginLeft: 16,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  pickerWrapper: {
    flex: 4.9,
    borderColor: '#ccc',
    borderRightWidth: 1,
  },
  searchContainer: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
  },
  dropdown: {
    fontSize: 10,
  },
  pickerItem: {
    fontSize: 14, // Customize font size here
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 8,
    alignItems:'center'
  },
  tableHeaderCell: {
    flex: 2,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'left',
    paddingLeft:16
    
  },
  userRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  userCell: {
    flex: 2,
    textAlign: 'left',
    paddingLeft:16,
    fontFamily: 'Poppins-Medium',
    
  },
  noUsers: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noUsersText: {
    fontSize: 18,
    color: '#ccc',
    fontFamily: "Poppins-Bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
  },
  icons: {
    flexDirection: 'row',
    flex: 8,
    alignItems: 'center',
    marginLeft: 16,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ccc',
    padding: 10,
    margin: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButton: {
    flex: 1,
    padding: 10,
    margin: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  h2:{
    flex: 1,
    textAlign: 'center',
    color: 'gray',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  }
  
});

export default UserSA;