import { Platform } from 'expo-modules-core';
import LottieView from 'lottie-react-native';
import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';

export default function LottieLoader() {
  let loader = <></>;

  if (Platform.OS === 'android') {
    loader = (
      <>
        <ActivityIndicator size="large" color={colors.blacks.charcoal} />
        <Text style={styles.text}>Loading...</Text>
      </>
    );
  } else {
    loader = (
      <>
        <LottieView source={require('../../assets/130956-food-loader.json')} style={styles.animation} autoPlay />
      </>
    );
  }

  return <View style={styles.root}>{loader}</View>;
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  animation: {
    width: 250,
    height: 250,
  },

  text: {
    ...globalStyles.baseText,
  },
});
