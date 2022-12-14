import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';

export default function Details() {
  const navigation = useNavigation();

  function handlePressBack() {
    //@ts-ignore
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <LinearGradient style={styles.root} colors={[colors.gradient.orange, colors.gradient.yellow]}>
      <View style={styles.root}>
        <Text style={styles.text}>Details component is working</Text>
        <Button onPress={handlePressBack} title="Go back" />
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
