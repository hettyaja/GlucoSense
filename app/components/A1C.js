import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FetchA1cController from '../Controller/FetchA1cController';

const A1CComponent = ({ user }) => {
    const [a1c, setA1C] = useState(null);
  
    useEffect(() => {
      const fetchA1C = async () => {
        try {
          const a1cValue = await FetchA1cController.fetchA1C(user.uid);
          // Set A1C to '--' if the value is 0
          setA1C(a1cValue == '0' ? '--' : a1cValue);
        } catch (error) {
          console.error('Error calculating A1C:', error);
        }
      };
  
      fetchA1C();
    }, [user.uid]);
  
    return (
      <Text style={styles.titleText}>
        A1C: {a1c !== null ? a1c : '--'}
      </Text>
    );
  };
  
  const styles = StyleSheet.create({
    titleText: {
      fontFamily: 'Poppins-Medium',
      fontSize: 18,
      color: 'white'
    }
  });
  
  export default A1CComponent;
