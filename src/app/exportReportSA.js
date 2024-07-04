import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import DatePicker from 'react-native-date-picker';

const ExportReportSA = () => {
  const router = useRouter();
  const [data, setData] = useState('Users');
  const [format, setFormat] = useState('PDF Report');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);

  const handleExport = () => {
    // Implement export logic here
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
            <TouchableOpacity onPress={() => setOpenStartDatePicker(true)} style={styles.datePicker}>
              <Text>{startDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            <DatePicker
              modal
              open={openStartDatePicker}
              date={startDate}
              mode="date"
              onConfirm={(date) => {
                setOpenStartDatePicker(false);
                setStartDate(date);
              }}
              onCancel={() => setOpenStartDatePicker(false)}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>End Date</Text>
            <TouchableOpacity onPress={() => setOpenEndDatePicker(true)} style={styles.datePicker}>
              <Text>{endDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            <DatePicker
              modal
              open={openEndDatePicker}
              date={endDate}
              mode="date"
              onConfirm={(date) => {
                setOpenEndDatePicker(false);
                setEndDate(date);
              }}
              onCancel={() => setOpenEndDatePicker(false)}
            />
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
