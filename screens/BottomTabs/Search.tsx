import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import RootView from '../../components/Root/RootView';
import colors from '../../constants/colors';

export default function Search() {
  return (
    <RootView>
      <Text style={styles.text}>Search component is working</Text>
    </RootView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'nunito-regular',
    fontSize: 24,
  },
});
