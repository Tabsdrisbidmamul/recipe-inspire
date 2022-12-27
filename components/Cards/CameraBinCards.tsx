import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { IPhotoAndResults } from '../../interfaces/results.interface';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/colors';

interface IProps {
  onPress: (...args: any) => any;
  cards: IPhotoAndResults[];
}

/**
 * Camera roll for ingredients to not include in the search
 * @param props
 * @returns
 */
export default function CameraBinCards({ onPress, cards }: IProps) {
  return cards?.length ? (
    <Pressable
      accessible
      accessibilityLabel="Image bin card stack"
      accessibilityHint="Stack of images that have been added to the remove stack"
      style={styles.iconContainer}
      onPress={onPress}
    >
      <View>
        <Ionicons name="ios-trash-bin" size={50} color={colors.whites.pastel} />
      </View>
    </Pressable>
  ) : null;
}

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    bottom: 15,
    left: -25,
    zIndex: 10,
  },
});
