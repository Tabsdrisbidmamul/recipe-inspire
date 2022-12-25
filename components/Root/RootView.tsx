import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, StyleSheet, ScrollView, StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';
import NavigationHeader from '../Header/NavigationHeader';
import LottieLoader from '../Loader/LottieLoader';

interface IProps {
  children: JSX.Element[] | JSX.Element;
  isScrollable?: boolean;
  isKeyboardDismissible?: boolean;
  style?: StyleProp<ViewStyle>;
  showHeader?: boolean;
  title?: string;
  mode?: 'default' | 'recipe' | 'transparent';
  onPress?: (...args: any) => any;
}

/**
 * Root view which applies a linear gradient and wraps it around a central view
 * @param param0
 * @returns
 */
export default function RootView({
  children,
  isScrollable,
  isKeyboardDismissible,
  showHeader,
  style,
  title,
  mode,
  onPress,
}: IProps) {
  return (
    <LinearGradient
      style={[styles.root]}
      colors={[colors.gradient.pink, colors.gradient.purple]}
      start={[0, 0.5]}
      end={[0.5, 1]}
      locations={[0.4, 1]}
    >
      {isScrollable ? (
        <View style={[styles.container, style]}>
          {isKeyboardDismissible ? (
            <ScrollView keyboardDismissMode="interactive" style={styles.scrollContainer}>
              {children}
            </ScrollView>
          ) : (
            <>
              {showHeader ? <NavigationHeader title={title!} mode={mode!} handleNavigateBack={onPress!} /> : null}
              <ScrollView style={styles.scrollContainer}>{children}</ScrollView>
            </>
          )}
        </View>
      ) : (
        <View style={[styles.container, style]}>{children}</View>
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
