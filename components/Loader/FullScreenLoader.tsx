import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieLoader from './LottieLoader';

export default function FullScreenLoader() {
  return (
    <View style={styles.root}>
      <LottieLoader mode="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});
