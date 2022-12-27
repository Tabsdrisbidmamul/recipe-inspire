import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Pressable, Text } from 'react-native';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';
import useStore from '../../hooks/useStore';
import { Entypo } from '@expo/vector-icons';

export default observer(function SearchIngredients() {
  const { ingredientsStore } = useStore();
  const { scannedIngredientsFilter, removeScannedIngredientFilters } = ingredientsStore;

  function handleIngredientPressed(key: string) {
    removeScannedIngredientFilters(key);
  }

  const content = Object.keys(scannedIngredientsFilter).map((el, i) => (
    <Pressable
      key={i}
      accessible
      accessibilityLabel="Filter option"
      accessibilityHint={`Filter for ${el} currently is toggled`}
      style={[styles.pill, styles.active]}
      onPress={() => handleIngredientPressed(el)}
    >
      <Text style={[styles.text, styles.activeText]}>{el}</Text>
      <Entypo name="cross" style={styles.icon} />
    </Pressable>
  ));

  return (
    <View style={styles.root}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {content}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    ...globalStyles.baseContentMargin,
    marginTop: -10,
  },
  pill: {
    ...globalStyles.basePill,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  active: {
    backgroundColor: colors.blacks.charcoal,
  },
  text: {
    ...globalStyles.baseText,
    color: colors.blacks.deep,
    fontSize: 14,
  },
  activeText: {
    color: colors.whites.pastel,
  },
  icon: {
    color: colors.whites.pastel,
    fontSize: 18,
    marginTop: 2,
  },
});
