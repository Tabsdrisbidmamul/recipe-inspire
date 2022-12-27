import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import colors from '../../constants/colors';
import globalConstants from '../../constants/globalConstants';
import { globalStyles } from '../../constants/globalStyles';

interface IProps {
  value: string;
  onChangeText: (...args: any) => any;
  accessibilityLabel: string;
  accessibilityHint: string;
  accessible: boolean;
}

/**
 * Generic Input for the base modal
 * @param props
 * @returns
 */
export default function ModalInput({ value, onChangeText, accessibilityHint, accessibilityLabel, accessible }: IProps) {
  return (
    <TextInput
      style={styles.input}
      accessible
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      value={value}
      onChangeText={onChangeText}
      placeholder={accessibilityLabel}
      placeholderTextColor={colors.whites.doveGrey}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    backgroundColor: colors.whites.pastel,
    borderRadius: globalConstants.cardBorderRadius,
    marginBottom: 12,
    ...globalStyles.baseText,
  },
});
