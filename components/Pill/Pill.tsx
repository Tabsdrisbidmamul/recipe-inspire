import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';

interface IProps {
  message: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Pill options
 */
export default function Pill({ message, style }: IProps) {
  return (
    <View accessible accessibilityLabel="Recipe Diet" accessibilityHint={message} style={[styles.pill, style]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    ...globalStyles.basePill,
    backgroundColor: colors.blacks.charcoal,
    marginRight: 10,
    marginBottom: 8,
  },
  text: {
    ...globalStyles.baseText,
    color: colors.whites.pastel,
    fontSize: 14,
  },
});
