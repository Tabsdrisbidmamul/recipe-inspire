import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import globalConstants from '../../constants/globalConstants';
import { globalStyles } from '../../constants/globalStyles';

interface IProps {
  accessible: boolean;
  accessibilityLabel: string;
  accessibilityHint: string;
  onPress: (...args: any) => any;
  message: string;
  value: string;
}

export default function ModalButton({
  accessibilityHint,
  accessibilityLabel,
  accessible,
  onPress,
  message,
  value,
}: IProps) {
  return (
    <Pressable
      accessible
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      onPress={() => onPress(value)}
      style={styles.button}
    >
      <Text style={styles.text}>{message}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: globalConstants.cardBorderRadius,
    backgroundColor: colors.primary.green,
  },
  text: {
    ...globalStyles.baseText,
    textAlign: 'center',
  },
});
