import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import RootView from '../../components/Root/RootView';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';

export default function Home() {
  const navigation = useNavigation();

  function handlePressToNavigateToDetails() {
    //@ts-ignore
    navigation.navigate('Details');
  }

  return (
    <RootView>
      <Text style={styles.text}>Home component is working</Text>
      <Button onPress={handlePressToNavigateToDetails} title="Go to Details" />
    </RootView>
  );
}

const styles = StyleSheet.create({
  text: {
    ...globalStyles.baseText,
  },
});
