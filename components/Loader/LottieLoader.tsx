import { Platform } from 'expo-modules-core';
import LottieView from 'lottie-react-native';
import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { StyleProps } from 'react-native-reanimated';

import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';

interface IProps {
  style?: StyleProp<ViewStyle>;
  mode?: 'light' | 'dark';
}

/**
 * For iOS only, display a lottie animation as the loader
 * @returns
 */
export default function LottieLoader({ style, mode = 'light' }: IProps) {
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
        <Text style={styles.text}>Loading...</Text>
      </>
    );
  }

  loader = (
    <>
      <ActivityIndicator size="large" color={mode === 'light' ? colors.blacks.charcoal : colors.whites.pastel} />
      <Text style={[styles.text, mode === 'dark' ? { color: colors.whites.pastel } : null]}>Loading...</Text>
    </>
  );

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
