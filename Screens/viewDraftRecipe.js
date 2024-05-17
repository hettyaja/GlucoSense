import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import SearchBox from './SearchBox'; // Adjust the import path accordingly

//mport { AntDesign } from '@expo/vector-icons';

const ViewRecipe = () => {

  const [selectedButton, setSelectedButton] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectButton = (buttonName) => {
    setSelectedButton(buttonName);
  };
const clickRecipe = () => {
        // handle recipe button
        console.log('recipe button pressed');
        };

const clickDraft = () => {
        // handle recipe button
        console.log('draft button pressed');
        };

    
  const addImage = () => {
    // Function to handle image upload
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <Image  style={{position:"absolute", width: 1000}}
        source={require('./image/view.png')}/>
      <View  style={{
        flex:1,
        flexDirection: 'row'}}>
        <Image style={{ position:"absolute", alignItems: 'left', right: 370, top: 70}}
        source={require('./image/x.png')}/>
      </View>
      <View style={{ fontFamily: 'Poppins'}}>
      <Text style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginLeft: 120, marginBottom: 600, fontSize: 17, fontWeight: 'bold', color:'#FFFFFF'}}>View Draft
      </Text>
      </View>

      <View style={{
        flex:1,
        flexDirection: 'row-reverse'}}>
        <Image style={{position:"absolute", alignItems: 'right', left: 375, bottom: 670}}
        source={require('./image/plus.png')}/>
      </View>

    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[styles.buttonRecipe, selectedButton === 'recipe' ? styles.selectedButton : null]}
        onPress={() => handleSelectButton('recipe')}
      >
        <Text style={styles.buttonText}>Recipe</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonDraft, selectedButton === 'draft' ? styles.selectedButton : null]}
        onPress={() => handleSelectButton('draft')}
      >
        <Text style={styles.buttonText}>Draft</Text>
      </TouchableOpacity>
    </View>

    <View style={{borderWidth: 1,
    borderColor: '#ccc',
    width: 325,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 2, bottom: 650, backgroundColor: '#f0f0f0', marginLeft: 35}}>
     <SearchBox 
        placeholder="Search Draft"
        onChangeText={setSearchQuery}
        onPressSearch={handleSearch}
      />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 660,
    borderBottom: 15,
    borderColor: '#ccc',
  },
  buttonRecipe: {
    backgroundColor: '#eee',
    paddingHorizontal: 85,
    paddingVertical: 15,
    borderBottomRightRadius: 25
  },
  buttonDraft: {
    paddingHorizontal: 80,
    paddingVertical: 15,
  },
  buttonText: {
    fontSize: 17,
    textAlign: 'center',
  },
  selectedButton: {
    backgroundColor: '#077167', // Change to the desired highlight color
  },

});

export default ViewRecipe;
