import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import ImageCard from '../../components/Cards/ImageCard';
import ContentHeader from '../../components/Header/ContentHeader';
import SearchField from '../../components/Inputs/SearchField';
import RootView from '../../components/Root/RootView';
import colors from '../../constants/colors';
import { globalStyles } from '../../constants/globalStyles';
import useStore from '../../hooks/useStore';

/**
 * Tab screen for favourites
 * @returns
 */
export default observer(function Favourites() {
  const navigation = useNavigation();
  const { userStore, ingredientsStore } = useStore();
  const { user, favourites } = userStore;

  const { setNavigationId } = ingredientsStore;

  function navigateToRecipe(id: number) {
    setNavigationId(id);

    //@ts-ignore
    navigation.navigate('Details');
  }

  return (
    <RootView isScrollable>
      <ContentHeader title="Favorites" />

      {user === undefined ? (
        <Text style={styles.text}>Log in to see your favourite recipes</Text>
      ) : favourites.length === 0 ? (
        <Text style={styles.text}>Your favourites are empty, how about adding a recipe</Text>
      ) : (
        <View style={styles.root}>
          {favourites.map((el, i) => (
            <Pressable
              accessible
              accessibilityLabel="Recipe image card"
              accessibilityHint="Tap to navigate to recipe view"
              onPress={() => navigateToRecipe(el.id)}
              key={i}
              style={{ marginBottom: 20 }}
            >
              <ImageCard readyInMinutes={el.readyInMinutes} servings={el.servings} title={el.title} uri={el.image} />
            </Pressable>
          ))}
        </View>
      )}
    </RootView>
  );
});

const styles = StyleSheet.create({
  root: {
    marginBottom: 50,
  },
  text: {
    ...globalStyles.baseText,
    color: colors.whites.doveGrey,
  },
});
