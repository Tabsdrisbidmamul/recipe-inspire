import { StyleSheet } from 'react-native';
import { loadAsync } from 'expo-font';
import React, { useEffect, useCallback, useState } from 'react';
import Navigation from './components/Navigation/Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store, StoreContext } from './stores/store';
import { StatusBar } from 'expo-status-bar';

export default function App() {
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
          <StatusBar style="light"></StatusBar>
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
