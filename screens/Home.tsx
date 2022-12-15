import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';
import { globalStyles } from '../constants/globalStyles';

export default function Home() {
  const navigation = useNavigation();

  function handlePressToNavigateToDetails() {
    //@ts-ignore
    navigation.navigate('Details');
  }

  return (
    <LinearGradient style={styles.root} colors={[colors.gradient.orange, colors.gradient.yellow]}>
      <View style={styles.root}>
        <Text style={styles.text}>Home component is working</Text>
        <Button onPress={handlePressToNavigateToDetails} title="Go to Details" />
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
