import { LinearGradient } from 'expo-linear-gradient';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';
import { useNavigation } from '@react-navigation/native';
import NavigationHeader from '../../components/Header/NavigationHeader';

export default observer(function Ingredients() {
  const navigation = useNavigation();

  function navigateGoBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <LinearGradient style={styles.root} colors={[colors.gradient.orange, colors.gradient.yellow]}>
      <NavigationHeader title="Ingredients" handleNavigateBack={navigateGoBack} />
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    ...globalStyles.baseHeaderText,
  },
  headerStyle: {
    flex: 1,
    alignSelf: 'stretch',
  },
  content: {
    alignItems: 'center',
    flex: 1,
    padding: 24,
  },
});
