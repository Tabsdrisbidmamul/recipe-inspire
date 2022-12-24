import colors from '../../constants/colors';
import BaseCard from './BaseCard';
import { Text, StyleSheet, View, Pressable } from 'react-native';
import { globalStyles } from '../../constants/globalStyles';
import Content from '../Content/Content';
import { observer } from 'mobx-react-lite';
import useStore from '../../hooks/useStore';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { RecommendResult, Result } from '../../interfaces/results.interface';
import ImageCard from './ImageCard';
import LottieLoader from '../Loader/LottieLoader';
import { useNavigation } from '@react-navigation/native';

interface IProps {
  recipe: Result;
}

/**
 * Recommended panel for selected recipe
 */
export default observer(function RecommendedCard({ recipe }: IProps) {
  const navigation = useNavigation();
  const { ingredientsStore } = useStore();
  const { recommendedRecipes, recommendedLoader, pushToPreviousRecipeIds, setNavigationId } = ingredientsStore;

  const [recipes, setRecipes] = useState<RecommendResult[]>([]);

  useEffect(() => {
    setRecipes(recommendedRecipes);
  }, [recommendedRecipes]);

  function handleCardPressed(id: number) {
    // push the previous parent recipe
    pushToPreviousRecipeIds(recipe.id.toString());

    // set the clicked recipe as the current recipe
    setNavigationId(id);

    //@ts-ignore
    navigation.push('Details');
  }

  return recommendedLoader ? (
    <LottieLoader />
  ) : (
    <Content style={{ marginTop: 12 }}>
      <Text style={styles.header}>More like this</Text>
      <View>
        {recipes.map((el, i) => (
          <Pressable
            accessible
            accessibilityLabel="Recommended recipe"
            accessibilityHint={`Navigate to ${el.title}`}
            onPress={() => handleCardPressed(el.id)}
            key={i}
          >
            <ImageCard
              title={el.title}
              readyInMinutes={el.readyInMinutes}
              servings={el.servings}
              uri={el.image}
              style={{ marginBottom: 20 }}
            />
          </Pressable>
        ))}
      </View>
    </Content>
  );
});

const styles = StyleSheet.create({
  header: {
    ...globalStyles.headerH2,
  },
});
