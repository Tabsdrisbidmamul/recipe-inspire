import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';
import globalConstants from '../../constants/globalConstants';
import { globalStyles, globalTagStyles } from '../../constants/globalStyles';
import BaseCard from './BaseCard';
import RenderHtml from 'react-native-render-html';
import PillContainer from '../Pill/PillContainer';
import Pill from '../Pill/Pill';
import { observer } from 'mobx-react-lite';
import useStore from '../../hooks/useStore';
import colors from '../../constants/colors';

interface IProps {
  id: string;
  uri: string;
  title: string;
  summary: string;
  diets: string[];
  readyInMinutes: number;
  servings: number;
}

/**
 * Search result card, the summary from Spoonacular is html encoded - passing this through a renderer to render out the html as text
 * @param param0
 * @returns
 */
export default observer(function SearchResultCard({
  id,
  uri,
  title,
  summary,
  diets,
  readyInMinutes,
  servings,
}: IProps) {
  const navigation = useNavigation();
  const { ingredientsStore } = useStore();
  const { setNavigationId } = ingredientsStore;

  function handleCardPressedNavigateToRecipeDetailScreen() {
    setNavigationId(+id);

    //@ts-ignore
    navigation.navigate('Details');
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
        accessible
        accessibilityLabel={title}
        accessibilityHint="Recipe Image"
      />
      <View accessible style={styles.contentContainer}>
        <Text style={styles.header}>{extractWords(title)}...</Text>
        <PillContainer style={{ maxWidth: Dimensions.get('screen').width < 400 ? 200 : 250 }}>
          {diets.map((el, i) => (
            <Pill key={i} message={el} />
          ))}
        </PillContainer>
        <RenderHtml
          contentWidth={Dimensions.get('screen').width < 400 ? 200 : 250}
          source={{
            html: `${summary.slice(0, 100)}...`,
          }}
          tagsStyles={tagStyles}
        ></RenderHtml>
        <View style={styles.readyAndServingsContainer}>
          <Text style={[styles.text, styles.readyAndServingsText]}>Ready in {readyInMinutes} minutes</Text>
          <View style={styles.circle}></View>
          <Text style={styles.readyAndServingsText}>Servings {servings}</Text>
        </View>
      </View>
    </BaseCard>
  );
});

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
  readyAndServingsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 10,
    maxWidth: Dimensions.get('screen').width < 400 ? 200 : 250,
  },
  readyAndServingsText: {
    fontSize: 13,
    color: colors.whites.doveGrey,
  },
  circle: {
    ...globalStyles.circle,
    backgroundColor: colors.blacks.charcoal,
    marginHorizontal: 8,
    marginTop: 2,
  },
});

const tagStyles = {
  body: {
    ...globalTagStyles.body,
    maxWidth: Dimensions.get('screen').width < 400 ? 175 : 250,
  },
};
