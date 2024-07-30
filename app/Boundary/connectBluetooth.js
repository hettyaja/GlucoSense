import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, ActivityIndicator, Alert, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const SmartWearablePage = ({ route, navigation }) => {
  const manager = useMemo(() => new BleManager(), []);
  const [scannedDevices, setScannedDevices] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [glucoseData, setGlucoseData] = useState(null);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);

        const allGranted = Object.values(granted).every((result) => result === PermissionsAndroid.RESULTS.GRANTED);
        return allGranted;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const checkBluetooth = useCallback(async () => {
    try {
      const isEnabled = await manager.state();
      if (isEnabled !== 'PoweredOn') {
        Alert.alert('Bluetooth is not enabled');
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }, [manager]);

  const startDeviceScanning = useCallback(async () => {
    try {
      const isEnabled = await checkBluetooth();
      if (!isEnabled) {
        return;
      }

      const permission = await requestPermissions();
      if (!permission) {
        return;
      }

      setIsScanning(true);
      setScannedDevices([]);

      manager.startDeviceScan(null, null, (error, scannedDevice) => {
        if (error) {
          console.error(error);
          return;
        }

        if (!scannedDevice.name) {
          return;
        }

        setScannedDevices((prevDevices) => {
          if (!prevDevices.find((device) => device.id === scannedDevice.id)) {
            return [...prevDevices, scannedDevice];
          }
          return prevDevices;
        });
      });

      setTimeout(() => {
        manager.stopDeviceScan();
        setIsScanning(false);
      }, 20000);
    } catch (error) {
      console.log(error);
    }
  }, [checkBluetooth, manager]);

  const actionOnTap = async (item) => {
    console.log('Connecting to device: ' + item.name);
    let device;
    try {
      device = await manager.connectToDevice(item.id);
      console.log('Connected to device: ' + item.id);
      console.log('Status connected: ' + device.isConnected());

      await device.discoverAllServicesAndCharacteristics();
      const services = await device.services();

      console.log(services);

      services.forEach((service) => {
        console.log('Service UUID:', service.uuid);
      });

      // Save connected device to state
      setConnectedDevice(device);

      // Find the glucose service
      const glucoseService = services.find(service => service.uuid === '00001808-0000-1000-8000-00805f9b34fb');
      if (glucoseService) {
        console.log('Glucose service found');
        const characteristics = await glucoseService.characteristics();

        characteristics.forEach(async (characteristic) => {
          console.log('Characteristic UUID:', characteristic.uuid);
          if (characteristic.uuid === '00002a18-0000-1000-8000-00805f9b34fb') {
            console.log('Glucose measurement characteristic found');

            // Send connection signal
            const connectionSignal = Buffer.from([0x01]); // Example signal, adjust as needed
            await characteristic.writeWithResponse(connectionSignal.toString('base64'));
            console.log('Connection signal sent');

            const glucoseMeasurement = await characteristic.read();
            const glucoseValue = decodeGlucoseMeasurement(glucoseMeasurement.value);
            console.log('Glucose measurement data:', glucoseValue);
            setGlucoseData(glucoseValue);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const decodeGlucoseMeasurement = (value) => {
    const buffer = Buffer.from(value, 'base64');
    const flags = buffer.readUInt8(0);
    let offset = 1;
    const glucoseConcentration = buffer.readUInt16LE(offset) / 100.0;
    offset += 2;

    let unit = 'kg/L';
    if (flags & 0x01) {
      unit = 'mol/L';
    }

    return `${glucoseConcentration} ${unit}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.scannedDataView}>
        <Text>Scanned Devices</Text>
      </View>
      <Button title="Scan for Devices" onPress={startDeviceScanning} />
      {isScanning && <ActivityIndicator size="large" color="#0000ff" />}
      <FlatList
        data={scannedDevices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.device} onPress={() => actionOnTap(item)}>
            <Text>{item.name}</Text>
            <Text>{item.id}</Text>
          </TouchableOpacity>
        )}
      />
      {glucoseData && (
        <View style={styles.glucoseDataView}>
          <Text>Glucose Data: {glucoseData}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  device: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  scannedDataView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  glucoseDataView: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
});

export default SmartWearablePage;
