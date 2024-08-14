import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useAuth } from '../service/AuthContext';
import GetPaymentDetailsController from '../Controller/GetPaymentDetailsController';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RadioButton from '../components/RadioButton'; // Assume you have a RadioButton component
import { usePaymentAndAddress } from '../context/PaymentAndAddressContext';
import PopupMenu from '../components/PopupMenu';
import UpdatePaymentDetailsController from '../Controller/UpdatePaymentDetailsController';
import DeletePaymentDetailsController from '../Controller/DeletePaymentDetailsController';

const PaymentMethod = () => {
  const { selectMode } = useLocalSearchParams();
  const { selectedCard, setSelectedCard } = usePaymentAndAddress(); // Use context to store selected card
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [cardDetails, setCardDetails] = useState([]);

  const fetchData = async () => {
    try {
      const details = await GetPaymentDetailsController.getPaymentDetails(user.uid);
      setCardDetails(details);
      if (selectMode) {
        const defaultCard = details.find(card => card.default);
        setSelectedCard(defaultCard || details[0]);
      }
    } catch (error) {
      console.error('Error fetching payment details:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleSelectCard = (card) => {
    setSelectedCard(card); // Update selected card in context
  };

  const handleBackPress = () => {
    router.back(); // Simply go back, context will keep the selected card
  };

  const handleDefault = async (card) => {
    await UpdatePaymentDetailsController.updatePaymentDetails(user.uid, card)
    fetchData();
  };

  const handleDelete = async (card) => {
    await DeletePaymentDetailsController.deletePaymentDetails(user.uid, card)
    fetchData();
  };

  return (
    <>
      <Header
        title='Manage payments'
        leftButton='Back'
        onLeftButtonPress={handleBackPress}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size={32} color="#E68B67" />
            </View>
          ) : (
            cardDetails.map((card, index) => (
              <View key={index}>
                <TouchableOpacity 
                  style={styles.row} 
                  onPress={() => selectMode ? handleSelectCard(card) : null }
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome name='cc-visa' size={24} color='grey' style={{ paddingRight: 8 }} />
                    <Text style={styles.label}>Visa (**** **** **** {card.cardNumber.slice(-4)})</Text>
                    {card.default && !selectMode && <Text style={styles.defaultLabel}>[DEFAULT]</Text>}
                  </View>
                  {selectMode ? (
                    <RadioButton selected={selectedCard?.cardNumber === card.cardNumber} />
                  ) : (
                    <PopupMenu
                    onDelete={() => handleDelete(card)}
                    setDefault={() => handleDefault(card)}
                  />
                  )}
                </TouchableOpacity>
                <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5, marginHorizontal: 16 }} />
              </View>
            ))
          )}
          {!selectMode && (
            <TouchableOpacity style={styles.row} onPress={() => router.push('Boundary/CardDetails')}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome name='credit-card-alt' size={24} color='grey' style={{ paddingRight: 8 }} />
                <Text style={styles.label}>Add Credit/Debit Card</Text>
              </View>
              <Ionicons name='chevron-forward' size={24} color='black' />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: 16,
  },
  container: {
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#808080',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    paddingVertical: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: 'green',
    marginLeft: 8,
  },
});
