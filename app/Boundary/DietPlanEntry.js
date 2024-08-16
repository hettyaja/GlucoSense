import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DietPlanEntry = ({ day, mealType, entry = { image: '', name: '', description: '', ingredients: '', carbs: '', protein: '', calorie: '', fat: '', sugar: '' }, setEntry, addEntryImage, tempImages = {} }) => {
  const tempUri = tempImages[`${day}_${mealType}`];

  return (
    <View style={styles.section}>
      <Text style={styles.dayTitle}>{mealType}</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Photo</Text>
        <TouchableOpacity onPress={() => addEntryImage(day, mealType)} style={styles.imageUpload}>
          {tempUri || entry.image ? (
            <Image source={{ uri: tempUri || entry.image }} style={styles.uploadedImage} />
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
      <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5}} />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Carbs (g)</Text>
        <TextInput placeholder="Carbs" value={entry.carbs} onChangeText={(text) => setEntry(day, mealType, { ...entry, carbs: text })} style={styles.input} />
      </View>
      <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5}} />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Protein (g)</Text>
        <TextInput placeholder="Protein" value={entry.protein} onChangeText={(text) => setEntry(day, mealType, { ...entry, protein: text })} style={styles.input} />
      </View>
      <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5}} />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Calories</Text>
        <TextInput placeholder="Calories" value={entry.calorie} onChangeText={(text) => setEntry(day, mealType, { ...entry, calorie: text })} style={styles.input} />
      </View>
      <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5}} />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Fat (g)</Text>
        <TextInput placeholder="Fat" value={entry.fat} onChangeText={(text) => setEntry(day, mealType, { ...entry, fat: text })} style={styles.input} />
      </View>
      <View style={{ borderBottomColor: '#808080', borderBottomWidth: 0.5}} />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sugar (g)</Text>
        <TextInput placeholder="Sugar" value={entry.sugar} onChangeText={(text) => setEntry(day, mealType, { ...entry, sugar: text })} style={styles.input} />
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
    textAlign: 'right',
  },
  input: {
    marginHorizontal: 16,
    textAlign: 'right',
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
