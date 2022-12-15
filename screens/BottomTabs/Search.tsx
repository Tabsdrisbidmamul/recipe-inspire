import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import colors from '../../constants/colors';

export default function Search() {
  return (
    <LinearGradient style={styles.root} colors={[colors.gradient.orange, colors.gradient.yellow]}>
      <View style={styles.root}>
        <Text style={styles.text}>Search component is working</Text>
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
    fontFamily: 'nunito-regular',
    fontSize: 24,
  },
});
