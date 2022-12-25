import { Camera, CameraType, getCameraPermissionsAsync } from 'expo-camera';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios, { AxiosError } from 'axios';
import * as FileSystem from 'expo-file-system';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';
import LottieLoader from '../Loader/LottieLoader';
import RootView from '../Root/RootView';
import BaseCard from '../Cards/BaseCard';
import { useNavigation } from '@react-navigation/native';
import { resetGlobalState } from 'mobx/dist/internal';
import globalConstants from '../../constants/globalConstants';
import PermissionsCard from '../Cards/PermissionsCard';
import Agent from '../../agents';
import { VisionRequest } from '../../interfaces/results.interface';
import NavigationHeader from '../Header/NavigationHeader';
import { observer } from 'mobx-react-lite';
import useStore from '../../hooks/useStore';
import FullScreenLoader from '../Loader/FullScreenLoader';

/**
 * Camera view to take images and have them ready in the app cache
 * @returns
 */
export default observer(function CameraView() {
  const navigation = useNavigation();
  const { photoStore } = useStore();
  const { getImageAnnotations, loader } = photoStore;

  const [type, setType] = useState(CameraType.back);
  const [permission, setPermission] = useState(false);

  const [cameraLoader, setCameraLoader] = useState(false);

  useLayoutEffect(() => {
    handleGrantPressed();
  }, []);

  let camera = useRef<Camera>(null);

  function handleCancelPressed() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  async function handleGrantPressed() {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();

    setPermission(cameraPermission.status === 'granted');
  }

  if (!permission) {
    return (
      <RootView style={styles.container}>
        <PermissionsCard onPressCancel={handleCancelPressed} onPressGrant={handleGrantPressed} />
      </RootView>
    );
  }

  async function takePicture() {
    if (!permission) return;

    setCameraLoader(true);

    // @ts-ignore
    const photo = (await camera.takePictureAsync()) as { height: number; uri: string; width: number };

    const imageBase64 = await FileSystem.readAsStringAsync(`${photo.uri}`, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const data: VisionRequest = {
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

    await getImageAnnotations(data);

    setCameraLoader(false);
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
        {cameraLoader ? (
          <FullScreenLoader />
        ) : (
          <>
            <NavigationHeader handleNavigateBack={handleCancelPressed} title="" mode="transparent" />
            <View style={styles.buttonContainer}>
              <Pressable
                accessible
                accessibilityLabel="Camera Button"
                accessibilityHint="Takes a picture"
                style={styles.pressableButton}
                onPress={takePicture}
              >
                <View style={styles.button}>
                  <View style={styles.innerButton}></View>
                </View>
              </Pressable>
            </View>
          </>
        )}
      </Camera>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    position: 'relative',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    margin: 64,
  },
  pressableButton: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  button: {
    width: 90,
    height: 90,
    borderRadius: 100,
    // padding: 10,
    borderColor: colors.whites.pastel,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerButton: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: colors.whites.pastel,
  },
  text: {
    ...globalStyles.baseText,
    textAlign: 'center',
  },
});
