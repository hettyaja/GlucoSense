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
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [actionType, setActionType] = useState('');
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

  const handleAction = (user, action) => {
    setSelectedUser(user);
    setActionType(action);
    setDialogVisible(true);
  };

  const confirmAction = async () => {
    try {
      if (actionType === 'suspend') {
        await SuspendBusinessPartnerController.suspend(selectedUser.id);
      } else if (actionType === 'unsuspend') {
        await UnsuspendBusinessPartnerController.unsuspend(selectedUser.id);
      }
      setDialogVisible(false);
      setSelectedUser(null);
      fetchBusinessPartners();
    } catch (error) {
      console.error(`Error performing action ${actionType} on user: `, error);
    }
  };

  const fetchBusinessPartners = async () => {
    try {
      const businessPartnerCollection = await ViewBusinessPartnerController.ViewBusinessPartner();
      setBusinessPartner(businessPartnerCollection);
    } catch (error) {
      console.error("Error fetching business partners: ", error);
    }
  };

  const filteredBusinessPartners = businessPartner.filter(partner => {
    return searchQuery ? partner.name && partner.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
  });

  const renderBusinessPartnerItem = ({ item }) => (
    <TouchableOpacity style={styles.partnerRow} onPress={() => handleAction(item, item.status === 'suspended' ? 'unsuspend' : 'suspend')}>
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
            keyExtractor={(item) => item.username}
          />
        )}
        <ConfirmDialog
          visible={dialogVisible}
          onConfirm={confirmAction}
          onCancel={() => setDialogVisible(false)}
          title="Confirmation"
          message={`Are you sure you want to ${actionType} this account?`}
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
});

export default PartnerSA;
