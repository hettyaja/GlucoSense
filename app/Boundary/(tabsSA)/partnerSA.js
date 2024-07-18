import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import ViewBusinessPartnerController from '../../Controller/ViewBusinessPartnerController';
import SuspendBusinessPartnerController from '../../Controller/SuspendBusinessPartnerController';
import UnsuspendBusinessPartnerController from '../../Controller/UnsuspendBusinessPartnerController';
import ConfirmDialog from '../../components/ConfirmDialog';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../components/Header';

const PartnerSA = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [businessPartner, setBusinessPartner] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [action, setAction] = useState('');
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

  const handleShowDetails = (partner) => {
    setSelectedPartner(partner);
  };

  const handleSuspend = async () => {
    if (selectedPartner) {
      try {
        await SuspendBusinessPartnerController.suspendBusinessPartner(selectedPartner.id);
        alert('Business Partner suspended successfully');
        setConfirmDialogVisible(false);
        setSelectedPartner(null);
        fetchBusinessPartners();
      } catch (error) {
        console.error("Error suspending business partner: ", error);
        alert('Failed to suspend Business Partner');
      }
    }
  };

  const handleUnsuspend = async () => {
    if (selectedPartner) {
      try {
        await UnsuspendBusinessPartnerController.unsuspendBusinessPartner(selectedPartner.id);
        alert('Business Partner unsuspended successfully');
        setConfirmDialogVisible(false);
        setSelectedPartner(null);
        fetchBusinessPartners();
      } catch (error) {
        console.error("Error unsuspending business partner: ", error);
        alert('Failed to unsuspend Business Partner');
      }
    }
  };

  const confirmAction = (action) => {
    setAction(action);
    setConfirmDialogVisible(true);
  };

  const executeAction = () => {
    if (action === 'suspend') {
      handleSuspend();
    } else if (action === 'unsuspend') {
      handleUnsuspend();
    }
  };

  const filteredBusinessPartners = businessPartner.filter(partner => {
    return searchQuery ? partner.name && partner.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
  });

  const renderBusinessPartnerItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.partnerRow}
      onPress={() => handleShowDetails(item)}
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
        {selectedPartner && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsText}>Account Details</Text>
            <Text style={styles.detailsText}>Username: {selectedPartner.name}</Text>
            <Text style={styles.detailsText}>Stall Name: {selectedPartner.entityName}</Text>
            <Text style={styles.detailsText}>Registered: {selectedPartner.registerTime ? new Date(selectedPartner.registerTime.seconds * 1000).toLocaleDateString() : 'N/A'}</Text>
            <Text style={styles.detailsText}>Status: {selectedPartner.status}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.suspendButton} onPress={() => confirmAction('suspend')}>
                <Text style={styles.actionText}>Suspend</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.unsuspendButton} onPress={() => confirmAction('unsuspend')}>
                <Text style={styles.actionText}>Unsuspend</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setSelectedPartner(null)}>
                <Text style={styles.actionText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <ConfirmDialog
          visible={confirmDialogVisible}
          title="Confirmation"
          message={`Are you sure you want to ${action} this account?`}
          onCancel={() => setConfirmDialogVisible(false)}
          onConfirm={executeAction}
        />
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
  detailsContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 16,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    backgroundColor: 'grey',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PartnerSA;
