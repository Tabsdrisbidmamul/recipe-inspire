import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import globalConstants from '../../constants/globalConstants';
import { IPhotoAndResults } from '../../interfaces/results.interface';

interface IProps {
  cards: IPhotoAndResults[];
  onPress: (...args: any) => any;
}

/**
 * Camera roll of images
 * @param props
 * @returns
 */
export default function CameraCards({ cards, onPress }: IProps) {
  return (
    <Pressable
      accessible
      accessibilityLabel="Image card stack"
      accessibilityHint="Stack of images that have been taken"
      style={styles.ingredientsContainer}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        {cards.map((el, i) => (
          <View style={styles.innerImageContainer} key={i}>
            <Image
              style={[
                styles.image,
                i === 0 ? { transform: [{ rotate: '10deg' }], zIndex: 3 } : null,
                i === 1 ? { transform: [{ rotate: '-20deg' }], zIndex: 2 } : null,
                i === 2 ? { transform: [{ rotate: '45deg' }], zIndex: 1 } : null,
              ]}
              source={{
                uri: el.photo.uri,
              }}
            />
          </View>
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  ingredientsContainer: {
    position: 'absolute',
    bottom: 70,
    right: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  innerImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  image: {
    width: 30,
    height: 60,
    borderRadius: globalConstants.cardBorderRadius,
    resizeMode: 'cover',
    aspectRatio: 1 / 1,
  },
});
