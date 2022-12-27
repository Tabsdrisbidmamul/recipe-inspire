import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Switch, Platform } from 'react-native';
import { globalStyles } from '../../constants/globalStyles';
import useStore from '../../hooks/useStore';

interface IProps {
  name: string;
  value: boolean;
}

/**
 * Base settings toggle, which will output
 * @param param0
 * @returns
 */
export default observer(function SettingsToggle({ name, value }: IProps) {
  const { ingredientsStore } = useStore();
  const [isEnable, setIsEnabled] = useState(value);

  const {
    setCommonIngredients,
    storeCommonIngredientsToLocalStorage,
    setScannedIngredientsFilter,
    removeScannedIngredientFilters,
  } = ingredientsStore;

  useEffect(() => {
    setCommonIngredients(name.toLowerCase(), isEnable);
    storeCommonIngredientsToLocalStorage();
  }, [isEnable, setCommonIngredients, storeCommonIngredientsToLocalStorage]);

  function toggleSwitch() {
    if (isEnable) {
      removeScannedIngredientFilters(name);
      setIsEnabled(false);
    } else {
      setScannedIngredientsFilter(name, true);
      setIsEnabled(true);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name.charAt(0).toUpperCase() + name.substring(1).toLowerCase()}</Text>
      <Switch
        accessible
        accessibilityLabel="Switch toggle"
        accessibilityHint={`Set the setting for ${name} on or off`}
        onValueChange={toggleSwitch}
        value={isEnable}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        ...globalStyles.baseContentMargin,
      },
    }),
  },
  text: {
    ...globalStyles.baseText,
  },
});
