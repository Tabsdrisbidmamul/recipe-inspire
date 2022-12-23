import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import ContentHeader from '../../components/Header/ContentHeader';
import SearchField from '../../components/Inputs/SearchField';
import RootView from '../../components/Root/RootView';
import colors from '../../constants/colors';

/**
 * Tab screen for favourites
 * @returns
 */
export default function Favourites() {
  return (
    <RootView isScrollable>
      <ContentHeader title="Favorites" />
    </RootView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'nunito-regular',
    fontSize: 24,
  },
});
