import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { db } from '../../firebase'; // Import the Firestore instance
import { collection, getDocs } from 'firebase/firestore';

const PartnerSA = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [businessPartner, setBusinessPartner] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBusinessPartners = async () => {
      try {
        const businessPartnersCollection = await getDocs(collection(db, 'businessPartners'));
        const businessPartnersData = businessPartnersCollection.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setBusinessPartner(businessPartnersData);
      } catch (error) {
        console.error("Error fetching business partners: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessPartners();
  }, []);

  const handlePendingClick = () => {
    router.push('/pendingAccountList');
  };

  const filteredBusinessPartners = businessPartner.filter(partner => {
    return searchQuery ? partner.username?.toLowerCase().includes(searchQuery.toLowerCase()) : true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Business Partner</Text>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Account"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity style={styles.pendingContainer} onPress={handlePendingClick}>
          <View style={styles.pendingSquare} />
          <Text style={styles.pendingText}>Pending</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderCell}>Name</Text>
        <Text style={styles.tableHeaderCell}>Stall Name</Text>
        <Text style={styles.tableHeaderCell}>Registered</Text>
        <Text style={styles.tableHeaderCell}>Status</Text>
      </View>
      {loading ? (
        <View style={styles.noPartners}>
          <Text style={styles.noPartnersText}>Loading...</Text>
        </View>
      ) : filteredBusinessPartners.length === 0 ? (
        <View style={styles.noPartners}>
          <Text style={styles.noPartnersText}>NO PARTNER REGISTERED</Text>
        </View>
      ) : (
        <FlatList
          data={filteredBusinessPartners}
          renderItem={({ item }) => (
            <View style={styles.partnerRow}>
              <Text style={styles.partnerCell}>{item.name}</Text>
              <Text style={styles.partnerCell}>{item.entityName}</Text>
              <Text style={styles.partnerCell}>{item.registerTime ? new Date(item.registerTime.seconds * 1000).toLocaleDateString() : 'N/A'}</Text>
              <Text style={[styles.partnerCell, item.status === 'Active' ? styles.activeStatus : styles.pendingStatus]}>{item.status}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
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
  pendingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    padding: 8,
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
  partnerRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  partnerCell: {
    flex: 1,
    textAlign: 'center',
  },
  activeStatus: {
    color: 'green',
    fontWeight: 'bold',
  },
  pendingStatus: {
    color: 'red',
    fontWeight: 'bold',
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
