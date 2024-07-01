import React, { useContext, useState } from 'react';
import { router, Tabs } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RecipeContext } from '../../context/RecipeContext';
import RecipeCard from '../../RecipeCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'

const foodBP = () => {
  const { recipes, removeRecipe } = useContext(RecipeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSection, setCurrentSection] = useState('Recipe');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleEdit = (recipe) => {
    setModalVisible(false);
    router.push({
      pathname: 'EditRecipePage',
      params: recipe,
    });
  };

  const handleDelete = (recipeId) => {
    removeRecipe(recipeId);
    setModalVisible(false);
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title && recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <Tabs.Screen options={{
        title: 'Menu Management',
        headerStyle: { backgroundColor: '#E58B68' },
        headerTitleStyle: { color: 'white', fontFamily: 'Poppins-Bold'},
        headerTitle: 'Menu Management',
        headerTitleAlign: 'center',
        headerRight: () => (
          <TouchableOpacity onPress={() => router.push('CreateRecipePage')} style={{marginRight:16}}>
            <MaterialIcons name='add' size={32} color='white'/>
          </TouchableOpacity>
        )
      }}/>
    <View style={{ flex: 1 }}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, currentSection === 'Menu' && styles.activeTabButton]}
          onPress={() => setCurrentSection('Recipe')}
        >
          <Text style={[styles.tabButtonText, currentSection === 'Menu' && styles.activeTabButtonText]}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, currentSection === 'Draft' && styles.activeTabButton]}
          onPress={() => setCurrentSection('Draft')}
        >
          <Text style={[styles.tabButtonText, currentSection === 'Draft' && styles.activeTabButtonText]}>Draft</Text>
        </TouchableOpacity>
        </View>

        {currentSection === 'Menu' ? (
          <>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchBox}
                placeholder="Search Menu"
                value={searchQuery}
                onChangeText={setSearchQuery}
              ></TextInput>
            </View>

      <ScrollView contentContainerStyle={{ padding: 20}}>
        {filteredRecipes.map((recipe) => (
          <View key={recipe.id} style={styles.recipeCard}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                setSelectedRecipe(recipe);
                setModalVisible(true);
              }}
            >
              <Feather name='more-vertical' size={24}/>
            </TouchableOpacity>
            <RecipeCard recipe={recipe} />
          </View>
        ))}
        {selectedRecipe && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => handleEdit(selectedRecipe)}
                >
                  <Text style={styles.modalButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => handleDelete(selectedRecipe.id)}
                >
                  <Text style={styles.modalButtonText}>Delete this recipe</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalCancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
          </>
        ) : (
          <>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchBox}
                placeholder="Search Menu"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <ScrollView contentContainerStyle={{ padding: 20}}>
        {filteredRecipes.map((recipe) => (
          <View key={recipe.id} style={styles.recipeCard}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                setSelectedRecipe(recipe);
                setModalVisible(true);
              }}
            >
              <Feather name='more-vertical' size={24}/>
            </TouchableOpacity>
            <RecipeCard recipe={recipe} />
          </View>
        ))}
        {selectedRecipe && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => handleEdit(selectedRecipe)}
                >
                  <Text style={styles.modalButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => handleDelete(selectedRecipe.id)}
                >
                  <Text style={styles.modalButtonText}>Delete this recipe</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalCancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
          </>
        )}
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
  },
  activeTabButton: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#f28b54',
  },
  tabButtonText: {
    fontSize: 16,
    color: '#000',
  },
  activeTabButtonText: {
    fontWeight: 'bold',
    color: '#f28b54',
  },
  searchContainer: {
    padding: 15,
  },
  searchBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  recipeCard: {
    marginBottom: 20,
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  threeDots: {
    width: 20,
    height: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: '#f28b54',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalCancelButton: {
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    borderColor: '#f28b54',
    borderWidth: 1,
  },
  modalCancelButtonText: {
    color: '#f28b54',
    fontSize: 16,
  },
});

export default foodBP;
