import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import TextRecognition from 'react-native-text-recognition';

const GlucoseScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [result, setResult] = useState('');
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log('Photo URI:', photo.uri); // Debug log
      extractTextFromImage(photo.uri);
    }
  };

  const extractTextFromImage = async (imageUri) => {
    try {
      console.log('Extracting text from image:', imageUri);
      const recognizedText = await TextRecognition.recognize(imageUri);
      console.log('OCR result:', recognizedText); // Debug log
  
      // Process recognized text
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
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        
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
