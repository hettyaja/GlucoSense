import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../../firebase'; // Import the Firestore instance
import { collection, getDocs } from 'firebase/firestore';

const PartnerSA = () => {
  const [filter, setFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [businessPartner, setBusinessPartner] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinessPartners = async () => {
      try {
        const businessPartnersCollection = await getDocs(collection(db, 'businessPartners'));
        const businessPartnersData = businessPartnersCollection.docs.map(doc => doc.data());
        setBusinessPartner(businessPartnersData);
      } catch (error) {
        console.error("Error fetching business partners: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessPartners();
  }, []);

  const filteredBusinessPartners = businessPartner.filter(partner => {
    return (
      (filter ? partner.status === filter : true) &&
      (searchQuery ? partner.username.toLowerCase().includes(searchQuery.toLowerCase()) : true)
    );
  });

  const renderBusinessPartnerItem = ({ item }) => (
    <View style={styles.partnerRow}>
      <Text style={styles.partnerCell}>{item.username}</Text>
      <Text style={styles.partnerCell}>{item.stallName}</Text>
      <Text style={styles.partnerCell}>{new Date(item.registered.seconds * 1000).toLocaleDateString()}</Text>
      <Text style={[styles.partnerCell, item.status === 'Active' ? styles.activeStatus : styles.pendingStatus]}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Business Partner</Text>
        <TouchableOpacity style={styles.pendingBox}>
          <Text style={styles.pendingBoxText}>Pending</Text>
        </TouchableOpacity>
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
          <Picker.Item label="All" value="" />
          <Picker.Item label="Pending" value="Pending" />
          <Picker.Item label="Active" value="Active" />
        </Picker>
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderCell}>Username</Text>
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
          renderItem={renderBusinessPartnerItem}
          keyExtractor={(item) => item.username}
        />
      )}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Insight</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Users</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Partners</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Setting</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D9A37E',
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  pendingBox: {
    backgroundColor: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  pendingBoxText: {
    color: '#D9A37E',
    fontWeight: 'bold',
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 16,
    color: '#D9A37E',
  },
});

export default PartnerSA;
