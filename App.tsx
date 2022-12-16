import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, loadAsync } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useCallback, useState } from 'react';
import colors from './constants/colors';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './components/Navigation/Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store, StoreContext } from './stores/store';

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
  //   'nunito-regular-italic': require('./assets/fonts/Nunito-Italic.ttf'),
  //   'nunito-regular-bold': require('./assets/fonts/Nunito-Bold.ttf'),
  //   'nunito-light': require('./assets/fonts/Nunito-Light.ttf'),
  //   'nunito-light-italic': require('./assets/fonts/Nunito-LightItalic.ttf'),
  //   'nunito-medium': require('./assets/fonts/Nunito-Medium.ttf'),
  //   'nunito-medium-italic': require('./assets/fonts/Nunito-MediumItalic.ttf'),
  //   'nunito-semibold': require('./assets/fonts/Nunito-SemiBold.ttf'),
  //   'nunito-semibold-italic': require('./assets/fonts/Nunito-SemiBoldItalic.ttf'),
  // });

  // useEffect(() => {
  //   async function prepare() {
  //     await SplashScreen.preventAutoHideAsync();
  //   }
  //   prepare();
  // }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }

  const [loaded, setLoaded] = useState(false);

  const loadFonts = useCallback(async () => {
    await loadAsync({
      'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
      'nunito-regular-italic': require('./assets/fonts/Nunito-Italic.ttf'),
      'nunito-regular-bold': require('./assets/fonts/Nunito-Bold.ttf'),
      'nunito-light': require('./assets/fonts/Nunito-Light.ttf'),
      'nunito-light-italic': require('./assets/fonts/Nunito-LightItalic.ttf'),
      'nunito-medium': require('./assets/fonts/Nunito-Medium.ttf'),
      'nunito-medium-italic': require('./assets/fonts/Nunito-MediumItalic.ttf'),
      'nunito-semibold': require('./assets/fonts/Nunito-SemiBold.ttf'),
      'nunito-semibold-italic': require('./assets/fonts/Nunito-SemiBoldItalic.ttf'),
    });
    setLoaded(true);
  }, []);

  useEffect(() => {
    loadFonts();
  }, [loadFonts]);

  return (
    <SafeAreaProvider>
      {loaded ? (
        <StoreContext.Provider value={store}>
          <Navigation />
        </StoreContext.Provider>
      ) : (
        <></>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
