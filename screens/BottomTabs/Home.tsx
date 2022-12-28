import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import ImageCard from '../../components/Cards/ImageCard';
import Content from '../../components/Content/Content';
import SearchField from '../../components/Inputs/SearchField';
import LottieLoader from '../../components/Loader/LottieLoader';
import RootView from '../../components/Root/RootView';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';
import useStore from '../../hooks/useStore';
import { RandomRecipes, Result } from '../../interfaces/results.interface';
import { createUser, obj, readFirestore, signInUser, writeToFirestore } from '../../firebase';
/**
 * Tab screen for home, this is not the screen for search results, but rather a content page where we can present the option to go to search results page, but also misc. items for quick searches or inspiration on what to search. We also present
 * @returns
 */
export default observer(function Home() {
  const { ingredientsStore } = useStore();
  const navigation = useNavigation();
  const { getRandomRecipe, randomRecipe, loader, setNavigationId } = ingredientsStore;

  const [recipe, setRecipe] = useState<Result>({} as Result);

  useLayoutEffect(() => {
    getRandomRecipe();
    // signInUser('admin@email.com', 'Password@123');
    // writeToFirestore('favourites', 'gnelQua21VNJ8NbFuF8B2vTWAzI2', { recipes: [obj] });
  }, []);

  useLayoutEffect(() => {
    if (randomRecipe.recipes) {
      setRecipe(randomRecipe.recipes[0]);
    }
  }, [randomRecipe]);

  function handleImageCardPress(id: number) {
    setNavigationId(id);

    //@ts-ignore
    navigation.navigate('Details');
  }

  return (
    <RootView isScrollable>
      <SearchField mode="button" />

      {loader ? (
        <LottieLoader />
      ) : (
        <Content style={{ marginTop: 10 }}>
          <Text style={styles.header}>Recipe of the day</Text>
          <Pressable
            accessible
            accessibilityLabel="Radom recipe  card"
            accessibilityHint="Navigate to recipe detail screen"
            onPress={() => handleImageCardPress(recipe.id)}
          >
            <ImageCard
              uri={recipe.image}
              readyInMinutes={recipe.readyInMinutes}
              servings={recipe.servings}
              title={recipe.title}
            />
          </Pressable>
        </Content>
      )}
    </RootView>
  );
});

const styles = StyleSheet.create({
  header: {
    ...globalStyles.headerH2,
  },
});
