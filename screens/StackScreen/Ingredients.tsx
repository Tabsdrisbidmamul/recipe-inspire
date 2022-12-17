import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { StyleSheet, Switch } from 'react-native';
import { globalStyles } from '../../constants/globalStyles';
import { useNavigation } from '@react-navigation/native';
import NavigationHeader from '../../components/Header/NavigationHeader';
import ContentHeader from '../../components/Header/ContentHeader';
import RootView from '../../components/Root/RootView';
import BaseCard from '../../components/Cards/BaseCard';
import SettingsToggle from '../../components/Buttons/SettingsToggle';
import useStore from '../../hooks/useStore';

export default observer(function Ingredients() {
  const { ingredientsStore } = useStore();
  const navigation = useNavigation();

  const { getCommonIngredientsFromLocalStorage, commonIngredients } = ingredientsStore;

  function navigateGoBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  useEffect(() => {
    getCommonIngredientsFromLocalStorage();
  }, []);

  return (
    <RootView isScrollable>
      <NavigationHeader title="Ingredients" handleNavigateBack={navigateGoBack} />

      {/* <ContentHeader title="Bare Minimum" /> */}

      <BaseCard>
        {Object.entries(commonIngredients).map((el, i) => (
          <SettingsToggle key={i} name={el[0]} value={el[1]} />
        ))}
      </BaseCard>
    </RootView>
  );
});

const styles = StyleSheet.create({});
