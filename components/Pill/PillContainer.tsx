import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface IProps {
  children: JSX.Element[] | JSX.Element;
  style?: StyleProp<ViewStyle>;
}

/**
 * Horizontal Pill container
 */
export default function PillContainer({ children, style }: IProps) {
  return <View style={[styles.root, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
