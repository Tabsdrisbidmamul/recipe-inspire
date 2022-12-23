import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { observer } from 'mobx-react-lite';
import React, { useLayoutEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import BaseCard from '../../components/Cards/BaseCard';
import ImageCard from '../../components/Cards/ImageCard';
import Content from '../../components/Content/Content';
import NavigationHeader from '../../components/Header/NavigationHeader';
import RootView from '../../components/Root/RootView';
import useStore from '../../hooks/useStore';
import { Result } from '../../interfaces/results.interface';
import Column from '../../layouts/column/Colum';
import Row from '../../layouts/row/Row';
import RenderHtml from 'react-native-render-html';
import { globalStyles, globalTagStyles } from '../../constants/globalStyles';
import colors from '../../constants/colors';
import PillContainer from '../../components/Pill/PillContainer';
import Pill from '../../components/Pill/Pill';
import IngredientDetails from '../../components/Cards/IngredientDetails';
import LottieLoader from '../../components/Loader/LottieLoader';
import MethodDetails from '../../components/Cards/MethodDetails';
import RecommendedCard from '../../components/Cards/RecommenedCard';

/**
 * Recipe Detail screen we fetch the recipe on screen load and set the recipe on load as well, this is to avoid endless calls from spam clicks from the results view
 */
export default observer(function Details() {
  const navigation = useNavigation();
  const route = useRoute();
  const { ingredientsStore } = useStore();
  const {
    selectedRecipe,
    getRecipe,
    loader,
    getRecommendedRecipes,
    popPreviousRecipe,
    previousRecipe,
    navigationId,
    setNavigationId,
  } = ingredientsStore;

  const [recipe, setRecipe] = useState<Result>({} as Result);

  useLayoutEffect(() => {
    getRecipe(+navigationId);
    getRecommendedRecipes(+navigationId);
  }, [route.params]);

  useLayoutEffect(() => {
    setRecipe(selectedRecipe);
  }, [selectedRecipe]);

  function handlePressBack() {
    //@ts-ignore
    if (navigation.canGoBack()) {
      if (previousRecipe.length) {
        const previousRecipe = popPreviousRecipe();

        if (previousRecipe !== undefined) {
          setNavigationId(previousRecipe.id);
        }
      }
      navigation.goBack();
    }
  }

  return (
    <RootView isScrollable>
      <NavigationHeader handleNavigateBack={handlePressBack} title="Recipe" mode="recipe" />

      {loader ? (
        <LottieLoader />
      ) : (
        <>
          <ImageCard
            uri={recipe.image}
            readyInMinutes={recipe.readyInMinutes}
            servings={recipe.servings}
            title={recipe.title}
          />

          <Content style={{ justifyContent: 'center' }}>
            <PillContainer style={{ marginTop: 20, marginBottom: -20 }}>
              {recipe.diets?.map((el, i) => (
                <Pill key={i} message={el} />
              ))}
            </PillContainer>
          </Content>

          <IngredientDetails extendedDetails={recipe.extendedIngredients} />

          <MethodDetails analyzedInstructions={recipe.analyzedInstructions} />

          <RecommendedCard recipe={recipe} />
        </>
      )}
    </RootView>
  );
});

const styles = StyleSheet.create({
  header: {
    ...globalStyles.headerH2,
    color: colors.whites.doveGrey,
    fontFamily: 'nunito-semibold',
    fontSize: 28,
  },
  text: {
    ...globalStyles.baseText,
  },
});

const tagStyles = {
  body: {
    ...globalTagStyles.body,
    maxHeight: 'unset',
    maxWidth: 'unset',
    fontSize: 16,
  },
};
