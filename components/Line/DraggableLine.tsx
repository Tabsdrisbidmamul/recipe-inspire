import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import globalConstants from '../../constants/globalConstants';

export default function DraggableLine() {
  return <View style={styles.line} />;
}

const styles = StyleSheet.create({
  line: {
    width: 50,
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: globalConstants.cardBorderRadius,
  },
});
