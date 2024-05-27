import React, { useState, useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, Modal, Button, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { RecipeContext } from './context/RecipeContext';
import { Stack, router } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const CreateRecipePage = () => {
  const { addRecipe, addDraft } = useContext(RecipeContext);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [serves, setServes] = useState(1);
  const [ingredients, setIngredients] = useState([]);
  const [methods, setMethods] = useState([]);
  const [selectedTime, setSelectedTime] = useState({
    hours: '0',
    minutes: '0',
  });


  const [selectedHour, setSelectedHour] = useState('0');
  const [selectedMinute, setSelectedMinute] = useState('0');
  const [isModalVisible, setIsModalVisible] = useState(false);


  const decrementServes = () => {
    if (serves > 1) {
      setServes(serves - 1);
    }
  };
  const incrementServes = () => {
    setServes(serves + 1);
  };

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
      setImage(result.assets[0].uri);
    }
  };

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: ingredients.length.toString(), text: '' },
    ]);
  };

  const deleteIngredient = (id) => {
    setIngredients(ingredients.filter((item) => item.id !== id));
  };

  const addMethod = () => {
    setMethods([...methods, { id: methods.length.toString(), text: '' }]);
  };

  const deleteMethod = (id) => {
    setMethods(methods.filter((item) => item.id !== id));
  };

  const handlePublish = () => {
    const newRecipe = {
      id: Date.now().toString(),
      image,
      title,
      price,
      serves,
      selectedTime: `${selectedTime.hours} hour ${selectedTime.minutes} min`,
      ingredients,
      methods,
      sold: 1,
    };

    console.log('New Recipe:', newRecipe);

    if (image && title && price && serves && selectedTime && ingredients.length > 0 && methods.length > 0) {
      addRecipe(newRecipe);
      router.push('foodBP')
    } else {
      addDraft(newRecipe);
      router.push('foodBP')
    }
  };

  const renderIngredientItem = ({ item, index }) => (
    <View style={styles.ingredientContainer}>
      <View style={{flexDirection:'row', alignItems:'center'}}>
        <Text style={{fontFamily:'Poppins-Regular', fontSize:14}}>{index+1}. </Text>
        <TextInput 
          style={styles.ingredientInput}
          placeholder={' Add ingredient'}
          value={item.text}
          onChangeText={(text) => {
          const updatedIngredients = [...ingredients];
          updatedIngredients[index].text = text;
          setIngredients(updatedIngredients);
          }}
        />
        <TouchableOpacity onPress={() => deleteIngredient(item.id)}>
          <FontAwesome name="trash" size={20} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderMethodItem = ({ item, index }) => (
    <View style={styles.ingredientContainer}>
      <View style={{flexDirection:'row', alignItems:'center'}}>
        <Text style={{fontFamily:'Poppins-Regular', fontSize:14}}>{index+1}. </Text>
          <TextInput
          style={styles.ingredientInput}
          placeholder={`Step ${index + 1}`}
          value={item.text}
          onChangeText={(text) => {
            const updatedMethods = [...methods];
            updatedMethods[index].text = text;
            setMethods(updatedMethods);
          }}
        />
        <TouchableOpacity onPress={() => deleteMethod(item.id)}>
        <FontAwesome name="trash" size={20} color="gray" />
        </TouchableOpacity>
      </View>
     

    </View>
  );

  return (
    <>
      <Stack.Screen options={{
      title: 'Create Menu & Recipe',
      headerStyle: { backgroundColor: '#E58B68' },
      headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold'},
      headerTitle: 'Create Menu & Recipe',
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.back('foodBP')}>
          <Ionicons name='chevron-back' size={32} color='white'/>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => handlePublish()}>
          <Text style={{fontFamily: 'Poppins-SemiBold', fontSize:14, color:'white'}}>Publish</Text>
        </TouchableOpacity>
      ),
    }}/>
    
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageUploadContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.uploadBtnContainer}>
              <TouchableOpacity onPress={addImage} style={styles.uploadBtn}>
                <Image source={require('../assets/iconCarrier.png')} style={styles.uploadIcon} />
                <Text>{image ? 'Edit' : 'Upload'} Recipe photo</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Title:"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
          />
        </View>

        <View style={styles.containerBox}>
          <View style={styles.servescooktimeContainer}>
            <Text style={styles.labelText}>Serves</Text>
            <View style={styles.servesButtonsContainer}>
              <TouchableOpacity onPress={decrementServes} style={styles.plusminusButton}>
                <Text style={styles.plusminusSymbol}>-</Text>
              </TouchableOpacity>
              <Text style={styles.servesText}>{serves}</Text>
              <TouchableOpacity onPress={incrementServes} style={styles.plusminusButton}>
                <Text style={styles.plusminusSymbol}>+</Text>
              </TouchableOpacity>
              <Text style={styles.people}>People</Text>
            </View>
          </View>

          <View style={styles.cooktimeContainer}>
            <Text style={styles.labelText}>Cooktime</Text>
            <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.selectTimeButton}>
              <Text style={styles.selectTimeButtonText}>
                {selectedTime.hours !== '0' || selectedTime.minutes !== '0'
                  ? ` ${selectedTime.hours} hour ${selectedTime.minutes} min`
                  : 'Select Time'}
              </Text>
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={() => {
                setIsModalVisible(!isModalVisible);
              }}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Picker
                    selectedValue={selectedHour}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedHour(itemValue)}>
                    {Array.from({ length: 24 }, (_, i) => (
                      <Picker.Item key={i} label={`${i} hr`} value={`${i}`} />
                    ))}
                  </Picker>
                  <Picker
                    selectedValue={selectedMinute}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedMinute(itemValue)}>
                    {Array.from({ length: 60 }, (_, i) => (
                      <Picker.Item key={i} label={`${i} min`} value={`${i}`} />
                    ))}
                  </Picker>
                  <Button
                    title="Done"
                    onPress={() => {
                      setIsModalVisible(false);
                      setSelectedTime({
                        hours: selectedHour,
                        minutes: selectedMinute,
                      });
                    }}
                  />
                </View>
              </View>
            </Modal>
          </View>
        </View>

        <View style={styles.containerBox}>
          <Text style={styles.labelText2}>Ingredients</Text>
          <FlatList
            data={ingredients}
            renderItem={renderIngredientItem}
            keyExtractor={(item) => item.id}
            extraData={ingredients}
          />
          <TouchableOpacity onPress={addIngredient} style={styles.addIngredientButton}>
            <Text style={styles.addIngredientButtonText}>+ Ingredient</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerBox}>
          <Text style={styles.labelText2}>Method</Text>
          <FlatList
            data={methods}
            renderItem={renderMethodItem}
            keyExtractor={(item) => item.id}
            extraData={methods}
          />
          <TouchableOpacity onPress={addMethod} style={styles.addMethodButton}>
            <Text style={styles.addMethodButtonText}>+ Step</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1 
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal:16
  },
  imageUploadContainer: {
    alignItems: 'center',
    height: 200,
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 15,
    borderStyle: 'dotted',
    marginVertical: 16,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  uploadBtnContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIcon: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingBottom: 2,
    marginVertical: 10,
    width: '100',
  },
  // ============================
  ingredientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ingredientInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginRight: 10,
    paddingVertical: 5,
    fontFamily:'Poppins-Regular',
    fontSize:14,
    flex:1
  },







  input: {
    fontFamily: 'Poppins',
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    paddingVertical: 1,
    paddingLeft: 5,
    borderColor: '#E58B68',
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 18,
    color: 'rgba(0,0,0,0.5)',
  },
  input2: {
    fontFamily: 'Poppins',
    flex: 1,
    height: 100,
    backgroundColor: '#fff',
    paddingVertical: 3,
    paddingLeft: 5,
    borderColor: '#E58B68',
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 18,
    color: 'rgba(0,0,0,0.5)',
  },
  containerBox: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    marginBottom: 10,
    borderColor: '#E58B68',
    borderWidth: 1,
    borderRadius: 15,
    width: '100%',
  },
  servescooktimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  servesButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 64,
  },
  labelText: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
    marginRight: 10,
  },
  labelText2: {
    fontFamily: 'Poppins',
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
    marginRight: 10,
  },
  servesText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#333',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E58B68',
    borderRadius: 8,
    padding: 6,
  },
  plusminusSymbol: {
    fontSize: 25,
    color: '#FFF',
    fontWeight: 'bold',
  },
  plusminusButton: {
    backgroundColor: '#E58B68',
    borderRadius: 8,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  people: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  cooktimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  selectTimeButton: {
    fontFamily: 'Poppins',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    borderColor: '#E58B68',
    borderWidth: 1,
    marginLeft: 41,
  },
  selectTimeButtonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '80%',
  },
  addIngredientButton: {
    alignSelf: 'stretch',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addIngredientButtonText: {
    color: '#333',
    fontSize: 17,
    fontFamily: 'Poppins',
  },
  addMethodButton: {
    alignSelf: 'stretch',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addMethodButtonText: {
    color: '#000000',
    fontSize: 17,
    fontFamily: 'Poppins',
  },
});

export default CreateRecipePage;
