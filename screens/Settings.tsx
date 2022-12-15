import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BaseCard from '../components/Cards/BaseCard';
import colors from '../constants/colors';
import { globalStyles } from '../constants/globalStyles';

export default function Settings() {
  const insets = useSafeAreaInsets();

  const height = insets.top + 15;

  return (
    <LinearGradient style={[styles.root]} colors={[colors.gradient.orange, colors.gradient.yellow]}>
      <View style={[styles.container, { paddingTop: height }]}>
        <Text style={[styles.text, styles.header]}>More</Text>

        <BaseCard>
          <Text>A cards</Text>
        </BaseCard>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  container: {
    flex: 1,
    ...globalStyles.baseContainerPaddingHorizontal,
  },
  text: {
    fontFamily: 'nunito-regular',
    fontSize: 24,
  },
  header: {
    ...globalStyles.baseHeaderText,
  },
});
