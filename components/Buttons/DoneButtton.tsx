import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import globalConstants from '../../constants/globalConstants';
import { globalStyles } from '../../constants/globalStyles';

interface IProps {
  onPress: any;
}

/**
 * Button to navigate to the search results screen
 * @param props
 * @returns
 */
export default function DoneButton({ onPress }: IProps) {
  return (
    <Pressable
      accessible
      accessibilityLabel="Done button"
      accessibilityHint="Navigates to the recipe search screen"
      style={styles.doneButton}
      onPress={onPress}
    >
      <Text style={[styles.text, { textAlign: 'center' }]}>Done</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  doneButton: {
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: globalConstants.cardBorderRadius,
    backgroundColor: colors.primary.green,
    marginBottom: 30,
    marginRight: 5,
    alignSelf: 'flex-end',
  },

  text: {
    ...globalStyles.baseText,
    color: colors.whites.pastel,
  },
});
