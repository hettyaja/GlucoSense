import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DietPlanEntry = ({ day, mealType, entry = { image: '', name: '', description: '', ingredients: '' }, setEntry }) => {
  const addImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setEntry(day, mealType, { ...entry, image: result.assets[0].uri });
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.dayTitle}>{mealType}</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Photo</Text>
        <TouchableOpacity onPress={addImage} style={styles.imageUpload}>
          {entry.image ? (
            <Image source={{ uri: entry.image }} style={styles.uploadedImage} />
          ) : (
            <MaterialIcons name='add-photo-alternate' size={56} color='#E58B68'/>
          )}
        </TouchableOpacity>
      </View>
      <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5}} />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput placeholder="Name" value={entry.name} onChangeText={(text) => setEntry(day, mealType, { ...entry, name: text })} style={styles.input} />
      </View>
      <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5}} />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput placeholder="Description" value={entry.description} onChangeText={(text) => setEntry(day, mealType, { ...entry, description: text })} style={styles.input} />
      </View>
      <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5}} />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ingredients</Text>
        <TextInput placeholder="Ingredients" value={entry.ingredients} onChangeText={(text) => setEntry(day, mealType, { ...entry, ingredients: text })} style={styles.input} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#808080',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  input: {
    marginHorizontal: 16,
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginHorizontal: 16,
  },
  dayTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  imageUpload: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    width: 80,
    height: 80,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadedImage: { width: 56, height: 56, borderRadius: 10 },
});

export default DietPlanEntry;
