import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieLoader from './LottieLoader';

interface IProps {
  message?: string;
}

export default function FullScreenLoader({ message }: IProps) {
  return (
    <View style={styles.root}>
      <LottieLoader message={message} mode="dark" />
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
