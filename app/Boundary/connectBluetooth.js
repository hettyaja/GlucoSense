import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, PermissionsAndroid, Platform, Alert } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import base64 from 'react-native-base64';

const bleManager = new BleManager();

const BluetoothComponent = () => {
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [glucoseData, setGlucoseData] = useState(null);

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
          console.log('Some permissions are not granted');
        }
      }
    };

    requestPermissions();

    const subscription = bleManager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        console.log('Bluetooth is on');
      }
    }, true);

    return () => {
      subscription.remove();
      bleManager.destroy();
    };
  }, []);

  const startScan = () => {
    setDevices([]);
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error(error);
        return;
      }

      if (device && device.name) {
        setDevices((prevDevices) => {
          if (!prevDevices.find((d) => d.id === device.id)) {
            return [...prevDevices, device];
          }
          return prevDevices;
        });
      }
    });

    setTimeout(() => {
      bleManager.stopDeviceScan();
      console.log('Scanning stopped');
    }, 5000);
  };

  const connectToDevice = async (device) => {
    try {
      console.log(`Attempting to connect to device: ${device.name} (${device.id})`);
      await bleManager.stopDeviceScan();

      const connectedDevice = await bleManager.connectToDevice(device.id, { autoConnect: true });
      setConnectedDevice(connectedDevice);
      console.log(`Connected to device: ${connectedDevice.name} (${connectedDevice.id})`);

      await connectedDevice.discoverAllServicesAndCharacteristics();
      console.log('Services and characteristics discovered');

      const services = await connectedDevice.services();
      for (const service of services) {
        const characteristics = await service.characteristics();
        for (const characteristic of characteristics) {
          if (characteristic.isReadable) {
            const characteristicData = await characteristic.read();
            const decodedData = base64.decode(characteristicData.value);
            console.log(`Characteristic ${characteristic.uuid}:`, decodedData);
          }
        }
      }
    } catch (error) {
      console.error('Connection or data reading error:', error);
      Alert.alert('Connection or data reading error', error.message);
    }
  };

  const disconnectFromDevice = async () => {
    if (connectedDevice) {
      try {
        await bleManager.cancelDeviceConnection(connectedDevice.id);
        console.log('Disconnected from ' + connectedDevice.id);
        setConnectedDevice(null);
        setGlucoseData(null);
      } catch (error) {
        console.error('Disconnection error:', error);
        Alert.alert('Disconnection error', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Start Scan" onPress={startScan} />
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.deviceContainer}>
            <Text>{item.name}</Text>
            <Button title="Connect" onPress={() => connectToDevice(item)} />
          </View>
        )}
      />
      {connectedDevice && (
        <View style={styles.connectedContainer}>
          <Text>Connected to: {connectedDevice.name}</Text>
          <Button title="Disconnect" onPress={disconnectFromDevice} />
          {glucoseData && (
            <View style={styles.dataContainer}>
              <Text>Glucose Level: {glucoseData}</Text>
            </View>
          )}
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
  },
  deviceContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  connectedContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'green',
  },
  dataContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'blue',
  },
});

export default BluetoothComponent;



// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, Button, FlatList, PermissionsAndroid, Platform, Alert } from 'react-native';
// import BleManager from 'react-native-ble-manager';
// import { NativeEventEmitter, NativeModules } from 'react-native';

// const BleManagerModule = NativeModules.BleManager;
// const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

// const ConnectBluetooth = () => {
//   const [devices, setDevices] = useState([]);
//   const [connectedDevice, setConnectedDevice] = useState(null);

//   useEffect(() => {
//     BleManager.start({ showAlert: false });

//     const requestPermissions = async () => {
//       if (Platform.OS === 'android' && Platform.Version >= 23) {
//         try {
//           const granted = await PermissionsAndroid.requestMultiple([
//             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//             PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
//             PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//           ]);

//           if (
//             granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
//             granted['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
//             granted['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED
//           ) {
//             console.log('All required permissions granted');
//           } else {
//             console.log('Some permissions are not granted');
//           }
//         } catch (err) {
//           console.warn(err);
//         }
//       }
//     };

//     requestPermissions();

//     const handleDiscoverPeripheral = (peripheral) => {
//       if (peripheral.name) {
//         setDevices((prevDevices) => {
//           const deviceExists = prevDevices.some((device) => device.id === peripheral.id);
//           if (!deviceExists) {
//             return [...prevDevices, peripheral];
//           } else {
//             return prevDevices;
//           }
//         });
//       }
//     };

//     bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);

//     return () => {
//       bleManagerEmitter.removeListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
//     };
//   }, []);

//   const startScan = () => {
//     setDevices([]);
//     BleManager.scan([], 5, true).then((results) => {
//       console.log('Scanning...');
//     }).catch((err) => {
//       console.log('Scan error:', err);
//     });
//   };

//   const connectToDevice = (device) => {
//     BleManager.connect(device.id)
//       .then(() => {
//         setConnectedDevice(device);
//         console.log('Connected to ' + device.id);
//       })
//       .catch((error) => {
//         console.log('Connection error:', error);
//         Alert.alert('Connection error', error.message);
//       });
//   };

//   const disconnectFromDevice = () => {
//     if (connectedDevice) {
//       BleManager.disconnect(connectedDevice.id)
//         .then(() => {
//           console.log('Disconnected from ' + connectedDevice.id);
//           setConnectedDevice(null);
//         })
//         .catch((error) => {
//           console.log('Disconnection error:', error);
//           Alert.alert('Disconnection error', error.message);
//         });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Start Scan" onPress={startScan} />
//       <FlatList
//         data={devices}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.deviceContainer}>
//             <Text>{item.name}</Text>
//             <Button title="Connect" onPress={() => connectToDevice(item)} />
//           </View>
//         )}
//       />
//       {connectedDevice && (
//         <View style={styles.connectedContainer}>
//           <Text>Connected to: {connectedDevice.name}</Text>
//           <Button title="Disconnect" onPress={disconnectFromDevice} />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   deviceContainer: {
//     margin: 10,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   connectedContainer: {
//     marginTop: 20,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: 'green',
//   },
// });

// export default ConnectBluetooth;
