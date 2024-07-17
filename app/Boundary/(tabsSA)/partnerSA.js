import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
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
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [actionType, setActionType] = useState('');
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
    if (selectedPartner && selectedPartner.status !== 'suspended') {
      try {
        await SuspendBusinessPartnerController.suspend(selectedPartner.id);
        fetchBusinessPartners();
        setConfirmDialogVisible(false);
      } catch (error) {
        console.error("Error suspending business partner: ", error);
      }
    }
  };

  const handleUnsuspend = async () => {
    if (selectedPartner && selectedPartner.status === 'suspended') {
      try {
        await UnsuspendBusinessPartnerController.unsuspend(selectedPartner.id);
        fetchBusinessPartners();
        setConfirmDialogVisible(false);
      } catch (error) {
        console.error("Error unsuspending business partner: ", error);
      }
    }
  };

  const handleConfirm = () => {
    if (actionType === 'suspend') {
      handleSuspend();
    } else if (actionType === 'unsuspend') {
      handleUnsuspend();
    }
  };

  const filteredBusinessPartners = businessPartner.filter(partner => {
    return searchQuery ? partner.name && partner.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
  });

  const renderBusinessPartnerItem = ({ item }) => (
    <View style={styles.partnerRow}>
      <Text style={styles.partnerCell}>{item.name}</Text>
      <Text style={styles.partnerCell}>{item.entityName}</Text>
      <Text style={styles.partnerCell}>{item.registerTime ? new Date(item.registerTime.seconds * 1000).toLocaleDateString() : 'N/A'}</Text>
      <Text style={[styles.partnerCell, item.status === 'Active' ? styles.activeStatus : styles.pendingStatus]}>{item.status}</Text>
      <View style={styles.actionButtons}>
        {item.status === 'Active' ? (
          <TouchableOpacity onPress={() => {
            setSelectedPartner(item);
            setActionType('suspend');
            setConfirmMessage(`Are you sure you want to suspend this account?`);
            setConfirmDialogVisible(true);
          }}>
            <Text style={styles.actionText}>Suspend</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => {
            setSelectedPartner(item);
            setActionType('unsuspend');
            setConfirmMessage(`Are you sure you want to unsuspend this account?`);
            setConfirmDialogVisible(true);
          }}>
            <Text style={styles.actionText}>Unsuspend</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
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
            keyExtractor={(item) => item.username}
          />
        )}
      </View>
      <ConfirmDialog
        visible={confirmDialogVisible}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmDialogVisible(false)}
        message={confirmMessage}
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
    justifyContent: 'space-around',
  },
  actionText: {
    color: '#007BFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 4,
  },
});

export default PartnerSA;
