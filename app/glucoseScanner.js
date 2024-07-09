import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, Platform, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import TextRecognition from 'react-native-text-recognition';

const GlucoseScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [result, setResult] = useState('');
  const cameraRef = useRef(null);

  useEffect(() => {
    const requestCameraPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "Camera Permission",
              message: "App needs camera permission",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
        } catch (err) {
          console.warn(err);
          setHasPermission(false);
        }
      } else {
        setHasPermission(true);
      }
    };

    requestCameraPermission();
  }, []);

  const handleCapture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log('Photo URI:', data.uri); // Debug log
      extractTextFromImage(data.uri);
    }
  };

  const extractTextFromImage = async (imageUri) => {
    try {
      const recognizedText = await TextRecognition.recognize(imageUri);
      console.log('OCR result:', recognizedText); // Debug log
      const numbers = recognizedText.filter(item => !isNaN(item));
      setResult(numbers.join(' '));
    } catch (err) {
      console.error('Error performing OCR:', err);
      setResult('Error reading text');
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCapture}>
          <Text style={styles.buttonText}>Capture</Text>
        </TouchableOpacity>
      </View>
      {result ? <Text style={styles.resultText}>Result: {result}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  button: {
    alignSelf: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  resultText: {
    textAlign: 'center',
    fontSize: 18,
    margin: 20,
  },
});

export default GlucoseScanner;
