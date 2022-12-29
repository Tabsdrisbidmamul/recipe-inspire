import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React from 'react';
import SettingsToggle from '../../components/Buttons/SettingsToggle';
import BaseCard from '../../components/Cards/BaseCard';
import BaseModal from '../../components/Modal/BaseModal';
import RootView from '../../components/Root/RootView';
import useStore from '../../hooks/useStore';

/**
 * Diets screen
 */
export default observer(function Diets() {
  const navigation = useNavigation();
  const { ingredientsStore } = useStore();

  const { filters } = ingredientsStore;

  function navigateGoBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <RootView isScrollable mode="add" title="Ingredients" showHeader onPress={navigateGoBack}>
      <BaseCard>
        {Object.entries(filters).map((el, i) => (
          <SettingsToggle key={i} name={el[0]} value={el[1]} />
        ))}
      </BaseCard>
    </RootView>
  );
});
