import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ButtonHorizontal from '../../components/Buttons/ButtonHorizontal';
import LoginButton from '../../components/Buttons/LoginButton';
import BaseCard from '../../components/Cards/BaseCard';
import Content from '../../components/Content/Content';
import ContentHeader from '../../components/Header/ContentHeader';
import RootView from '../../components/Root/RootView';

/**
 * Settings screen
 * - user area
 * - change default ingredients
 * - misc
 */
export default observer(function More() {
  const navigation = useNavigation();

  function navigateToSettings() {
    //@ts-ignore
    navigation.navigate('Settings');
  }

  function navigateToIngredients() {
    //@ts-ignore
    navigation.navigate('Ingredients');
  }

  function navigateToDiets() {
    //@ts-ignore
    navigation.navigate('Diets');
  }

  return (
    <RootView>
      <ContentHeader title="More" />

      <Content>
        <LoginButton />
      </Content>

      <BaseCard>
        <View>
          <ButtonHorizontal onPress={navigateToSettings} text="Settings" />
          <ButtonHorizontal onPress={navigateToIngredients} style={{ marginBottom: 0 }} text="Ingredients" />
          {/* <ButtonHorizontal onPress={navigateToDiets} style={{ marginBottom: 0 }} text="Diets" /> */}
        </View>
      </BaseCard>
    </RootView>
  );
});
