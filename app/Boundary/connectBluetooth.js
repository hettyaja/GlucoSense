import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, PermissionsAndroid, Platform } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';

const bleManager = new BleManager();

const BluetoothComponent = () => {
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [services, setServices] = useState([]);
  const [characteristics, setCharacteristics] = useState([]);

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
  };

  const connectToDevice = async (device) => {
    try {
      console.log(`Attempting to connect to device: ${device.name} (${device.id})`);
      await bleManager.stopDeviceScan();

      // Ensure the device is disconnected first
      await bleManager.cancelDeviceConnection(device.id).catch((error) => {
        console.log(`No previous connection to cancel for device: ${device.name}`);
      });

      const connectedDevice = await bleManager.connectToDevice(device.id, { autoConnect: true });
      setConnectedDevice(connectedDevice);
      console.log(`Connected to device: ${connectedDevice.name} (${connectedDevice.id})`);

      const servicesAndCharacteristics = await connectedDevice.discoverAllServicesAndCharacteristics();
      const services = await servicesAndCharacteristics.services();

      setServices(services);

      const characteristics = [];
      for (const service of services) {
        const serviceCharacteristics = await service.characteristics();
        characteristics.push(...serviceCharacteristics);
      }
      setCharacteristics(characteristics);

      console.log('Services and Characteristics discovered');
    } catch (error) {
      console.error('Connection error:', error);
      if (error.message.includes('disconnected')) {
        console.log('Device disconnected. Retrying connection...');
        retryConnection(device);
      }
    }
  };

  const retryConnection = (device) => {
    console.log(`Retrying connection to device: ${device.name} (${device.id}) in 5 seconds`);
    setTimeout(() => {
      connectToDevice(device);
    }, 5000);
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
          <FlatList
            data={services}
            keyExtractor={(item) => item.uuid}
            renderItem={({ item }) => (
              <View style={styles.serviceContainer}>
                <Text>Service UUID: {item.uuid}</Text>
              </View>
            )}
          />
          <FlatList
            data={characteristics}
            keyExtractor={(item) => item.uuid}
            renderItem={({ item }) => (
              <View style={styles.characteristicContainer}>
                <Text>Characteristic UUID: {item.uuid}</Text>
                <Text>Service UUID: {item.serviceUUID}</Text>
              </View>
            )}
          />
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
  serviceContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  characteristicContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default BluetoothComponent;



// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, Button, FlatList, PermissionsAndroid, Platform } from 'react-native';
// import BleManager from 'react-native-ble-manager';
// import { NativeEventEmitter, NativeModules } from 'react-native';

// const BleManagerModule = NativeModules.BleManager;
// const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

// const connectBluetooth = () => {
//   const [devices, setDevices] = useState([]);
//   const [connectedDevice, setConnectedDevice] = useState(null);
//   const [services, setServices] = useState([]);
//   const [characteristics, setCharacteristics] = useState([]);

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
//     });
//   };

//   const connectToDevice = (device) => {
//     BleManager.connect(device.id)
//       .then(() => {
//         setConnectedDevice(device);
//         console.log('Connected to ' + device.id);

//         return BleManager.retrieveServices(device.id);
//       })
//       .then((peripheralInfo) => {
//         console.log('Peripheral info:', peripheralInfo);

//         setServices(peripheralInfo.services);
//         setCharacteristics(peripheralInfo.characteristics);
//         peripheralInfo.services.forEach((service) => {
//           console.log('Service UUID:', service.uuid);
//         });
//         peripheralInfo.characteristics.forEach((characteristic) => {
//           console.log('Characteristic UUID:', characteristic.uuid);
//         });
//       })
//       .catch((error) => {
//         console.log('Connection error:', error);
//       });
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
//           <FlatList
//             data={services}
//             keyExtractor={(item) => item.uuid}
//             renderItem={({ item }) => (
//               <View style={styles.serviceContainer}>
//                 <Text>Service UUID: {item.uuid}</Text>
//               </View>
//             )}
//           />
//           <FlatList
//             data={characteristics}
//             keyExtractor={(item) => item.uuid}
//             renderItem={({ item }) => (
//               <View style={styles.characteristicContainer}>
//                 <Text>Characteristic UUID: {item.uuid}</Text>
//                 <Text>Service UUID: {item.service}</Text>
//               </View>
//             )}
//           />
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
//   serviceContainer: {
//     margin: 10,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   characteristicContainer: {
//     margin: 10,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
// });

// export default connectBluetooth;
