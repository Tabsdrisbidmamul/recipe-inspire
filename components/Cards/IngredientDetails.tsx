import BaseCard from './BaseCard';
import { ExtendedIngredient } from '../../interfaces/results.interface';
import React, { useLayoutEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { globalStyles } from '../../constants/globalStyles';
import colors from '../../constants/colors';

interface IProps {
  extendedDetails: ExtendedIngredient[];
}

/**
 * Ingredient details card, outputs an unordered list of the ingredients
 * @param props
 * @returns
 */
export default function IngredientDetails({ extendedDetails }: IProps) {
  return (
    <BaseCard style={{ marginTop: 12, backgroundColor: colors.secondary['gradient pink lighter'] }}>
      <Text accessible accessibilityLabel="Title" accessibilityHint="Ingredients header" style={styles.header}>
        Ingredients
      </Text>
      <View>
        {extendedDetails?.map((el, i) => (
          <View accessible accessibilityLabel="" style={styles.container} key={i}>
            <View style={styles.circle}></View>
            <Text style={styles.text}>
              <Text>{el.original}</Text>{' '}
              <Text style={styles.metricText}>
                ({el.measures.metric.amount}
                {el.measures.metric.unitShort})
              </Text>
            </Text>
          </View>
        ))}
      </View>
    </BaseCard>
  );
}

const styles = StyleSheet.create({
  header: {
    ...globalStyles.headerH2,
    color: colors.primary.red,
  },
  container: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  text: {
    ...globalStyles.baseText,
    marginBottom: 10,
    fontSize: 16,
    maxWidth: 300,
  },
  metricText: {
    marginLeft: 20,
  },
  circle: {
    ...globalStyles.circle,
    backgroundColor: colors.blacks.charcoal,
    marginRight: 10,
    marginTop: 8,
  },
});
