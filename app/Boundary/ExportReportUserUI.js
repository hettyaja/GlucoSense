import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import Header from '../components/Header';
import { router } from 'expo-router';
import ViewGlucoseLogsController from '../Controller/ViewGlucoseLogsController';
import ViewMealLogsController from '../Controller/ViewMealLogsController';
import ViewMedicineLogsController from '../Controller/ViewMedicineLogsController';
import { useAuth } from '../service/AuthContext';
import { Picker } from '@react-native-picker/picker';
import XLSX from 'xlsx';

const exportReportUserUI = () => {
  const { user } = useAuth();
  const [glucoseLogs, setGlucoseLogs] = useState([]);
  const [medicineLogs, setMedicineLogs] = useState([]);
  const [mealLogs, setMealLogs] = useState([]);
  const [selectedLogType, setSelectedLogType] = useState('Glucose');

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

  const convertTimestamp = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const period = date.getHours() >= 12 ? 'PM' : 'AM';
    return { dateString, timeString, period };
  };

  const generateTableRows = (logs) => {
    return logs.map(log => {
      const { dateString, timeString, period } = convertTimestamp(log.time);
      return {
        Date: dateString,
        Time: timeString,
        Period: period,
        [selectedLogType === 'Glucose' ? 'Blood Sugar' : selectedLogType === 'Meal' ? 'Meal' : 'Medicine']: log[selectedLogType.toLowerCase()],
        Notes: log.notes || '',
      };
    });
  };

  const generateHtml = (type, logs) => {
    const tableRows = generateTableRows(logs);

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
              <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Period</th>
                  <th>${type === 'Glucose' ? 'Blood Sugar' : type === 'Meal' ? 'Meal' : 'Medicine'}</th>
                  <th>Notes</th>
              </tr>
              ${tableRows.map(row => `
                <tr>
                  <td>${row.Date}</td>
                  <td>${row.Time}</td>
                  <td>${row.Period}</td>
                  <td>${row[selectedLogType === 'Glucose' ? 'Blood Sugar' : selectedLogType === 'Meal' ? 'Meal' : 'Medicine']}</td>
                  <td>${row.Notes}</td>
                </tr>
              `).join('')}
          </table>
          <div class="footer">
              For more printable ${type.toLowerCase()} log sheets, please visit https://inkpx.com
          </div>
      </body>
      </html>
    `;
  };

  const handlePrint = async () => {
    try {
      let logs;
      if (selectedLogType === 'Glucose') logs = glucoseLogs;
      else if (selectedLogType === 'Meal') logs = mealLogs;
      else if (selectedLogType === 'Medicine') logs = medicineLogs;

      const html = generateHtml(selectedLogType, logs);
      const { uri } = await printToFileAsync({ html });
      await shareAsync(uri, { mimeType: 'application/pdf' });
    } catch (error) {
      console.error('Error generating or sharing PDF:', error);
    }
  };

  const exportToExcel = async () => {
    try {
      let logs;
      if (selectedLogType === 'Glucose') logs = glucoseLogs;
      else if (selectedLogType === 'Meal') logs = mealLogs;
      else if (selectedLogType === 'Medicine') logs = medicineLogs;

      const tableRows = generateTableRows(logs);
      const ws = XLSX.utils.json_to_sheet(tableRows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Logs');

      const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });

      const uri = FileSystem.cacheDirectory + `${selectedLogType}_Logs.xlsx`;
      await FileSystem.writeAsStringAsync(uri, wbout, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await Sharing.shareAsync(uri, {
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        dialogTitle: 'Export Excel',
        UTI: 'com.microsoft.excel.xlsx',
      });
    } catch (error) {
      console.error('Error exporting to Excel:', error);
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
        <Picker
          selectedValue={selectedLogType}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedLogType(itemValue)}
        >
          <Picker.Item label="Glucose" value="Glucose" />
          <Picker.Item label="Meal" value="Meal" />
          <Picker.Item label="Medicine" value="Medicine" />
        </Picker>
        <TouchableOpacity onPress={handlePrint} style={styles.button}>
          <Text style={styles.buttonText}>Export PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={exportToExcel} style={styles.button}>
          <Text style={styles.buttonText}>Export Excel</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default exportReportUserUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    height: 50,
    width: 150,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#E58B68',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
