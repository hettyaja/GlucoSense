import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';

const ConnectBluetooth = () => {
  const [manager] = useState(new BleManager());
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [glucoseValue, setGlucoseValue] = useState();

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

      const services = await connectedDevice.services();
      for (const service of services) {
        console.log(`Service UUID: ${service.uuid}`);
        const characteristics = await service.characteristics();
        for (const characteristic of characteristics) {
          console.log(`Characteristic UUID: ${characteristic.uuid}, Properties: ${JSON.stringify(characteristic.properties)}`);
        }
      }

      // Monitor Glucose Measurement Characteristic
      manager.monitorCharacteristicForDevice(device.id,
        '00001808-0000-1000-8000-00805f9b34fb', // Glucose Service UUID
        '00002a18-0000-1000-8000-00805f9b34fb', // Glucose Measurement Characteristic UUID
        (error, characteristic) => {
          if (error) {
            console.log('Monitoring error:', error);
            return;
          }
          console.log('Raw characteristic value:', characteristic.value);
          const glucose = getValueFromBase64(characteristic.value);
          console.log(`Glucose: ${JSON.stringify(glucose)}`);
          setGlucoseValue(glucose);
        },
        'monitor-transaction-id' // Optional transaction ID for tracking
      );
      console.log('Monitoring started');
    } catch (error) {
      console.log('Connection error:', error);
    } finally {
      setLoading(false);
    }
  };

  const parseGlucoseMeasurement = (buffer) => {
    let offset = 0;
    const flags = buffer.readUInt8(offset++);
    const glucoseConcentration = buffer.readUInt16LE(offset);
    offset += 2;

    let timeOffset, typeSampleLocation, sensorStatus;
    if (flags & 0x01) { // Time Offset present
      timeOffset = buffer.readInt16LE(offset);
      offset += 2;
    }
    if (flags & 0x02) { // Type and Sample Location present
      typeSampleLocation = buffer.readUInt8(offset++);
    }
    if (flags & 0x04) { // Sensor Status Annunciation present
      sensorStatus = buffer.readUInt16LE(offset);
      offset += 2;
    }

    return {
      glucoseConcentration,
      timeOffset,
      typeSampleLocation,
      sensorStatus
    };
  };

  const getValueFromBase64 = (base64String) => {
    const buffer = Buffer.from(base64String, 'base64');
    console.log('Raw buffer:', buffer);
    return parseGlucoseMeasurement(buffer);
  };

  return (
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
    </View>
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
