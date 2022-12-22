import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView, View, StyleSheet, Text, Pressable } from 'react-native';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';
import useStore from '../../hooks/useStore';

/**
 * Filters for search
 */
export default observer(function SearchFilters() {
  const { ingredientsStore } = useStore();
  const { filters, setFilters } = ingredientsStore;

  function handleFilterPressed(key: string) {
    setFilters(key, !filters[key]);
  }

  const content = Object.entries(filters).map((el, i) => (
    <Pressable
      onPress={() => handleFilterPressed(el[0])}
      accessible
      accessibilityLabel="Filter option"
      accessibilityHint={`Filter for ${el[0]} currently is toggled as ${el[1] ? 'on' : 'off'}`}
      key={i}
      style={[styles.pill, el[1] ? styles.active : null]}
    >
      <Text style={[styles.text, el[1] ? styles.activeText : null]}>{el[0]}</Text>
    </Pressable>
  ));

  return (
    <View accessible style={styles.root}>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {content}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    ...globalStyles.baseContentMargin,
  },
  pill: {
    ...globalStyles.basePill,
    marginRight: 10,
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
});
