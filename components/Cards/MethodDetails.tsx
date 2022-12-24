import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';
import { AnalyzedInstruction, Step } from '../../interfaces/results.interface';
import BaseCard from './BaseCard';

interface IProps {
  analyzedInstructions: AnalyzedInstruction[];
}

/**
 *
 * @param props
 * @returns
 */
export default function MethodDetails({ analyzedInstructions }: IProps) {
  const [steps, setSteps] = useState<string[]>([]);

  useLayoutEffect(() => {
    const steps: string[] = [];
    analyzedInstructions?.forEach((el) => {
      el.steps.forEach((step) => {
        steps.push(step.step);
      });
    });
    setSteps(steps);
  }, [analyzedInstructions]);

  return (
    <BaseCard style={{ backgroundColor: colors.secondary['gradient pink lighter'], marginTop: 12 }}>
      <Text style={styles.header}>Method</Text>
      <View style={styles.methodContainer}>
        {steps.map((el, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', maxWidth: 300, marginBottom: 8 }}>
            <Text style={[styles.text, { marginRight: 10 }]}>{i + 1}</Text>
            <Text style={styles.text}>{el}</Text>
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
  methodContainer: {
    maxWidth: Dimensions.get('screen').width < 400 ? 250 : 300,
  },
  text: {
    ...globalStyles.baseText,
    fontSize: 16,
  },
});
