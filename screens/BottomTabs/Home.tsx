import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import LottieLoader from '../../components/Loader/LottieLoader';
import RootView from '../../components/Root/RootView';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';

export default function Home() {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);

  function handlePressToNavigateToDetails() {
    //@ts-ignore
    navigation.navigate('Details');
  }

  useEffect(() => {
    setTimeout(() => setShow(true), 2000);
  }, []);

  return (
    <RootView>
      <Text style={styles.text}>Home component is working</Text>
      <Button onPress={handlePressToNavigateToDetails} title="Go to Details" />

      {show ? <Text>Finished Loading! </Text> : <LottieLoader />}
    </RootView>
  );
}

const styles = StyleSheet.create({
  text: {
    ...globalStyles.baseText,
  },
});
