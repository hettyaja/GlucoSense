import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { CameraView, useCameraPermissions} from 'expo-camera';
import { searchFoodByBarcode } from '../server';
import { Stack, useRouter } from 'expo-router';
import food from './foodOrder';

export default function App() {
  const cameraRef = useRef(null);
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleBarCodeScanned = async ({ type, data }) => {
    if (scanned) {
      return;
    }
    setScanned(true);
    Alert.alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    try {
      const foodData = await searchFoodByBarcode(data);
      console.log(foodData);
      router.push({
        pathname: 'foodDetails',
        params: { item: JSON.stringify({ food: foodData }) },
      });
    } catch (error) {
      console.error('Error searching for food:', error);
      Alert.alert('Error', 'Failed to fetch food details. Please try again.');
      setScanned(false);
    }
  };

  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          onBarcodeScanned={handleBarCodeScanned}
          style={styles.camera}
        />
      </View>
    );
  };

  if (permission === null) {
    return <View />;
  }

  if (permission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission not granted</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Barcode Scanner App!</Text>
      <Text style={styles.paragraph}>Scan a barcode to start your job.</Text>
      {renderCamera()}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setScanned(false)}
        disabled={!scanned}
      >
        <Text style={styles.buttonText}>Scan Again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
  },
  cameraContainer: {
    width: '80%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 40,
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});