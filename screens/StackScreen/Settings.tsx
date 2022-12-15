import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';

export default function Settings() {
  return (
    <LinearGradient style={styles.root} colors={[colors.gradient.orange, colors.gradient.yellow]}>
      <View style={styles.root}>
        <Text style={styles.text}>Settings component is working</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...globalStyles.baseText,
  },
});
