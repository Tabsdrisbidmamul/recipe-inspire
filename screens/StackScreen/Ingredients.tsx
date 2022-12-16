import { LinearGradient } from 'expo-linear-gradient';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';
import { DetailsHeaderScrollView } from 'react-native-sticky-parallax-header';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default observer(function Ingredients() {
  const navigation = useNavigation();

  function navigateGoBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <LinearGradient style={styles.root} colors={[colors.gradient.orange, colors.gradient.yellow]}>
      <DetailsHeaderScrollView
        leftTopIcon={() => <Ionicons name="arrow-back-sharp" size={24} color="black" />}
        leftTopIconOnPress={navigateGoBack}
        containerStyle={styles.headerStyle}
        contentContainerStyle={[{ backgroundColor: colors.blacks.charcoal }]}
        backgroundColor={colors.blacks.charcoal}
        titleStyle={styles.header}
        title="Ingredients"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text>A header</Text>
        </View>
      </DetailsHeaderScrollView>
      <StatusBar style="light" />
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
