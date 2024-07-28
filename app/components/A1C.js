import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { calculateA1C } from '../service/diaryService'; // Adjust the import path

const A1CComponent = ({ user }) => {
    const [a1c, setA1C] = useState(null);
  
    useEffect(() => {
      const fetchA1C = async () => {
        try {
          const a1cValue = await calculateA1C(user.uid);
          setA1C(a1cValue);
        } catch (error) {
          console.error('Error calculating A1C:', error);
        }
      };
  
      fetchA1C();
    }, [user.uid]);
  
    return (
      <Text style={styles.titleText}>
        A1C: {a1c !== null ? a1c : 'Calculating...'}
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