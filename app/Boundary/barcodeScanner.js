import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, Button } from 'react-native';
import { CameraView, useCameraPermissions, Camera, BarcodeScanningResult } from 'expo-camera';
import { searchFoodByBarcode } from '../../server';
import { Stack, useRouter } from 'expo-router';
import Header from '../components/Header';

export default function App() {
  const cameraRef = useRef(null);
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      if (cameraStatus !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }
    })();
  }, []);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
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
        pathname: './foodDetails',
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
          barcodeScannerSettings={{
            barCodeTypes: [
            "upc_a",
            "upc_e",
            ],
            }}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          
          style={styles.camera}
        />
        <View style={styles.overlay}>
          <Text style={styles.title}>Scan your Barcode</Text>
          <View style={styles.borderContainer}>
            <View style={[styles.borderLine, { borderTopWidth: 4, borderLeftWidth: 4 }]} />
            <View style={[styles.borderLine, { borderTopWidth: 4, borderRightWidth: 4 }]} />
          </View>
          <View style={styles.borderContainer}>
            <View style={[styles.borderLine, { borderBottomWidth: 4, borderLeftWidth: 4 }]} />
            <View style={[styles.borderLine, { borderBottomWidth: 4, borderRightWidth: 4 }]} />
          </View>
          <TouchableOpacity
              style={styles.button}
              onPress={() => setScanned(false)}>
              <Text style={styles.buttonText}>Scan Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    
    <View style={styles.container}>
       <Header
      title = 'Barcode Scanner'
      leftButton='Back'
      onLeftButtonPress={() => router.back()}
    />
      {renderCamera()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  cameraContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    position: 'absolute',
    top: 50,
  },
  button: {
    backgroundColor: '#E58B68',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    position: 'absolute',
    top: '85%', // Adjusted this value to move the button below the border lines
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold'
  },
  borderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    position: 'absolute',
  },
  borderLine: {
    width: 20,
    height: 150,
    borderColor: 'white',
  },
});

