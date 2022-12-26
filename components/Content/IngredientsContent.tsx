import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import globalConstants from '../../constants/globalConstants';
import { globalStyles } from '../../constants/globalStyles';
import { IPhotoAndResults } from '../../interfaces/results.interface';
import { ingredientsMode } from '../../types/ingredientsMode.types';
import ImageCard from '../Cards/ImageCard';

interface IProps {
  ingredients: IPhotoAndResults[];
  title: string;
  onTouchStart: any;
  onTouchEnd: any;
  mode: ingredientsMode;
}

/**
 * Scroll view for the scanned ingredients for the camera modal
 * @param props
 * @returns
 */
export default function IngredientsContent({ ingredients, title, onTouchEnd, onTouchStart, mode }: IProps) {
  return (
    <>
      <Text style={styles.header}>{title}</Text>
      <View>
        {ingredients?.map((el, i) => (
          <View
            onTouchStart={(e) => onTouchStart(e, i, mode)}
            onTouchEnd={(e) => onTouchEnd(e, i, mode)}
            style={styles.resultContainer}
            key={i}
          >
            <ImageCard
              readyInMinutes={0}
              servings={0}
              title={el.ingredient}
              uri={el.photo.uri}
              showInformation={false}
              mode={mode}
            />
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    ...globalStyles.headerH2,
    color: colors.whites.pastel,
  },
  resultContainer: {
    flexDirection: 'row',
    borderRadius: globalConstants.cardBorderRadius,
    backgroundColor: colors.whites.pastel,
    marginBottom: 20,
  },
});
