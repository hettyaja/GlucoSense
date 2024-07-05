import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert, PermissionsAndroid } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import XLSX from 'xlsx';
import { db } from '../firebase'; // Update the path to your firebase.js
import { collection, getDocs } from 'firebase/firestore';

const ExportReportSA = () => {
  const router = useRouter();
  const [data, setData] = useState('Users');
  const [format, setFormat] = useState('Microsoft Excel');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const getPermissions = async () => {
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      let storagePermission = { status: 'granted' };

      if (Platform.OS === 'android') {
        storagePermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to your storage to save the exported files.',
            buttonPositive: 'OK',
          }
        );
      }

      if (mediaLibraryPermission.status === 'granted' && storagePermission === PermissionsAndroid.RESULTS.GRANTED) {
        setHasPermission(true);
      } else {
        Alert.alert('Permission required', 'This app needs storage access to save the exported files.');
      }
    };

    getPermissions();
  }, []);

  const handleExport = async () => {
    if (format === 'Microsoft Excel') {
      const dataToExport = await fetchData();
      if (dataToExport.length === 0) {
        Alert.alert('No data available for export.');
        return;
      }

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
      const excelFile = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });

      if (hasPermission) {
        try {
          const fileUri = `${FileSystem.documentDirectory}export.xlsx`;
          await FileSystem.writeAsStringAsync(fileUri, excelFile, {
            encoding: FileSystem.EncodingType.Base64,
          });

          const asset = await MediaLibrary.createAssetAsync(fileUri);
          const album = await MediaLibrary.getAlbumAsync('Download');
          if (album == null) {
            await MediaLibrary.createAlbumAsync('Download', asset, false);
          } else {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
          }

          Alert.alert('Export Successful', 'File saved to Downloads folder.');
        } catch (error) {
          console.log('Error creating asset:', error);
          Alert.alert('Export Failed', `There was an error saving the file: ${error.message}`);
        }
      } else {
        Alert.alert('Permission Denied', 'Permission to access storage was denied.');
      }
    }
  };

  const fetchData = async () => {
    let dataToExport = [];
    if (data === 'Users') {
      const usersCollection = await getDocs(collection(db, 'users'));
      dataToExport = usersCollection.docs.map(doc => doc.data());
    } else if (data === 'Business Partner') {
      const partnersCollection = await getDocs(collection(db, 'businessPartner'));
      dataToExport = partnersCollection.docs.map(doc => doc.data());
    }
    return dataToExport;
  };

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };

  const showStartPicker = () => {
    setShowStartDatePicker(true);
  };

  const showEndPicker = () => {
    setShowEndDatePicker(true);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-GB').format(date);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButtonContainer}>
          <Text style={styles.backButton}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Export Report</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Report</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Data</Text>
            <Picker
              selectedValue={data}
              style={styles.picker}
              onValueChange={(itemValue) => setData(itemValue)}
            >
              <Picker.Item label="Users" value="Users" />
              <Picker.Item label="Business Partner" value="Business Partner" />
            </Picker>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Format</Text>
            <Picker
              selectedValue={format}
              style={styles.picker}
              onValueChange={(itemValue) => setFormat(itemValue)}
            >
              <Picker.Item label="PDF Report" value="PDF Report" />
              <Picker.Item label="Microsoft Excel" value="Microsoft Excel" />
            </Picker>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Period</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Start Date</Text>
            <TouchableOpacity onPress={showStartPicker} style={styles.datePicker}>
              <Text>{formatDate(startDate)}</Text>
            </TouchableOpacity>
            {showStartDatePicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={onStartDateChange}
              />
            )}
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>End Date</Text>
            <TouchableOpacity onPress={showEndPicker} style={styles.datePicker}>
              <Text>{formatDate(endDate)}</Text>
            </TouchableOpacity>
            {showEndDatePicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={onEndDateChange}
              />
            )}
          </View>
        </View>
        <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
          <Text style={styles.exportButtonText}>Export</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9A37E',
    padding: 16,
  },
  backButtonContainer: {
    paddingRight: 16,
  },
  backButton: {
    fontSize: 18,
    color: '#fff',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  picker: {
    width: '50%',
  },
  datePicker: {
    width: '48%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
  },
  exportButton: {
    backgroundColor: '#D96B41',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32,
  },
  exportButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ExportReportSA;
