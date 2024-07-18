import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import ViewBusinessPartnerController from '../../Controller/ViewBusinessPartnerController';
import SuspendBusinessPartnerController from '../../Controller/SuspendBusinessPartnerController';
import UnsuspendBusinessPartnerController from '../../Controller/UnsuspendBusinessPartnerController';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../components/Header';
import ConfirmDialog from '../../components/ConfirmDialog';

const PartnerSA = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [businessPartner, setBusinessPartner] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBusinessPartners = async () => {
      try {
        const businessPartnerCollection = await ViewBusinessPartnerController.ViewBusinessPartner();
        setBusinessPartner(businessPartnerCollection);
      } catch (error) {
        console.error("Error fetching business partners: ", error);
      }
    };

    fetchBusinessPartners();
  }, []);

  const handleSuspend = async (id) => {
    setConfirmAction(() => async () => {
      try {
        await SuspendBusinessPartnerController.suspend(id);
        fetchBusinessPartners();
        setShowConfirm(false);
      } catch (error) {
        console.error("Error suspending business partner: ", error);
        alert('Failed to suspend Business Partner');
      }
    });
    setShowConfirm(true);
  };

  const handleUnsuspend = async (id) => {
    setConfirmAction(() => async () => {
      try {
        await UnsuspendBusinessPartnerController.unsuspend(id);
        fetchBusinessPartners();
        setShowConfirm(false);
      } catch (error) {
        console.error("Error unsuspending business partner: ", error);
        alert('Failed to unsuspend Business Partner');
      }
    });
    setShowConfirm(true);
  };

  const filteredBusinessPartners = businessPartner.filter(partner => {
    return searchQuery ? partner.name && partner.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
  });

  const renderBusinessPartnerItem = ({ item }) => (
    <TouchableOpacity style={styles.partnerRow} onPress={() => setSelectedPartner(item)}>
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
        {filteredBusinessPartners.length === 0 ? (
          <View style={styles.noPartners}>
            <Text style={styles.noPartnersText}>NO PARTNER REGISTERED</Text>
          </View>
        ) : (
          <FlatList
            data={filteredBusinessPartners}
            renderItem={renderBusinessPartnerItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
      {selectedPartner && (
        <Modal
          visible={!!selectedPartner}
          transparent
          animationType="fade"
          onRequestClose={() => setSelectedPartner(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsText}>Username: {selectedPartner.name}</Text>
                <Text style={styles.detailsText}>Stall Name: {selectedPartner.entityName}</Text>
                <Text style={styles.detailsText}>Registered: {selectedPartner.registerTime ? new Date(selectedPartner.registerTime.seconds * 1000).toLocaleDateString() : 'N/A'}</Text>
                <Text style={styles.detailsText}>Status: {selectedPartner.status}</Text>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.suspendButton}
                  onPress={() => handleSuspend(selectedPartner.id)}
                >
                  <Text style={styles.actionText}>Suspend</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.unsuspendButton}
                  onPress={() => handleUnsuspend(selectedPartner.id)}
                >
                  <Text style={styles.actionText}>Unsuspend</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setSelectedPartner(null)}
              >
                <Text style={styles.actionText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      <ConfirmDialog
        visible={showConfirm}
        onConfirm={confirmAction}
        onCancel={() => setShowConfirm(false)}
      />
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
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    fontSize: 16, // Ensure fontSize is a number
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
    fontSize: 14, // Ensure fontSize is a number
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
    fontSize: 16, // Ensure fontSize is a number
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
    fontSize: 14, // Ensure fontSize is a number
  },
  activeStatus: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 14, // Ensure fontSize is a number
  },
  pendingStatus: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14, // Ensure fontSize is a number
  },
  noPartners: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPartnersText: {
    fontSize: 18, // Ensure fontSize is a number
    color: '#ccc',
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 16,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default PartnerSA;
