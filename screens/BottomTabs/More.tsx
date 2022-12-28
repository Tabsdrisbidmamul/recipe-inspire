import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ButtonHorizontal from '../../components/Buttons/ButtonHorizontal';
import AuthButton from '../../components/Buttons/AuthButton';
import BaseCard from '../../components/Cards/BaseCard';
import Content from '../../components/Content/Content';
import ContentHeader from '../../components/Header/ContentHeader';
import RootView from '../../components/Root/RootView';
import useStore from '../../hooks/useStore';

/**
 * Settings screen
 * - user area
 * - change default ingredients
 * - misc
 */
export default observer(function More() {
  const navigation = useNavigation();
  const { userStore } = useStore();
  const { user, setUser } = userStore;

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

  async function authForm() {
    if (user !== undefined) {
      await setUser(undefined);
    } else {
      //@ts-ignore
      navigation.navigate('LoginForm');
    }
  }

  return (
    <RootView>
      <ContentHeader title="More" />

      <Content>
        <AuthButton
          mode={user !== undefined ? 'logout' : 'login'}
          message={user !== undefined ? 'Logout' : 'Login'}
          onPress={authForm}
        />
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
