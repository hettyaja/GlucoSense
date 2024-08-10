import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';
import Header from '../components/Header';
import { router } from 'expo-router';

const serviceUUID = '00001808-0000-1000-8000-00805f9b34fb';
const characteristicUUIDs = {
  glucoseMeasurement: '00002a18-0000-1000-8000-00805f9b34fb',
  glucoseFeature: '00002a51-0000-1000-8000-00805f9b34fb',
  recordAccessControlPoint: '00002a52-0000-1000-8000-00805f9b34fb',
  dateTime: '00002a08-0000-1000-8000-00805f9b34fb',
};

const ConnectBluetooth = () => {
  const [manager] = useState(new BleManager());
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [glucoseValues, setGlucoseValues] = useState([]);
  const [racpResponses, setRacpResponses] = useState([]);

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 23) {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);
        if (
          granted['android.permission.ACCESS_FINE_LOCATION'] !== PermissionsAndroid.RESULTS.GRANTED ||
          granted['android.permission.BLUETOOTH_SCAN'] !== PermissionsAndroid.RESULTS.GRANTED ||
          granted['android.permission.BLUETOOTH_CONNECT'] !== PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Permissions denied');
          return;
        }
      }
    };
    requestPermissions();
    return () => {
      manager.destroy();
    };
  }, [manager]);

  const scanDevices = () => {
    setDevices([]);
    setLoading(true);

    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log('Scan error:', error);
        setLoading(false);
        return;
      }
      setDevices((prevDevices) => {
        if (!prevDevices.some((d) => d.id === device.id) && device.name) {
          return [...prevDevices, device];
        }
        return prevDevices;
      });
    });

    setTimeout(() => {
      manager.stopDeviceScan();
      setLoading(false);
    }, 10000);
  };

  const connectToDevice = async (device) => {
    manager.stopDeviceScan();
    setLoading(true);

    try {
      const connectedDevice = await manager.connectToDevice(device.id);
      console.log(`Connected to device: ${connectedDevice.id}`);

      await connectedDevice.discoverAllServicesAndCharacteristics();
      console.log(`Discovered services and characteristics for device: ${connectedDevice.id}`);

      


      // Write to Record Access Control Point and monitor for indications
      await syncAllReadings(connectedDevice);

    } catch (error) {
      console.log('Connection error:', error);
    } finally {
      setLoading(false);
    }
  };

  const syncAllReadings = async (device) => {
    try {

      // Enable notifications for glucose measurements
      manager.monitorCharacteristicForDevice(
        device.id,
        serviceUUID,
        characteristicUUIDs.glucoseMeasurement,
        (error, characteristic) => {
          if (error) {
            console.log('Glucose measurement notification error:', error);
            return;
          }
          // const glucoseMeasurement = Buffer.from(characteristic.value, 'base64');
          const decodedData = decodeBuffer(characteristic.value);
        
          // console.log('Decoded Glucose Measurement:', decodedData);
          // console.log(`Glucose Measurement: ${JSON.stringify(glucoseMeasurement)}`);
          setGlucoseValues((prevValues) => [
            ...prevValues,
            {
              glucose: decodedData.glucoseConcentration,
              time: decodedData.exactTime,
            },
          ]);
        }
      );

      const allValuesRetriever = [0x01, 0x01];
      const allValuesRetrieverInBase64 = Buffer.from(allValuesRetriever).toString('base64');

      await manager.writeCharacteristicWithResponseForDevice(
        device.id,
        serviceUUID,
        characteristicUUIDs.recordAccessControlPoint,
        allValuesRetrieverInBase64
      );

      console.log('Write to RACP successful');

      // return () => {
      //   subscription.remove();
      // };

    } catch (err) {
      console.error('Error syncing all readings:', err);
    }
  };

  const decodeBuffer = (base64String) => {
    const buf = Buffer.from(base64String, 'base64');
    console.log('Raw buffer:', buf);
  
    const flags = buf.readUInt8(0);  // Byte 0: Flags
    let index = 3;
  
    // Base Time (Bytes 3-9)
    let year = buf.readUInt16LE(index); // Bytes 3-4
    let month = buf.readUInt8(index + 2); // Byte 5
    let day = buf.readUInt8(index + 3); // Byte 6
    let hours = buf.readUInt8(index + 4); // Byte 7
    let minutes = buf.readUInt8(index + 5); // Byte 8
    let seconds = buf.readUInt8(index + 6); // Byte 9
    index += 7;
  
    // Adjust the year correctly (ensure no early 1900s interpretation)
    if (year < 1900) {
      year += 2000; // Adjust for the century if needed
    }
  
    const baseTime = new Date(year, month - 1, day, hours, minutes, seconds);
  
    // Time Offset (Bytes 10-11)
    let timeOffset = buf.readInt16LE(index);
    index += 2;
  
    let exactTime = new Date(baseTime);
    if (timeOffset !== null && !isNaN(timeOffset)) {
      exactTime.setUTCMinutes(baseTime.getUTCMinutes() + timeOffset);
    }
  
    console.log('Decoded Base Time (UTC):', baseTime);
    console.log('Decoded Exact Time with Offset (UTC):', exactTime);
    console.log('Decoded Glucose Concentration:', buf.readUInt8(12)); // Assuming glucose concentration is at byte 12
  
    return {
      glucoseConcentration: buf.readUInt8(12),
      baseTime,
      timeOffset,
      exactTime,
    };
  };

  return (
    <>
    <Header
      title='Connect device'
      leftButton='Back'
      onLeftButtonPress={() => router.back()}
    />
    <View style={styles.container}>
      <Button title="Scan for Devices" onPress={scanDevices} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {devices.length > 0 && (
        <FlatList
          data={devices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => connectToDevice(item)}>
              <Text style={styles.deviceText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      {glucoseValues.length > 0 && (
        <View>
          {glucoseValues.map((value, index) => (
            <View key={index}>
              <Text>Glucose value: {value.glucose} mg/dL</Text>
              <Text>Time: {value.time ? value.time.toLocaleString() : 'N/A'}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  deviceText: {
    fontSize: 18,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ConnectBluetooth;
