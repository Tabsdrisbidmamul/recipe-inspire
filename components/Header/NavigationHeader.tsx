import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { globalStyles } from '../../constants/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/colors';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import globalConstants from '../../constants/globalConstants';

interface IProps {
  title: string;
  handleNavigateBack: (...args: any) => any;
}

/**
 * Customisable header, which respects inset areas - to be placed on all screens
 * @param prop
 * @returns
 */
export default function NavigationHeader({ title, handleNavigateBack }: IProps) {
  const insets = useSafeAreaInsets();

  const height = insets.top + globalConstants.insetHeight;

  return (
    <>
      <View style={[styles.container, { marginTop: height }]}>
        <Ionicons onPress={handleNavigateBack} name="arrow-back-sharp" style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
        <StatusBar style="light"></StatusBar>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.baseBorderRadius,
    ...globalStyles.basePaddingHorizontal,
    ...globalStyles.basePaddingVertical,
    ...globalStyles.baseContentMargin,
    flexDirection: 'row',
    backgroundColor: colors.whites.pastel,
    alignItems: 'center',
    paddingVertical: 12,
  },

  icon: {
    color: colors.blacks.charcoal,
    fontSize: 24,
    marginRight: 16,
    marginLeft: 16,
  },

  title: {
    ...globalStyles.headerH2,
    fontSize: 20,
    marginBottom: 0,
  },
});
