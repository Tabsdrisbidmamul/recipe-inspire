import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';

/**
 * Camera button, when pressed will navigate to the camera screen
 * @returns
 */
export default function CameraButton() {
  return (
    <Pressable
      accessible
      accessibilityLabel="Camera button"
      accessibilityHint="Navigates to camera screen"
      style={styles.iconContainer}
    >
      <Ionicons name="camera-outline" style={[styles.icon, styles.cameraIcon]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    marginLeft: 15,
    width: 50,
    height: 50,
    ...globalStyles.buttonBackgroundColor,

    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    ...globalStyles.icon,
  },
  cameraIcon: {
    color: colors.whites.pastel,
    fontSize: 35,
  },
});
