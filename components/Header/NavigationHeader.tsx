import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { globalStyles } from '../../constants/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/colors';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import globalConstants from '../../constants/globalConstants';
import { observer } from 'mobx-react-lite';
import useStore from '../../hooks/useStore';

interface IProps {
  title: string;
  handleNavigateBack: (...args: any) => any;
  mode: 'default' | 'recipe';
}

/**
 * Customisable header, which respects inset areas - to be placed on all screens
 * @param prop
 * @returns
 */
export default observer(function NavigationHeader({ title, handleNavigateBack, mode = 'default' }: IProps) {
  const { ingredientsStore } = useStore();
  const { selectedRecipe } = ingredientsStore;
  const insets = useSafeAreaInsets();

  const height = insets.top + globalConstants.insetHeight;

  return (
    <>
      <View style={[styles.container, { marginTop: height }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons onPress={handleNavigateBack} name="arrow-back-sharp" style={styles.icon} />
          <Text style={styles.title}>{title}</Text>
        </View>
        {mode === 'recipe' ? <Ionicons name="heart-outline" style={styles.icon} /> : null}
      </View>
      <StatusBar style="light"></StatusBar>
    </>
  );
});

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
    justifyContent: 'space-between',
  },

  icon: {
    ...globalStyles.icon,
    marginRight: 16,
    marginLeft: 16,
  },

  title: {
    ...globalStyles.headerH2,
    fontSize: 20,
    marginBottom: 0,
  },
});
