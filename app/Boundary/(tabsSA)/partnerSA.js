import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import ViewBusinessPartnerController from '../../Controller/ViewBusinessPartnerController';
import SuspendBusinessPartnerController from '../../Controller/SuspendBusinessPartnerController';
import UnsuspendBusinessPartnerController from '../../Controller/UnsuspendBusinessPartnerController';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../components/Header';

const PartnerSA = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [businessPartners, setBusinessPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSuspendAction, setIsSuspendAction] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchBusinessPartners = async () => {
      try {
        const businessPartnerCollection = await ViewBusinessPartnerController.ViewBusinessPartner();
        setBusinessPartners(businessPartnerCollection);
      } catch (error) {
        console.error('Error fetching business partners: ', error);
      }
    };

    fetchBusinessPartners();
  }, []);

  const handleSuspend = async () => {
    if (selectedPartner && selectedPartner.status !== 'suspended') {
      try {
        await SuspendBusinessPartnerController.suspend(selectedPartner.id);
        fetchBusinessPartners();
        setConfirmVisible(false);
        setModalVisible(false);
      } catch (error) {
        Alert.alert('Error', 'Failed to suspend Business Partner');
        console.error('Error suspending business partner: ', error);
      }
    }
  };

  const handleUnsuspend = async () => {
    if (selectedPartner && selectedPartner.status === 'suspended') {
      try {
        await UnsuspendBusinessPartnerController.unsuspend(selectedPartner.id);
        fetchBusinessPartners();
        setConfirmVisible(false);
        setModalVisible(false);
      } catch (error) {
        Alert.alert('Error', 'Failed to unsuspend Business Partner');
        console.error('Error unsuspending business partner: ', error);
      }
    }
  };

  const fetchBusinessPartners = async () => {
    try {
      const businessPartnerCollection = await ViewBusinessPartnerController.ViewBusinessPartner();
      setBusinessPartners(businessPartnerCollection);
    } catch (error) {
      console.error('Error fetching business partners: ', error);
    }
  };

  const renderBusinessPartnerItem = ({ item }) => (
    <TouchableOpacity
      style={styles.partnerRow}
      onPress={() => {
        setSelectedPartner(item);
        setModalVisible(true);
      }}
    >
      <Text style={styles.partnerCell}>{item.name}</Text>
      <Text style={styles.partnerCell}>{item.entityName}</Text>
      <Text style={styles.partnerCell}>{item.registerTime ? new Date(item.registerTime.seconds * 1000).toLocaleDateString() : 'N/A'}</Text>
      <Text style={[styles.partnerCell, item.status === 'active' ? styles.activeStatus : styles.pendingStatus]}>{item.status}</Text>
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
        {businessPartners.length === 0 ? (
          <View style={styles.noPartners}>
            <Text style={styles.noPartnersText}>NO PARTNER REGISTERED</Text>
          </View>
        ) : (
          <FlatList
            data={businessPartners}
            renderItem={renderBusinessPartnerItem}
            keyExtractor={(item) => item.id}
          />
        )}

        {selectedPartner && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsText}>Username: {selectedPartner.name}</Text>
                  <Text style={styles.detailsText}>Stall Name: {selectedPartner.entityName}</Text>
                  <Text style={styles.detailsText}>
                    Registered: {selectedPartner.registerTime ? new Date(selectedPartner.registerTime.seconds * 1000).toLocaleDateString() : 'N/A'}
                  </Text>
                  <Text style={styles.detailsText}>Status: {selectedPartner.status}</Text>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.suspendButton}
                    onPress={() => {
                      setIsSuspendAction(true);
                      setConfirmVisible(true);
                    }}
                  >
                    <Text style={styles.actionText}>Suspend</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.unsuspendButton}
                    onPress={() => {
                      setIsSuspendAction(false);
                      setConfirmVisible(true);
                    }}
                  >
                    <Text style={styles.actionText}>Unsuspend</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.actionText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

        {confirmVisible && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={confirmVisible}
            onRequestClose={() => setConfirmVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.confirmContainer}>
                <Text style={styles.confirmText}>
                  Are you sure you want to {isSuspendAction ? 'suspend' : 'unsuspend'} this account?
                </Text>
                <View style={styles.confirmButtons}>
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      if (isSuspendAction) {
                        handleSuspend();
                      } else {
                        handleUnsuspend();
                      }
                    }}
                  >
                    <Text style={styles.confirmButtonText}>Confirm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setConfirmVisible(false)}
                  >
                    <Text style={styles.confirmButtonText}>Cancel</Text>
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
  pendingSquare: {
    width: 20,
    height: 20,
    backgroundColor: '#ccc',
    marginRight: 8,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  suspendButton: {
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  unsuspendButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: 'gray',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  confirmText: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  confirmButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PartnerSA;
