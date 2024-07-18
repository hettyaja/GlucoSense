import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import ConfirmDialog from '../../components/ConfirmDialog';

const PartnerSA = () => {
  const [businessPartners, setBusinessPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [isSuspendDialogVisible, setSuspendDialogVisible] = useState(false);
  const [isUnsuspendDialogVisible, setUnsuspendDialogVisible] = useState(false);
  const [isDetailDialogVisible, setDetailDialogVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchBusinessPartners = async () => {
      const partnersCollection = await getDocs(collection(db, 'businessPartner'));
      const partnersData = partnersCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBusinessPartners(partnersData);
    };
    fetchBusinessPartners();
  }, []);

  const handleSuspend = () => {
    setSuspendDialogVisible(true);
  };

  const handleUnsuspend = () => {
    setUnsuspendDialogVisible(true);
  };

  const confirmSuspend = async () => {
    try {
      // Call your suspend function here
      setSuspendDialogVisible(false);
      setDetailDialogVisible(false);
    } catch (error) {
      console.error('Error suspending business partner:', error);
    }
  };

  const confirmUnsuspend = async () => {
    try {
      // Call your unsuspend function here
      setUnsuspendDialogVisible(false);
      setDetailDialogVisible(false);
    } catch (error) {
      console.error('Error unsuspending business partner:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => {
        setSelectedPartner(item);
        setDetailDialogVisible(true);
      }}
    >
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.entityName}</Text>
      <Text style={styles.cell}>{item.registerTime ? new Date(item.registerTime.seconds * 1000).toLocaleDateString() : 'N/A'}</Text>
      <Text style={item.status === 'pending' ? styles.pendingCell : styles.cell}>{item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Business Partner</Text>
      </View>
      <View style={styles.searchContainer}>
        <Text style={styles.searchLabel}>Search Account</Text>
        <Text style={styles.pendingLabel}>Pending</Text>
      </View>
      <FlatList
        data={businessPartners}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Modal
        visible={isDetailDialogVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setDetailDialogVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {selectedPartner && (
              <>
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsText}>Username: {selectedPartner.name}</Text>
                  <Text style={styles.detailsText}>Stall Name: {selectedPartner.entityName}</Text>
                  <Text style={styles.detailsText}>Registered: {selectedPartner.registerTime ? new Date(selectedPartner.registerTime.seconds * 1000).toLocaleDateString() : 'N/A'}</Text>
                  <Text style={styles.detailsText}>Status: {selectedPartner.status}</Text>
                </View>
                <View style={styles.actionsContainer}>
                  <TouchableOpacity style={styles.suspendButton} onPress={handleSuspend}>
                    <Text style={styles.buttonText}>Suspend</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.unsuspendButton} onPress={handleUnsuspend}>
                    <Text style={styles.buttonText}>Unsuspend</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setDetailDialogVisible(false)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
      <ConfirmDialog
        visible={isSuspendDialogVisible}
        onCancel={() => setSuspendDialogVisible(false)}
        onConfirm={confirmSuspend}
        message="Are you sure you want to suspend this account?"
      />
      <ConfirmDialog
        visible={isUnsuspendDialogVisible}
        onCancel={() => setUnsuspendDialogVisible(false)}
        onConfirm={confirmUnsuspend}
        message="Are you sure you want to unsuspend this account?"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#D9A37E',
    padding: 16,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  searchLabel: {
    flex: 1,
  },
  pendingLabel: {
    color: 'red',
  },
  row: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  cell: {
    flex: 1,
  },
  pendingCell: {
    flex: 1,
    color: 'red',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  actionsContainer: {
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
    backgroundColor: 'grey',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PartnerSA;
