import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import CameraButton from './CameraButton';

/**
 * Search button, styled to look like an input, but will navigate the user to the search results screen
 * @returns
 */
export default function SearchButton() {
  const navigation = useNavigation();

  function handleSearchButtonPress() {
    //@ts-ignore
    navigation.navigate('SearchResults');
  }

  return (
    <View style={styles.buttonAndCameraContainer}>
      <Pressable
        accessible
        accessibilityLabel="Search button"
        accessibilityHint="Navigates to Search results screen"
        onPress={handleSearchButtonPress}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>Search</Text>
        <Ionicons name="search" style={styles.icon} />
      </Pressable>

      <CameraButton />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonAndCameraContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...globalStyles.searchButtonBackgroundColor,
    ...globalStyles.basePaddingHorizontal,
    ...globalStyles.basePaddingVertical,
    ...globalStyles.baseBorderRadius,
    ...globalStyles.shadows,
    paddingHorizontal: 30,
    paddingVertical: 12,
    flex: 2,
  },

  icon: {
    ...globalStyles.icon,
  },
  searchIcon: {
    position: 'absolute',
    top: 12,
    right: 20,
  },

  buttonText: {
    ...globalStyles.baseText,
  },
});
