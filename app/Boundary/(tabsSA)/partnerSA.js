import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import ViewBusinessPartnerController from '../../Controller/ViewBusinessPartnerController';
import UnsuspendBusinessPartnerController from '../../Controller/UnsuspendBusinessPartnerController';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../components/Header';
import SuspendBusinessPartnerController from '../../Controller/SuspendBusinessPartnerController';
import Modal from 'react-native-modal';

const PartnerSA = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [businessPartner, setBusinessPartner] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchBusinessPartners();
  }, []);

  const fetchBusinessPartners = async () => {
    try {
      const businessPartnerCollection = await ViewBusinessPartnerController.ViewBusinessPartner();
      setBusinessPartner(businessPartnerCollection);
    } catch (error) {
      console.error("Error fetching business partners: ", error);
    }
  };

  const handleSuspend = async () => {
    if (selectedUser && selectedUser.status !== 'suspended') {
      try {

        await SuspendBusinessPartnerController.suspendBusinessPartner(selectedUser.id);
        fetchBusinessPartners();
        setModalVisible(false);
        setConfirmModalVisible(false);
      } catch (error) {
        console.error("Error suspending business partner: ", error);
        Alert.alert('Failed to suspend Business Partner');
      }
    }
  };

  const handleUnsuspend = async () => {
    if (selectedUser && selectedUser.status === 'suspended') {
      try {
        await UnsuspendBusinessPartnerController.unsuspendBusinessPartner(selectedUser.id);
        fetchBusinessPartners();
        setModalVisible(false);
        setConfirmModalVisible(false);
      } catch (error) {
        console.error("Error unsuspending business partner: ", error);
        Alert.alert('Failed to unsuspend Business Partner');
      }
    }
  };

  const openConfirmModal = (action) => {
    setConfirmAction(action);
    setConfirmModalVisible(true);
  };

  const renderBusinessPartnerItem = ({ item }) => (
    <TouchableOpacity
      style={styles.partnerRow}
      onPress={() => {
        setSelectedUser(item);
        setModalVisible(true);
      }}
    >
      <Text style={styles.partnerCell}>{item.name}</Text>
      <Text style={styles.partnerCell}>{item.entityName}</Text>
      <Text style={styles.partnerCell}>{item.registerTime ? new Date(item.registerTime.seconds * 1000).toLocaleDateString() : 'N/A'}</Text>
      <Text style={[styles.partnerCell, item.status === 'Active' ? styles.activeStatus : styles.pendingStatus]}>{item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <Header title="Business Partner" />
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Account"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <TouchableOpacity style={styles.pendingContainer} onPress={() => router.push('/Boundary/pendingAccountList')}>
            <AntDesign name="form" size={24} />
            <Text style={styles.pendingText}>Pending</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>Username</Text>
          <Text style={styles.tableHeaderCell}>Stall Name</Text>
          <Text style={styles.tableHeaderCell}>Registered</Text>
          <Text style={styles.tableHeaderCell}>Status</Text>
        </View>
        {businessPartner.length === 0 ? (
          <View style={styles.noPartners}>
            <Text style={styles.noPartnersText}>NO PARTNER REGISTERED</Text>
          </View>
        ) : (
          <FlatList
            data={businessPartner}
            renderItem={renderBusinessPartnerItem}
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
                  <Text>Username: {selectedUser.name}</Text>
                  <Text>Stall Name: {selectedUser.entityName}</Text>
                  <Text>Registered: {selectedUser.registerTime ? new Date(selectedUser.registerTime.seconds * 1000).toLocaleDateString() : 'N/A'}</Text>
                  <Text>Status: {selectedUser.status}</Text>
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

      <Modal
        isVisible={confirmModalVisible}
        animationType="slide"
        backdropOpacity={0.5}
        onBackdropPress={() => setConfirmModalVisible(false)}
        onRequestClose={() => setConfirmModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmation</Text>
            <Text style={styles.detailsText}>Are you sure you want to {confirmAction} this account?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setConfirmModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  if (confirmAction === 'suspend') {
                    handleSuspend(selectedUser.id);
                  } else {
                    handleUnsuspend(selectedUser.id);
                  }
                }}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    fontSize: 16,
  },
  pendingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  pendingText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
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
    fontSize: 16,
  },
  partnerRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  partnerCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
  },
  activeStatus: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 14,
  },
  pendingStatus: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14,
  },
  noPartners: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPartnersText: {
    fontSize: 18,
    color: '#ccc',
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
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
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
  icons: {
    flexDirection: 'row',
    flex: 8,
    alignItems: 'center',
    marginLeft: 16,
  },
});

export default PartnerSA;