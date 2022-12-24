import React from 'react';
import { View, StyleSheet } from 'react-native';
import CameraView from '../../components/Camera/CameraView';

/**
 * Screen to the camera view
 * @returns
 */
export default function CameraScreen() {
  return (
    <View style={styles.root}>
      <CameraView />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
