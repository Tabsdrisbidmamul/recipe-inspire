import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ButtonHorizontal from '../../components/Buttons/ButtonHorizontal';
import LoginButton from '../../components/Buttons/LoginButton';
import BaseCard from '../../components/Cards/BaseCard';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';

/**
 * Settings screen
 * - user area
 * - change default ingredients
 * - misc
 */
export default observer(function More() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const height = insets.top + 15;

  function navigateToSettings() {
    //@ts-ignore
    navigation.navigate('Settings');
  }

  function navigateToIngredients() {
    //@ts-ignore
    navigation.navigate('Ingredients');
  }

  return (
    <LinearGradient style={[styles.root]} colors={[colors.gradient.orange, colors.gradient.yellow]}>
      <View style={[styles.container, { paddingTop: height }]}>
        <Text style={[styles.header]}>More</Text>

        <View style={styles.content}>
          <LoginButton />
        </View>

        <BaseCard style={styles.content}>
          <View style={styles.settingContainer}>
            <ButtonHorizontal onPress={navigateToSettings} text="Settings" />
            <ButtonHorizontal onPress={navigateToIngredients} style={{ marginBottom: 0 }} text="Ingredients" />
          </View>
        </BaseCard>
      </View>
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  container: {
    flex: 1,
    ...globalStyles.baseContainerPaddingHorizontal,
  },
  content: {
    ...globalStyles.baseContentMargin,
  },
  loginText: {
    ...globalStyles.baseText,
    ...globalStyles.headerH2,
  },
  header: {
    ...globalStyles.baseHeaderText,
  },
  settingContainer: {
    padding: 16,
  },
});
