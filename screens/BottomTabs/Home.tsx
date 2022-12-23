import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import SearchField from '../../components/Inputs/SearchField';
import LottieLoader from '../../components/Loader/LottieLoader';
import RootView from '../../components/Root/RootView';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';

/**
 * Tab screen for home, this is not the screen for search results, but rather a content page where we can present the option to go to search results page, but also misc. items for quick searches or inspiration on what to search. We also present
 * @returns
 */
export default function Home() {
  return (
    <RootView isScrollable>
      <SearchField mode="button" />
    </RootView>
  );
}

const styles = StyleSheet.create({
  text: {
    ...globalStyles.baseText,
  },
});
