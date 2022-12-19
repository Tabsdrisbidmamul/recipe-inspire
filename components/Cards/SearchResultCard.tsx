import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import globalConstants from '../../constants/globalConstants';
import { globalStyles } from '../../constants/globalStyles';
import BaseCard from './BaseCard';
import RenderHtml from 'react-native-render-html';

interface IProps {
  id: string;
  uri: string;
  title: string;
  summary: string;
}

/**
 * Search result card, the summary from Spoonacular is html encoded - passing this through a renderer to render out the html as text
 * @param param0
 * @returns
 */
export default function SearchResultCard({ id, uri, title, summary }: IProps) {
  const navigation = useNavigation();

  function handleCardPressedNavigateToRecipeDetailScreen() {
    //@ts-ignore
    navigation.navigate('Details', {
      recipeId: id,
    });
  }

  return (
    <BaseCard mode="link" onPress={handleCardPressedNavigateToRecipeDetailScreen} style={styles.cardContainer}>
      <Image
        source={{
          uri,
        }}
        style={styles.image}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.header}>{title}</Text>
        <RenderHtml
          contentWidth={250}
          source={{
            html: `${summary.slice(0, 100)}...`,
          }}
          tagsStyles={tagStyles}
        ></RenderHtml>
      </View>
    </BaseCard>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    paddingHorizontal: 0,
    paddingVertical: 0,
    ...globalStyles.baseContentMargin,
  },
  image: {
    width: 125,
    height: 'auto',
    borderTopLeftRadius: globalConstants.cardBorderRadius,
    borderBottomLeftRadius: globalConstants.cardBorderRadius,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 10,
    marginLeft: 10,
  },
  header: {
    ...globalStyles.baseHeaderText,
    maxWidth: 250,
  },
  text: {
    ...globalStyles.baseText,
    maxWidth: 250,
  },
});

const tagStyles = {
  body: {
    ...globalStyles.baseText,
    maxWidth: 200,
    maxHeight: 200,
    fontSize: 16,
    marginBottom: 18,
  },
};
