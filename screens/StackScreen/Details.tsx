import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import RootView from '../../components/Root/RootView';
import colors from '../../constants/colors';

export default function Details() {
  const navigation = useNavigation();

  function handlePressBack() {
    //@ts-ignore
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <RootView>
      <Text style={styles.text}>Details component is working</Text>
      <Button onPress={handlePressBack} title="Go back" />
    </RootView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'nunito-regular',
    fontSize: 24,
  },
});
