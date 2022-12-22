import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { globalStyles } from '../../constants/globalStyles';

interface IProps {
  children: JSX.Element[] | JSX.Element;
  style?: StyleProp<ViewStyle>;
}

/**
 * Base content wrapper which applies styles around the container
 * @param param0
 * @returns
 */
export default function Content({ children, style }: IProps) {
  return (
    <View
      accessible
      accessibilityLabel="Content container"
      accessibilityHint="Wrapper for content"
      style={[styles.content, style]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    ...globalStyles.baseContentMargin,
  },
});
