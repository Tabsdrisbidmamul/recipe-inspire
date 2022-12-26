import { Camera, CameraType } from 'expo-camera';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';
import RootView from '../Root/RootView';
import { useNavigation } from '@react-navigation/native';
import PermissionsCard from '../Cards/PermissionsCard';
import NavigationHeader from '../Header/NavigationHeader';
import { observer } from 'mobx-react-lite';
import useStore from '../../hooks/useStore';
import FullScreenLoader from '../Loader/FullScreenLoader';
import Toast from 'react-native-toast-message';
import { IPhotoAndResults } from '../../interfaces/results.interface';
import CameraCards from '../Cards/CameraCards';
import TakePictureButton from '../Buttons/TakePictureButton';
import CameraModal from '../Modal/CameraModal';

/**
 * Camera view to take images and have them ready in the app cache
 * @returns
 */
export default observer(function CameraView() {
  const navigation = useNavigation();
  const { photoStore, ingredientsStore } = useStore();

  const { takePicture, loader } = photoStore;
  const { setScannedIngredients, scannedIngredients } = ingredientsStore;

  const [type, setType] = useState(CameraType.back);
  const [permission, setPermission] = useState(false);

  const [cards, setCards] = useState<IPhotoAndResults[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [count, setCount] = useState(0);

  useLayoutEffect(() => {
    handleGrantPressed();
  }, []);

  // hack: re-render on array change
  // Only get the first 3 cards
  useEffect(() => {
    if (cards.length < 3) {
      setCards(scannedIngredients);
    }
  }, [count]);

  let camera = useRef<Camera>(null);

  function handleCancelPressed() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  function toggleModal() {
    setIsModalVisible(!isModalVisible);
  }

  async function handleGrantPressed() {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();

    setPermission(cameraPermission.status === 'granted');
  }

  async function handlePictureTaken() {
    try {
      const res = await takePicture(permission, camera);

      if (res === undefined) {
        throw new Error('Could not determine the ingredient name');
      }

      setScannedIngredients(res);

      // hack: re-render on array change
      setCount(count + 1);
    } catch (e: any) {
      Toast.show({
        type: 'error',
        text1: e.message,
      });
    }
  }

  if (!permission) {
    return (
      <RootView style={styles.container}>
        <PermissionsCard onPressCancel={handleCancelPressed} onPressGrant={handleGrantPressed} />
      </RootView>
    );
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
        {loader ? (
          <FullScreenLoader message="Determining ingredient..." />
        ) : (
          <>
            <NavigationHeader handleNavigateBack={handleCancelPressed} title="" mode="transparent" />
            <View style={styles.buttonContainer}>
              <TakePictureButton handlePictureTaken={handlePictureTaken} />
              <CameraCards onPress={toggleModal} cards={cards} />
            </View>

            <CameraModal isModalVisible={isModalVisible} toggleModal={toggleModal} />
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
  text: {
    ...globalStyles.baseText,
    color: colors.whites.pastel,
  },
});
