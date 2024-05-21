import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RecipeContext } from './RecipeContext';
import RecipeCard from './RecipeCard';

const DraftPage = () => {
  const { drafts, removeDraft } = useContext(RecipeContext);
  const navigation = useNavigation();
  const [selectedDraft, setSelectedDraft] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  console.log('Drafts:', drafts);

  const handleDelete = (draftId) => {
    removeDraft(draftId);
    setModalVisible(false);
  };

  const filteredDrafts = drafts.filter(draft =>
    draft.title && draft.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log('Filtered Drafts:', filteredDrafts);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('./Image/X.png')} style={styles.headerButton} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>View Draft</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateRecipePage')}>
          <Image source={require('./Image/+.png')} style={styles.headerButton} />
        </TouchableOpacity>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('MenuRecipeManagementPage')}
        >
          <Text style={styles.tabButtonText}>Recipe</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, styles.activeTabButton]}
        >
          <Text style={[styles.tabButtonText, styles.activeTabButtonText]}>Draft</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBox}
          placeholder="Search Draft"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {filteredDrafts.map((draft) => (
          <View key={draft.id} style={styles.recipeCard}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                setSelectedDraft(draft);
                setModalVisible(true);
              }}
            >
              <Image source={require('./Image/triple-dots.png')} style={styles.threeDots} />
            </TouchableOpacity>
            <RecipeCard recipe={draft} />
          </View>
        ))}
        {selectedDraft && (
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
                  onPress={() => handleDelete(selectedDraft.id)}
                >
                  <Text style={styles.modalButtonText}>Delete this draft</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f28b54',
    padding: 15,
  },
  headerButton: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
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

export default DraftPage;
