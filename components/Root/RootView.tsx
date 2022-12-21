import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';

interface IProps {
  children: JSX.Element[] | JSX.Element;
  isScrollable?: boolean;
  isKeyboardDismissible?: boolean;
}

/**
 * Root view which applies a linear gradient and wraps it around a central view
 * @param param0
 * @returns
 */
export default function RootView({ children, isScrollable, isKeyboardDismissible }: IProps) {
  return (
    <LinearGradient
      style={[styles.root]}
      colors={[colors.gradient.orange, colors.gradient.yellow]}
      start={[0, 0.5]}
      end={[0.5, 1]}
      locations={[0.15, 1]}
    >
      {isScrollable ? (
        <View style={[styles.container]}>
          {isKeyboardDismissible ? (
            <ScrollView keyboardDismissMode="interactive" style={styles.scrollContainer}>
              {children}
            </ScrollView>
          ) : (
            <ScrollView style={styles.scrollContainer}>{children}</ScrollView>
          )}
        </View>
      ) : (
        <View style={[styles.container]}>{children}</View>
      )}
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
  scrollContainer: {
    flex: 1,
    ...globalStyles.baseContentMargin,
  },
});
