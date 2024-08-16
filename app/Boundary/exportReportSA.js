import { StyleSheet, Text, TouchableOpacity, View, Alert, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { printToFileAsync } from 'expo-print';
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import { router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import XLSX from 'xlsx';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../components/Header';
import FetchUsersController from '../Controller/FetchUsersController';
import ViewBusinessPartnerController from '../Controller/ViewBusinessPartnerController';
import { useAuth } from '../service/AuthContext';

const exportReportSA = () => {
  const { user } = useAuth();
  const [userList, setUserList] = useState([]);
  const [businessPartnerList, setBusinessPartnerList] = useState([]);
  const [selectedData, setSelectedData] = useState('User');
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const userList = await FetchUsersController.fetchUsers();
          const businessPartnerList = await ViewBusinessPartnerController.ViewBusinessPartner();
          setUserList(userList);
          setBusinessPartnerList(businessPartnerList);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [user]);

  const filterDataByDateRange = (data) => {
    const start = new Date(startDate).setHours(0, 0, 0, 0);
    const end = new Date(endDate).setHours(23, 59, 59, 999);

    return data.filter(item => {
      const itemDate = new Date(item.registerTime.seconds * 1000).setHours(0, 0, 0, 0);
      return itemDate >= start && itemDate <= end;
    });
  };

  const convertTimestamp = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return { dateString, timeString };
  };

  const generateTableHeaders = (type) => {
    if (type === 'User') {
      return `
        <tr>
          <th>Email</th>
          <th>Name</th>
          <th>Username</th>
          <th>Register Time</th>
          <th>Status</th>
          <th>Subscription Type</th>
          <th>Height</th>
          <th>Weight</th>
          <th>Gender</th>
        </tr>
      `;
    } else if (type === 'Business Partner') {
      return `
        <tr>
          <th>Email</th>
          <th>Entity Name</th>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Register Time</th>
          <th>Address</th>
          <th>UEN</th>
          <th>City</th>
          <th>Status</th>
          <th>Postal</th>
        </tr>
      `;
    }
  };

  const generateTableRows = (data, type) => {
    return data.map(item => {
      const { dateString, timeString } = convertTimestamp(item.registerTime);
      if (type === 'User') {
        return `
          <tr>
            <td>${item.email}</td>
            <td>${item.name}</td>
            <td>${item.username}</td>
            <td>${dateString} ${timeString}</td>
            <td>${item.status}</td>
            <td>${item.subscriptionType}</td>
            <td>${item.height}</td>
            <td>${item.weight}</td>
            <td>${item.gender}</td>
          </tr>
        `;
      } else if (type === 'Business Partner') {
        return `
          <tr>
            <td>${item.email}</td>
            <td>${item.entityName}</td>
            <td>${item.name}</td>
            <td>${item.phoneNum}</td>
            <td>${dateString} ${timeString}</td>
            <td>${item.address}</td>
            <td>${item.UEN}</td>
            <td>${item.city}</td>
            <td>${item.status}</td>
            <td>${item.postal}</td>
          </tr>
        `;
      }
    }).join('');
  };

  const generateHtml = (type, data) => {
    const tableHeaders = generateTableHeaders(type);
    const tableRows = generateTableRows(data, type);

    return `
      <html>
      <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          <style>
              body {
                  font-family: Arial, sans-serif;
                  text-align: center;
              }
              table {
                  width: 100%;
                  border-collapse: collapse;
              }
              th, td {
                  border: 1px solid black;
                  padding: 8px;
                  text-align: left;
              }
              th {
                  background-color: #f2f2f2;
              }
              h1 {
                  font-size: 24px;
              }
              .footer {
                  margin-top: 20px;
                  font-size: 12px;
                  color: grey;
              }
          </style>
      </head>
      <body>
          <h1>${type.toUpperCase()} DATA</h1>
          <table>
              ${tableHeaders}
              ${tableRows}
          </table>
          <div class="footer">
              For more printable ${type.toLowerCase()} data sheets, please visit https://inkpx.com
          </div>
      </body>
      </html>
    `;
  };

  const pickDirectoryAndSaveFile = async (fileName, fileData, mimeType) => {
    try {
      const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted) {
        Alert.alert('Error', 'Directory permission not granted');
        return;
      }

      const uri = await StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, mimeType);
      await FileSystem.writeAsStringAsync(uri, fileData, { encoding: FileSystem.EncodingType.Base64 });
      Alert.alert('Success', `File saved to ${uri}`);
    } catch (e) {
      console.error('Error saving file:', e);
      Alert.alert('Error', 'An error occurred while saving the file.');
    }
  };

  const generateExcelData = (data, type) => {
    return data.map(item => {
      const { dateString, timeString } = convertTimestamp(item.registerTime);
      if (type === 'User') {
        return {
          Email: item.email,
          Name: item.name,
          Username: item.username,
          'Register Time': `${dateString} ${timeString}`,
          Status: item.status,
          'Subscription Type': item.subscriptionType,
          Height: item.height,
          Weight: item.weight,
          Gender: item.gender
        };
      } else if (type === 'Business Partner') {
        return {
          Email: item.email,
          'Entity Name': item.entityName,
          Name: item.name,
          'Phone Number': item.phoneNum,
          'Register Time': `${dateString} ${timeString}`,
          Address: item.address,
          UEN: item.UEN,
          City: item.city,
          Status: item.status,
          Postal: item.postal
        };
      }
    });
  };

  const exportAsPdf = async () => {
    try {
      let data;
      if (selectedData === 'User') data = filterDataByDateRange(userList);
      else if (selectedData === 'Business Partner') data = filterDataByDateRange(businessPartnerList);

      const html = generateHtml(selectedData, data);
      const { uri } = await printToFileAsync({ html });
      const base64Data = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      await pickDirectoryAndSaveFile(`${selectedData}_Data.pdf`, base64Data, 'application/pdf');
    } catch (error) {
      console.error('Error generating or saving PDF:', error);
      Alert.alert('Error', 'An error occurred while generating or saving the PDF file.');
    }
  };

  const exportAsExcel = async () => {
    try {
      let data;
      if (selectedData === 'User') data = filterDataByDateRange(userList);
      else if (selectedData === 'Business Partner') data = filterDataByDateRange(businessPartnerList);

      const excelData = generateExcelData(data, selectedData);
      const ws = XLSX.utils.json_to_sheet(excelData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Data');

      const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
      await pickDirectoryAndSaveFile(`${selectedData}_Data.xlsx`, wbout, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      Alert.alert('Error', 'An error occurred while exporting the Excel file.');
    }
  };

  const handleExport = async () => {
    if (selectedFormat === 'pdf') {
      await exportAsPdf();
    } else if (selectedFormat === 'xlsx') {
      await exportAsExcel();
    }
  };

  const onStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate !== undefined) {
      setStartDate(selectedDate);
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate !== undefined) {
      const today = new Date();
      // If the selected end date is later than today, set it to today
      if (selectedDate > today) {
        setEndDate(today);
        Alert.alert('Invalid Date', 'End date cannot be in the future.');
      } else {
        setEndDate(selectedDate);
      }
    }
  };

  return (
    <>
      <Header
        title='Export'
        leftButton='Back'
        onLeftButtonPress={() => router.back()}
      />
      <View style={styles.container}>
        <Text style={styles.sectionText}>Report</Text>
        <View style={styles.section}>
          <View style={styles.item}>
            <Text style={styles.itemText}>Data</Text>
            <Picker
              selectedValue={selectedData}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedData(itemValue)}
            >
              <Picker.Item label="User" value="User" />
              <Picker.Item label="Business Partner" value="Business Partner" />
            </Picker>
          </View>
          <View style={styles.divider} />
          <View style={styles.item}>
            <Text style={styles.itemText}>Format</Text>
            <Picker
              selectedValue={selectedFormat}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedFormat(itemValue)}
            >
              <Picker.Item label="PDF" value="pdf"/>
              <Picker.Item label="Excel" value="xlsx"/>
            </Picker>
          </View>
        </View>
        <Text style={styles.sectionText}>Period</Text>
        <View style={styles.section}>
          <View style={styles.item}>
            <Text style={styles.itemText}>Start Date</Text>
            <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
              <Text style={styles.itemText}>{startDate.toLocaleDateString()}</Text>
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
          <View style={styles.divider} />
          <View style={styles.item}>
            <Text style={styles.itemText}>End Date</Text>
            <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
              <Text style={styles.itemText}>{endDate.toLocaleDateString()}</Text>
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
        <TouchableOpacity onPress={handleExport} style={styles.button}>
          <Text style={styles.buttonText}>Export</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default exportReportSA;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  sectionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#808080',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: 'black',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  picker: {
    height: 40,
    width: 150,
  },
  button: {
    backgroundColor: 'white',
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#E58B68',
    padding: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 16,
  },
});
