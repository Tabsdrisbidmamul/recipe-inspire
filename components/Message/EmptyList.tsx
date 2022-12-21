import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';

/**
 * Render a message for an empty flatlist
 */
export default function EmptyList() {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Try searching for a recipe</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...globalStyles.baseText,
    color: colors.whites.doveGrey,
  },
});
