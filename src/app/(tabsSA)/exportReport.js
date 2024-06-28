import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const ExportReport = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Export Report</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Report</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Data</Text>
          <Text style={styles.value}>Users</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Format</Text>
          <Text style={styles.value}>PDF Report</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Period</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Start Date</Text>
          <Text style={styles.value}>31/05/2024</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>End Date</Text>
          <Text style={styles.value}>13/06/2024</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.exportButton}>
        <Text style={styles.exportButtonText}>Export</Text>
      </TouchableOpacity>
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
  backText: {
    color: '#fff',
    fontSize: 18,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
  exportButton: {
    backgroundColor: '#D9A37E',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  exportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExportReport;
