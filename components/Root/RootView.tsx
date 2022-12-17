import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';

interface IProps {
  children: JSX.Element[] | JSX.Element;
}

/**
 * Root view which applies a linear gradient and wraps it around a central view
 * @param param0
 * @returns
 */
export default function RootView({ children }: IProps) {
  const insets = useSafeAreaInsets();

  const height = insets.top + 15;

  return (
    <LinearGradient style={[styles.root]} colors={[colors.gradient.orange, colors.gradient.yellow]}>
      <View style={[styles.container, { paddingTop: height }]}>{children}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    ...globalStyles.baseContainerPaddingHorizontal,
  },
});
