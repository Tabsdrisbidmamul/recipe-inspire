import { Camera, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios, { AxiosError } from 'axios';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  let camera = useRef<Camera>(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
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
              maxResults: 50,
              type: 'LANDMARK_DETECTION',
            },

            {
              maxResults: 50,
              type: 'OBJECT_LOCALIZATION',
            },

            {
              maxResults: 50,
              type: 'LABEL_DETECTION',
            },
            {
              maxResults: 50,
              model: 'builtin/latest',
              type: 'DOCUMENT_TEXT_DETECTION',
            },

            {
              maxResults: 50,
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
      console.log('err ', _err.response);
    }
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={(ref) => {
          // @ts-ignore
          if (ref !== null) camera = ref;
        }}
        style={styles.camera}
        type={type}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
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
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
