import { Camera, CameraType } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios, { AxiosError } from 'axios';
import * as FileSystem from 'expo-file-system';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';
import LottieLoader from '../Loader/LottieLoader';
import RootView from '../Root/RootView';
import BaseCard from '../Cards/BaseCard';

/**
 * Camera view to take images and have them ready in the app cache
 * @returns
 */
export default function CameraView() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  let camera = useRef<Camera>(null);

  if (!permission) {
    return (
      <View>
        <LottieLoader />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <RootView style={styles.container}>
        <View>
          <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      </RootView>
    );
  }

  async function takePicture() {
    if (!permission) return;
    // @ts-ignore
    const photo = (await camera.takePictureAsync()) as { height: number; uri: string; width: number };

    console.log("finished taking photo here's the photo", photo);

    const imageBase64 = await FileSystem.readAsStringAsync(`${photo.uri}`, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const data = {
      requests: [
        {
          image: {
            content: imageBase64,
          },
          features: [
            {
              maxResults: 10,
              type: 'LANDMARK_DETECTION',
            },

            {
              maxResults: 10,
              type: 'OBJECT_LOCALIZATION',
            },

            {
              maxResults: 10,
              type: 'LABEL_DETECTION',
            },
            {
              maxResults: 10,
              model: 'builtin/latest',
              type: 'DOCUMENT_TEXT_DETECTION',
            },

            {
              maxResults: 10,
              type: 'IMAGE_PROPERTIES',
            },
          ],
        },
      ],
    };

    try {
      const res = await axios.post(
        'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDBNHsBZ-AkKromEvC4lpA4TrWlFazoMZ0',
        data
      );

      console.log('res ', res.data);
      console.log('responses ', res.data.responses[0]);
    } catch (err) {
      const _err = err as AxiosError;
      console.error('ERROR takePicture() in taking picture ', _err.response);
    }
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={(ref: any) => {
          // @ts-ignore
          if (ref !== null) camera = ref;
        }}
        style={styles.camera}
        type={type}
      >
        <View style={styles.buttonContainer}>
          <Pressable
            accessible
            accessibilityLabel="Camera Button"
            accessibilityHint="Takes a picture"
            style={styles.button}
            onPress={takePicture}
          ></Pressable>
        </View>
      </Camera>
    </View>
  );
}

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: colors.whites.pastel,
  },
  text: {
    ...globalStyles.baseText,
  },
});
