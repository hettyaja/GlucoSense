import { StyleSheet, Text, TouchableOpacity, View, Alert, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { printToFileAsync } from 'expo-print';
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import Header from '../components/Header';
import { router } from 'expo-router';
import ViewGlucoseLogsController from '../Controller/ViewGlucoseLogsController';
import ViewMealLogsController from '../Controller/ViewMealLogsController';
import ViewMedicineLogsController from '../Controller/ViewMedicineLogsController';
import { useAuth } from '../service/AuthContext';
import { Picker } from '@react-native-picker/picker';
import XLSX from 'xlsx';
import DateTimePicker from '@react-native-community/datetimepicker';

const exportReportUserUI = () => {
  const { user } = useAuth();
  const [glucoseLogs, setGlucoseLogs] = useState([]);
  const [medicineLogs, setMedicineLogs] = useState([]);
  const [mealLogs, setMealLogs] = useState([]);
  const [selectedLogType, setSelectedLogType] = useState('Glucose');
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      if (user) {
        try {
          const glucoseList = await ViewGlucoseLogsController.viewGlucoseLogs(user.uid);
          const mealList = await ViewMealLogsController.viewMealLogs(user.uid);
          const medicineList = await ViewMedicineLogsController.viewMedicineLogs(user.uid);
          setGlucoseLogs(glucoseList);
          setMealLogs(mealList);
          setMedicineLogs(medicineList);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchLogs();
  }, [user]);

  const filterLogsByDateRange = (logs) => {
    const start = new Date(startDate).setHours(0, 0, 0, 0);
    const end = new Date(endDate).setHours(23, 59, 59, 999);

    return logs.filter(log => {
      const logDate = new Date(log.time.seconds * 1000).setHours(0, 0, 0, 0);
      return logDate >= start && logDate <= end;
    });
  };

  const convertTimestamp = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return { dateString, timeString };
  };

  const generateTableHeaders = (type) => {
    if (type === 'Glucose') {
      return `
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Period</th>
          <th>Blood Sugar</th>
          <th>Notes</th>
        </tr>
      `;
    } else if (type === 'Meal') {
      return `
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Period</th>
          <th>Calories</th>
          <th>Carbs</th>
          <th>Protein</th>
          <th>Fat</th>
          <th>Notes</th>
        </tr>
      `;
    } else if (type === 'Medicine') {
      return `
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Medicine</th>
          <th>Notes</th>
        </tr>
      `;
    }
  };

  const generateTableRows = (logs, type) => {
    return logs.map(log => {
      const { dateString, timeString } = convertTimestamp(log.time);
      if (type === 'Glucose') {
        return `
          <tr>
            <td>${dateString}</td>
            <td>${timeString}</td>
            <td>${log.period}</td>
            <td>${log.glucose}</td>
            <td>${log.notes || ''}</td>
          </tr>
        `;
      } else if (type === 'Meal') {
        return `
          <tr>
            <td>${dateString}</td>
            <td>${timeString}</td>
            <td>${log.period}</td>
            <td>${log.calories}</td>
            <td>${log.carbs}</td>
            <td>${log.protein}</td>
            <td>${log.fat}</td>
            <td>${log.notes || ''}</td>
          </tr>
        `;
      } else if (type === 'Medicine') {
        const medicineString = Object.entries(log.medicine)
          .map(([name, amount]) => `${name}: ${amount}mg`)
          .join(', ');
        return `
          <tr>
            <td>${dateString}</td>
            <td>${timeString}</td>
            <td>${medicineString}</td>
            <td>${log.notes || ''}</td>
          </tr>
        `;
      }
    }).join('');
  };

  const generateHtml = (type, logs) => {
    const tableHeaders = generateTableHeaders(type);
    const tableRows = generateTableRows(logs, type);

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
          <h1>${type.toUpperCase()} LOGS</h1>
          <table>
              ${tableHeaders}
              ${tableRows}
          </table>
          <div class="footer">
              For more printable ${type.toLowerCase()} log sheets, please visit https://inkpx.com
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

  const exportAsPdf = async () => {
    try {
      let logs;
      if (selectedLogType === 'Glucose') logs = filterLogsByDateRange(glucoseLogs);
      else if (selectedLogType === 'Meal') logs = filterLogsByDateRange(mealLogs);
      else if (selectedLogType === 'Medicine') logs = filterLogsByDateRange(medicineLogs);

      const html = generateHtml(selectedLogType, logs);
      const { uri } = await printToFileAsync({ html });
      const base64Data = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      await pickDirectoryAndSaveFile(`${selectedLogType}_Logs.pdf`, base64Data, 'application/pdf');
    } catch (error) {
      console.error('Error generating or saving PDF:', error);
      Alert.alert('Error', 'An error occurred while generating or saving the PDF file.');
    }
  };

  const exportAsExcel = async () => {
    try {
      let logs;
      if (selectedLogType === 'Glucose') logs = filterLogsByDateRange(glucoseLogs);
      else if (selectedLogType === 'Meal') logs = filterLogsByDateRange(mealLogs);
      else if (selectedLogType === 'Medicine') logs = filterLogsByDateRange(medicineLogs);

      const tableRows = generateTableRows(logs, selectedLogType);
      const ws = XLSX.utils.json_to_sheet(tableRows.map(row => JSON.parse(row.match(/{.*?}/)[0])));
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Logs');

      const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
      await pickDirectoryAndSaveFile(`${selectedLogType}_Logs.xlsx`, wbout, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
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
      setEndDate(selectedDate);
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
              selectedValue={selectedLogType}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedLogType(itemValue)}
            >
              <Picker.Item label="Glucose" value="Glucose" />
              <Picker.Item label="Meal" value="Meal" />
              <Picker.Item label="Medicine" value="Medicine" />
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

export default exportReportUserUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
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
    borderBottomWidth: 0.5,
    borderColor: '#808080',
    marginHorizontal: 16,
  },
});
