import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';

export default observer(function SearchIngredients() {
  let content = <></>;

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
