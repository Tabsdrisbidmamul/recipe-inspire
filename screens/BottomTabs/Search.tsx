import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import SearchField from '../../components/Inputs/SearchField';
import RootView from '../../components/Root/RootView';
import colors from '../../constants/colors';

/**
 * Tab screen for search, this is not the screen for search results, but rather a content page where we can present the option to go to search results page, but also misc. items for quick searches or inspiration on what to search. We also present
 * @returns
 */
export default function Search() {
  return (
    <RootView isScrollable>
      <SearchField mode="button" />
    </RootView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'nunito-regular',
    fontSize: 24,
  },
});
