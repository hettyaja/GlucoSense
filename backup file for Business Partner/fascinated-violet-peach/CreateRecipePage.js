import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CreateRecipePage({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [serves, setServes] = useState(1);
  const [cookTime, setCookTime] = useState('');
  const [ingredients, setIngredients] = useState([{ key: '', value: '' }]);
  const [method, setMethod] = useState([{ key: '', value: '' }]);
  const [image, setImage] = useState(null);

  const handlePublish = () => {
    const recipe = { title, description, price, serves, cookTime, ingredients, method, image };
    navigation.navigate('RecipeManagement', { recipe });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/rectangle.png')}
        style={styles.header}
        imageStyle={styles.headerImage}
      >
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Create Menu & Recipe</Text>
        <TouchableOpacity style={styles.plusButton} onPress={() => {}}>
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </ImageBackground>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Text>Upload recipe photo</Text>
            )}
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
          />
          <View style={styles.servesContainer}>
            <Text>Serves</Text>
            <TouchableOpacity style={styles.servesButton} onPress={() => setServes(Math.max(1, serves - 1))}>
              <Text style={styles.servesButtonText}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.servesInput}
              value={String(serves)}
              onChangeText={(text) => {
                const num = parseInt(text, 10);
                if (!isNaN(num) && num > 0) {
                  setServes(num);
                }
              }}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.servesButton} onPress={() => setServes(serves + 1)}>
              <Text style={styles.servesButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Cook time"
            value={cookTime}
            onChangeText={setCookTime}
          />
          <Button title="Publish" onPress={handlePublish} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    resizeMode: 'cover',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 16,
  },
  plusButton: {
    position: 'absolute',
    top: 40,
    right: 16,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: 16,
  },
  formContainer: {
    flex: 1,
  },
  imagePicker: {
    width: '100%',
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  servesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  servesButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 15,
    marginHorizontal: 5,
  },
  servesButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  servesInput: {
    width: 60,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
    marginLeft: 10,
  },
});
