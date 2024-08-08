import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';

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
          const glucoseMeasurement = Buffer.from(characteristic.value, 'base64');
          console.log(`Glucose Measurement: ${JSON.stringify(glucoseMeasurement)}`);
          setGlucoseValues((prevValues) => [...prevValues, glucoseMeasurement[12]]);
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

    const glucoseValue = buf[12]
    const flags = buf.readUInt8(0);
    const glucoseConcentration = buf.readUInt16LE(1);
    const timeOffset = buf.readInt16LE(3);
    const typeSampleLocation = buf.readUInt8(5);
    const sensorStatus = buf.readUInt16LE(6);

    return {
      glucoseValue,
      flags,
      glucoseConcentration,
      timeOffset,
      typeSampleLocation,
      sensorStatus
    };
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
      {glucoseValues.length > 0 && (
        <View>
          {glucoseValues.map((value, index) => (
            <View key={index}>
              <Text>Glucose value: {value} mg/dL</Text>
            </View>
          ))}
        </View>
      )}
      {racpResponses.length > 0 && (
        <View>
          <Text>RACP Responses:</Text>
          {racpResponses.map((response, index) => (
            <Text key={index}>{JSON.stringify(response)}</Text>
          ))}
        </View>
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
