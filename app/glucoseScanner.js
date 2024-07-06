import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import TextRecognition from 'react-native-text-recognition';

const GlucoseScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [result, setResult] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCapture = async () => {
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync();
      extractTextFromImage(photo.uri);
    }
  };

  const extractTextFromImage = async (imageUri) => {
    try {
      const result = await TextRecognition.recognize(imageUri);
      setResult(result.join(' '));
    } catch (err) {
      console.error('Error performing OCR:', err);
      setResult('Error reading text');
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission not granted</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={ref => setCameraRef(ref)}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleCapture}>
            <Text style={styles.buttonText}>Capture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
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
