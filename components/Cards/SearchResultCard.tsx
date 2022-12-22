import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import globalConstants from '../../constants/globalConstants';
import { globalStyles, globalTagStyles } from '../../constants/globalStyles';
import BaseCard from './BaseCard';
import RenderHtml from 'react-native-render-html';
import PillContainer from '../Pill/PillContainer';
import Pill from '../Pill/Pill';

interface IProps {
  id: string;
  uri: string;
  title: string;
  summary: string;
  diets: string[];
}

/**
 * Search result card, the summary from Spoonacular is html encoded - passing this through a renderer to render out the html as text
 * @param param0
 * @returns
 */
export default function SearchResultCard({ id, uri, title, summary, diets: diet }: IProps) {
  const navigation = useNavigation();

  function handleCardPressedNavigateToRecipeDetailScreen() {
    //@ts-ignore
    navigation.navigate('Details', {
      recipeId: id,
    });
  }

  function extractWords(title: string) {
    if (title === null) return;

    const regexp = new RegExp(/(\w|\s)*\w(?=")|\w+/g);

    const matched = title.match(regexp);

    return matched?.slice(0, 2).join(' ');
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
        <Text style={styles.header}>{extractWords(title)}...</Text>
        <PillContainer style={{ maxWidth: 250 }}>
          {diet.map((el, i) => (
            <Pill key={i} message={el} />
          ))}
        </PillContainer>
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
    ...globalStyles.baseContainerMarginHorizontal,
    ...globalStyles.baseContainerMarginVertical,
  },
  header: {
    ...globalStyles.baseHeaderText,
    maxWidth: 225,
    marginBottom: 10,
  },
  text: {
    ...globalStyles.baseText,
    maxWidth: 250,
  },
});

const tagStyles = {
  body: {
    ...globalTagStyles.body,
  },
};
