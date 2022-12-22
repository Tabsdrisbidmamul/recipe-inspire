import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { observer } from 'mobx-react-lite';
import React, { useLayoutEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import BaseCard from '../../components/Cards/BaseCard';
import ImageCard from '../../components/Cards/ImageCard';
import NavigationHeader from '../../components/Header/NavigationHeader';
import RootView from '../../components/Root/RootView';
import useStore from '../../hooks/useStore';
import { Result } from '../../interfaces/results.interface';

export default observer(function Details() {
  const navigation = useNavigation();
  const route = useRoute();
  const { ingredientsStore } = useStore();
  const { searchResultsCache } = ingredientsStore;

  const [recipe, setRecipe] = useState<Result>({} as Result);

  useLayoutEffect(() => {
    // @ts-ignore
    const { recipeId } = route.params;

    const foundRecipe = searchResultsCache.find((el) => el.id === +recipeId);

    if (foundRecipe === undefined) return;

    setRecipe(foundRecipe);
  }, [route.params]);

  function handlePressBack() {
    //@ts-ignore
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <RootView isScrollable>
      <NavigationHeader handleNavigateBack={handlePressBack} title={recipe.title} />

      <ImageCard uri={recipe.image} />
    </RootView>
  );
});

const styles = StyleSheet.create({});
