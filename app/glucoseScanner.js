import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
//import TextRecognition from 'react-native-text-recognition';
import TextRecognition from 'react-native-text-recognition';
import { launchImageLibrary } from 'react-native-image-picker'
//import TextRecognition from '@react-native-ml-kit/text-recognition';
const GlucoseScanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [result, setResult] = useState('');
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestPermissionsAsync();
      if (cameraStatus !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }
      const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (mediaStatus !== 'granted') {
        alert('Sorry, we need media library permissions to make this work!');
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
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log('Photo URI:', photo.uri); // Debug log
      extractTextFromImage(photo.uri);
    }
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      try {
        console.log(result);
        console.log('Extracting text from image:', result.assets[0].uri);
        const options = { visionIgnoreThreshold: 0.5 };
        const recognizedText = await TextRecognition.recognize(result.assets[0].uriyou);
        console.log('1');
        console.log('OCR result:', recognizedText); // Debug log
        
        // Process recognized text
        const numbers = recognizedText.filter(item => !isNaN(item));
        console.log('2');
        setResult(numbers.join(' '));
      } catch (err) {
        console.error('Error performing OCR:', err);
        setResult('Error reading text');
      }
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
        <TouchableOpacity style={styles.button} onPress={handlePickImage}>
          <Text style={styles.buttonText}>Pick Image</Text>
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
