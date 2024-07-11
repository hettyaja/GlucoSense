import React, { useState, useContext, useEffect } from 'react';
import {SafeAreaView,StyleSheet,Text,TextInput, TouchableOpacity,View,Image,ScrollView,Modal,Button,FlatList,} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { router, useLocalSearchParams, Stack } from 'expo-router';

const EditMenuPage = () => {
  const { user } = useAuth();
  const { menuData } = useLocalSearchParams;
  const [parsedMenuData, setParsedMenuData] = useState (menuData ? JSON.parse(mealData) : null);
  
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  

  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const recipe = params;

  useEffect(() => {
    if (recipe) {
      setImage(recipe.image);
      setTitle(recipe.title);
      setPrice(recipe.price);
      setIngredients(recipe.ingredients);
     
    }
  }, [recipe]);

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

  const handleSave = () => {
    const updatedRecipe = {
      id: route.params.recipe.id,
      image,
      title,
      price,
      ingredients,
      sold: route.params.recipe.sold,
    };

    updateRecipe(updatedRecipe);
    navigation.navigate('MenuRecipeManagementPage');
  };

  const renderIngredientItem = ({ item, index }) => (
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
    </View>
  );


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name='chevron-back' size={32} color='white'/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Recipe</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.headerRightText}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageUploadContainer}>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          {!image && (
            <View style={styles.uploadBtnContainer}>
              <TouchableOpacity onPress={addImage} style={styles.uploadBtn}>
                <Image source={require('./assets/iconCarrier.png')} style={styles.uploadIcon} />
                <Text>{image ? 'Edit' : 'Upload'} Menu photo</Text>
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


          <View style={styles.cooktimeContainer}>
            

            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={() => {
                setIsModalVisible(!isModalVisible);
              }}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Button
                    title="Done"
                    onPress={() => {
                      setIsModalVisible(false);
                     
                    }}
                  />
                </View>
              </View>
            </Modal>
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
    backgroundColor: '#E58B68',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerRightText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: 'white',
  },
  imageUploadContainer: {
    alignItems: 'center',
    height: 200,
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 15,
    borderStyle: 'dotted',
    marginTop: 10,
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
    width: '100%',
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
  pickerContainer: {
    flexDirection: 'row',
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

export default EditMenuPage;
