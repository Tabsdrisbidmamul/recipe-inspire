import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RootView from '../../components/Root/RootView';
import BaseCard from '../../components/Cards/BaseCard';
import SettingsToggle from '../../components/Buttons/SettingsToggle';
import useStore from '../../hooks/useStore';
import BaseModal from '../../components/Modal/BaseModal';

/**
 * Ingredients screen - toggle different ingredients
 */
export default observer(function Ingredients() {
  const { ingredientsStore, commonStore } = useStore();
  const navigation = useNavigation();

  const {
    getCommonIngredientsFromLocalStorage,
    commonIngredients,
    setCommonIngredients,
    storeCommonIngredientsToLocalStorage,
    setScannedIngredientsFilter,
    fetchResults,
  } = ingredientsStore;

  const { toggleModal } = commonStore;

  function navigateGoBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  useEffect(() => {
    getCommonIngredientsFromLocalStorage();
  }, []);

  async function handleModalInputSubmission(value: string) {
    toggleModal();
    setCommonIngredients(value.trim().toLowerCase(), true);

    await storeCommonIngredientsToLocalStorage();

    // eager search to force search results screen to have results
    setScannedIngredientsFilter(value, true);
    await fetchResults();
  }

  return (
    <RootView isScrollable mode="add" title="Ingredients" showHeader onPress={navigateGoBack}>
      <BaseCard>
        {Object.entries(commonIngredients).map((el, i) => (
          <SettingsToggle key={i} name={el[0]} value={el[1]} />
        ))}
      </BaseCard>
      <BaseModal mode="add" onPress={handleModalInputSubmission} />
    </RootView>
  );
});

const styles = StyleSheet.create({});
