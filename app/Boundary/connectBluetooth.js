import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';
import Header from '../components/Header';
import { router } from 'expo-router';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateGlucoseLogsController from '../Controller/CreateGlucoseLogsController';
import { useAuth } from '../service/AuthContext';
import * as Notifications from 'expo-notifications';

const serviceUUID = '00001808-0000-1000-8000-00805f9b34fb';
const characteristicUUIDs = {
  glucoseMeasurement: '00002a18-0000-1000-8000-00805f9b34fb',
  glucoseFeature: '00002a51-0000-1000-8000-00805f9b34fb',
  recordAccessControlPoint: '00002a52-0000-1000-8000-00805f9b34fb',
  dateTime: '00002a08-0000-1000-8000-00805f9b34fb',
};

const ConnectBluetooth = () => {
  const { user } = useAuth();
  const [manager] = useState(new BleManager());
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [glucoseValues, setGlucoseValues] = useState([]);
  const [deviceFound, setDeviceFound] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState(null);

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
      console.log('BLE Manager destroyed');
    };
  }, [manager]);

  useEffect(() => {
    const loadConnectedDevice = async () => {
      const device = await AsyncStorage.getItem('connectedDevice');
      if (device) {
        const parsedDevice = JSON.parse(device);
        setConnectedDevice(parsedDevice);
      }
    };

    loadConnectedDevice();
  }, []);

  const reconnectToDevice = async () => {
    if (!connectedDevice) return;

    setLoading(true);
    try {
      const newConnectedDevice = await manager.connectToDevice(connectedDevice.id);
      console.log(`Reconnected to device: ${newConnectedDevice.id}`);

      await newConnectedDevice.discoverAllServicesAndCharacteristics();
      console.log(`Discovered services and characteristics for device: ${newConnectedDevice.id}`);

      // Sync readings after reconnecting
      await syncAllReadings(newConnectedDevice);

    } catch (error) {
      console.log('Reconnection error:', error);
    } finally {
      setLoading(false);
    }
  };

  const scanDevices = () => {
    setDevices([]);
    setLoading(true);
    setIsScanning(true);
    setDeviceFound(false); // Reset device found state to false

    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log('Scan error:', error);
        setLoading(false);
        setIsScanning(false);
        return;
      }

      // Filter devices by the glucose meter service UUID
      if (device.serviceUUIDs && device.serviceUUIDs.includes(serviceUUID)) {
        setDevices((prevDevices) => {
          if (!prevDevices.some((d) => d.id === device.id) && device.name) {
            setDeviceFound(true); // Set device found state to true when a device is found
            return [...prevDevices, device];
          }
          return prevDevices;
        });
      }
    });
  };

  const connectToDevice = async (device) => {
    manager.stopDeviceScan();
    setLoading(true);

    try {
      const newConnectedDevice = await manager.connectToDevice(device.id);
      console.log(`Connected to device: ${newConnectedDevice.id}`);

      await newConnectedDevice.discoverAllServicesAndCharacteristics();
      console.log(`Discovered services and characteristics for device: ${newConnectedDevice.id}`);

      // Write to Record Access Control Point and monitor for indications
      await syncAllReadings(newConnectedDevice);

      // Save the connected device info to AsyncStorage
      await AsyncStorage.setItem('connectedDevice', JSON.stringify({
        id: newConnectedDevice.id,
        name: newConnectedDevice.name,
      }));

      // Set state to reflect the connected device
      setConnectedDevice({ id: newConnectedDevice.id, name: newConnectedDevice.name });

    } catch (error) {
      console.log('Connection error:', error);
    } finally {
      setLoading(false);
    }
  };

  const disconnectDevice = async () => {
    if (connectedDevice) {
      try {
        console.log(`Attempting to disconnect from device: ${connectedDevice.id}`);

        // await manager.cancelDeviceConnection(connectedDevice.id);
        console.log(`Disconnected from device: ${connectedDevice.id}`);
        await AsyncStorage.removeItem('connectedDevice');
        setConnectedDevice(null);
        setDeviceFound(false);
        setDevices([]);
        setIsScanning(false);

      } catch (error) {
        console.log('Disconnection error:', error);
      }
    }
  };

  const syncAllReadings = async (device) => {
    let syncCount = 0;

    try {

      manager.monitorCharacteristicForDevice(
        device.id,
        serviceUUID,
        characteristicUUIDs.recordAccessControlPoint,
        async (error, characteristic) => {
          if (error) {
            console.log('Glucose measurement notification error:', error);
            return;
          }
          if (characteristic) {
            return;
          }
        }
      );
      
      // Enable notifications for glucose measurements
      manager.monitorCharacteristicForDevice(
        device.id,
        serviceUUID,
        characteristicUUIDs.glucoseMeasurement,
        async (error, characteristic) => {
          if (error) {
            console.log('Glucose measurement notification error:', error);
            return;
          }
          const decodedData = decodeBuffer(characteristic.value);

          // Call the controller to create the glucose log with duplicate checking if from Bluetooth
          const success = await CreateGlucoseLogsController.createGlucoseLogs(user.uid, {
            period: 'Before Breakfast',
            glucose: decodedData.glucoseConcentration,
            time: decodedData.exactTime,
            notes: ''
          }, true); // true indicates data is from Bluetooth

          console.log(success)
          if (success) {
            syncCount += 1;
          }
        }
      );

      // Wait a moment to ensure all logs are processed
      setTimeout(async () => {
        // Send notification after syncing is complete
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Sync Complete',
            body: syncCount > 0
              ? `Successfully synced ${syncCount} glucose reading(s).`
              : 'No new glucose reading were found to sync.',
          },
          trigger: null, // Trigger immediately
        });
      }, 3000); // Adjust the delay as needed

      const allValuesRetriever = [0x01, 0x01];
      const allValuesRetrieverInBase64 = Buffer.from(allValuesRetriever).toString('base64');

      await manager.writeCharacteristicWithResponseForDevice(
        device.id,
        serviceUUID,
        characteristicUUIDs.recordAccessControlPoint,
        allValuesRetrieverInBase64
      );

      console.log('Write to RACP successful');



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
        title="Connect device"
        leftButton="Back"
        onLeftButtonPress={() => router.back()}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Quickly Connect and Sync Your Glucose Meter</Text>
        <Text style={styles.label}>1. Scan for nearby Bluetooth devices.</Text>
        <Text style={styles.label}>2. Connect your glucose meter easily.</Text>
        <Text style={styles.label}>3. Sync your glucose readings instantly.</Text>
        <Text style={styles.label}>4. Keep your health data up-to-date, all in one place!</Text>

        {connectedDevice ? (
          <>
          
          <View style={styles.connectedDeviceContainer}>
            <Text style={styles.connectedDeviceText}>
              Connected to {connectedDevice.name}
            </Text>
            

          </View>
          <TouchableOpacity style={styles.disconnectButton} onPress={disconnectDevice}>
            <Text style={styles.disconnectButtonText}>Disconnect</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.syncButton} onPress={reconnectToDevice}>
            <Text style={styles.syncButtonText}>Sync Readings</Text>
          </TouchableOpacity>
          </>
        ) : (
          <>
            {!isScanning ? (
              <TouchableOpacity style={styles.connectButton} onPress={scanDevices}>
                <Text style={styles.connectText}>Connect</Text>
              </TouchableOpacity>
            ) : (
              <>
                <Text style={styles.scanningText}>
                  {deviceFound ? "Select your glucose meter" : "Looking for devices..."}
                </Text>
                {!deviceFound && <ActivityIndicator size="large" color="#E58B68" />}
              </>
            )}

            {devices.length > 0 && (
              <FlatList
                data={devices}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => connectToDevice(item)}
                    style={styles.deviceButton}
                  >
                    <MaterialIcons name="sensors" size={32} />
                    <View style={{ paddingHorizontal: 8 }}>
                      <Text style={styles.deviceText}>{item.name}</Text>
                      <Text style={styles.deviceText2}>{item.id}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                ListFooterComponent={
                  deviceFound ? (
                    <>
                      <Text style={styles.moreDevicesText}>Not yours?</Text>
                      <Text style={styles.moreDevicesText2}>We are scanning for more...</Text>
                    </>
                  ) : null
                }
              />
            )}
          </>
        )}

        {glucoseValues.length > 0 && (
          <View>
            {glucoseValues.map((value, index) => (
              <View key={index}>
                <Text>Glucose value: {value.glucose} mg/dL</Text>
                <Text>
                  Time: {value.time ? value.time.toLocaleString() : "N/A"}
                </Text>
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
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },
  label: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
  connectButton: {
    backgroundColor: "#E58B68",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  connectText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "white",
  },
  scanningText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#000",
    marginTop: 40,
    marginBottom: 16,
    textAlign: "center",
  },
  moreDevicesText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#808080",
    marginTop: 16,
    textAlign: "center",
  },
  moreDevicesText2: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#808080",
    textAlign: "center",
  },
  deviceButton: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "#808080",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  deviceText: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
  deviceText2: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
  connectedDeviceContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  connectedDeviceText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    marginBottom: 10,
  },
  disconnectButton: {
    borderColor:'#E58B68',
    borderWidth:1,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  disconnectButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#E58B68",
  },
  syncButton: {
    backgroundColor: "#E58B68",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  syncButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "white",
  },
});

export default ConnectBluetooth;
