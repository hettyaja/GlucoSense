import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Modal,
  Button,
  FlatList,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const App = () => {
  const [serves, setServes] = useState(1);
  const [image, setImage] = useState(null);
  const [selectedHour, setSelectedHour] = useState('0');
  const [selectedMinute, setSelectedMinute] = useState('0');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [methods, setMethods] = useState([]); // State for methods

  const decrementServes = () => {
    if (serves > 1) {
      setServes(serves - 1);
    }
  };

  const incrementServes = () => {
    setServes(serves + 1);
  };

  const addImage = () => {
    // Function to handle image upload
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

  const renderIngredientItem = ({ item, index }) => {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={`Ingredient ${index + 1}`}
          value={item.text}
          onChangeText={(text) => {
            const updatedIngredients = [...ingredients];
            updatedIngredients[index].text = text;
            setIngredients(updatedIngredients);
          }}
        />
        <TouchableOpacity onPress={() => deleteIngredient(item.id)}>
          <AntDesign name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderMethodItem = ({ item, index }) => {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={`Step ${index + 1}`}
          value={item.text}
          onChangeText={(text) => {
            const updatedMethods = [...methods];
            updatedMethods[index].text = text;
            setMethods(updatedMethods);
          }}
        />
        <TouchableOpacity onPress={() => deleteMethod(item.id)}>
          <AntDesign name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          style={{ position: 'absolute', justifyContent: 'center' }}
          source={require('./src/assets/Rectangle.png')}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <Image
            style={{ position: 'absolute', alignItems: 'left', top: 69 }}
            source={require('./src/assets/X.png')}
          />
        </View>
        <View style={{ fontFamily: 'Poppins' }}>
          <Text
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 80,
              marginBottom: 55,
              fontSize: 17,
              fontWeight: 'bold',
              color: '#FFFFFF',
              top: 69,
            }}>
            Create Menu & Recipe
          </Text>
        </View>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => {}}
            style={styles.publishButtonContainer}>
            <Text style={styles.publishButtonText}>Publish</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageUploadContainer}>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <View style={styles.uploadBtnContainer}>
            <Image
              style={{ position: 'absolute', justifyContent: 'center',top:25 }}
              source={require('./src/assets/iconCarrier.png')}
            />
            <TouchableOpacity onPress={addImage} style={styles.uploadBtn}>
              <Text>{image ? 'Edit' : 'Upload'} Recipe photo</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Title:"
            keyboardType="default"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input2}
            placeholder="Description"
            keyboardType="default"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Price"
            keyboardType="default"
          />
        </View>

        <View style={styles.containerBox}>
          <View style={styles.servescooktimeContainer}>
            <Text style={styles.labelText}>Serves</Text>
            <View style={styles.servesButtonsContainer}>
              <TouchableOpacity
                onPress={decrementServes}
                style={styles.plusminusButton}>
                <Text style={styles.plusminusSymbol}>-</Text>
              </TouchableOpacity>
              <Text style={styles.servesText}>{serves}</Text>
              <TouchableOpacity
                onPress={incrementServes}
                style={styles.plusminusButton}>
                <Text style={styles.plusminusSymbol}>+</Text>
              </TouchableOpacity>
              <Text style={styles.people}>People</Text>
            </View>
          </View>

          <View style={styles.cooktimeContainer}>
            <Text style={styles.labelText}>Cooktime</Text>
            <TouchableOpacity
              onPress={() => setIsModalVisible(true)}
              style={styles.selectTimeButton}>
              <Text style={styles.selectTimeButtonText}>Select Time</Text>
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
                    onPress={() => setIsModalVisible(false)}
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
          <TouchableOpacity
            onPress={addIngredient}
            style={styles.addIngredientButton}>
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
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
  },
 
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20, // Add horizontal padding to the content
  },

  publishButtonContainer: {
    borderRadius: 13,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    left: 290,
    bottom: 18,
  },
  publishButtonText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#FFFFFF',
  },
  imageUploadContainer: {
    alignItems: 'center',
    height: 200,
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 15,
    borderStyle: 'dotted',
    marginTop: 10,
    width: '100%', // Ensure the container spans the entire width
  },
  image: {
    width: '100%',
    height: '100%',
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingBottom: 2,
    marginVertical: 10,
    width: '100%', // Ensure the container spans the entire width
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
    color: 'rgba(0,0,0,0.5)', // Set the text color to translucent black
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
    color: 'rgba(0,0,0,0.5)', // Set the text color to translucent black
  },
  containerBox: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    marginBottom: 10,
    borderColor: '#E58B68',
    borderWidth: 1,
    borderRadius: 15,
    width: '100%', // Ensure the container spans the entire width
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
    marginLeft: 64, // Adjust this plusminusbtn to move the buttons further right
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
    borderRadius: 8, // Added border radius to make it square
    padding: 6, // Added padding for spacing
  },
  plusminusSymbol: {
    fontSize: 25,
    color: '#FFF',
    fontWeight: 'bold',
  },
  plusminusButton: {
    backgroundColor: '#E58B68',
    borderRadius: 8, // Changed border radius to make it square
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
    backgroundColor: '#fff', // Set background color to white
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    borderColor: '#E58B68', // Set border color
    borderWidth: 1, // Add border width
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

export default App;
