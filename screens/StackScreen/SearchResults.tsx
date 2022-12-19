import { observer } from 'mobx-react-lite';
import RootView from '../../components/Root/RootView';
import { KeyboardAvoidingView, StyleSheet, Image, View, Text } from 'react-native';
import SearchField from '../../components/Inputs/SearchField';
import React from 'react';
import BaseCard from '../../components/Cards/BaseCard';
import { globalStyles } from '../../constants/globalStyles';
import globalConstants from '../../constants/globalConstants';
import SearchResultCard from '../../components/Cards/SearchResultCard';

/**
 * Screen for search results
 */
export default observer(function SearchResults() {
  return (
    <RootView isScrollable isKeyboardDismissible>
      <SearchField mode="input" />
      <KeyboardAvoidingView>
        <SearchResultCard
          id="730914"
          uri="https://spoonacular.com/recipeImages/730914-312x231.jpg"
          title="Basil Infused Balsamic Oven Baked Chicken"
          summary={`Basil Infused Balsamic Oven Baked Chicken might be just the main course you are searching for. One serving contains <b>384 calories</b>, <b>32g of protein</b>, and <b>24g of fat</b>. For <b>$2.27 per serving</b>, this recipe <b>covers 22%</b> of your daily requirements of vitamins and minerals. Head to the store and pick up balsamic vinegar, tomato, mozzarella cheese, and a few other things to make it today. To use up the olive oil you could follow this main course with the <a href=\"https://spoonacular.com/recipes/sauteed-banana-granola-and-yogurt-parfait-624619\">Sauteed Banana, Granolan and Yogurt Parfait</a> as a dessert. This recipe is liked by 115 foodies and cooks. It is a good option if you're following a <b>gluten free, primal, and fodmap friendly</b> diet. All things considered, we decided this recipe <b>deserves a spoonacular score of 83%</b>. This score is amazing. Try <a href=\"https://spoonacular.com/recipes/balsamic-citrus-infused-chicken-84033\">Balsamic Citrus Infused Chicken</a>, <a href=\"https://spoonacular.com/recipes/whole-chicken-baked-in-a-thyme-infused-salt-crust-254970\">Whole Chicken Baked in a Thyme Infused Salt Crust</a>, and <a href=\"https://spoonacular.com/recipes/crudite-with-infused-olive-oil-and-balsamic-360918\">Crudite with Infused Olive Oil and Balsamic</a> for similar recipes.`}
        />

        <SearchResultCard
          id="730914"
          uri="https://spoonacular.com/recipeImages/730914-312x231.jpg"
          title="Basil Infused Balsamic Oven Baked Chicken"
          summary={`Basil Infused Balsamic Oven Baked Chicken might be just the main course you are searching for. One serving contains <b>384 calories</b>, <b>32g of protein</b>, and <b>24g of fat</b>. For <b>$2.27 per serving</b>, this recipe <b>covers 22%</b> of your daily requirements of vitamins and minerals. Head to the store and pick up balsamic vinegar, tomato, mozzarella cheese, and a few other things to make it today. To use up the olive oil you could follow this main course with the <a href=\"https://spoonacular.com/recipes/sauteed-banana-granola-and-yogurt-parfait-624619\">Sauteed Banana, Granolan and Yogurt Parfait</a> as a dessert. This recipe is liked by 115 foodies and cooks. It is a good option if you're following a <b>gluten free, primal, and fodmap friendly</b> diet. All things considered, we decided this recipe <b>deserves a spoonacular score of 83%</b>. This score is amazing. Try <a href=\"https://spoonacular.com/recipes/balsamic-citrus-infused-chicken-84033\">Balsamic Citrus Infused Chicken</a>, <a href=\"https://spoonacular.com/recipes/whole-chicken-baked-in-a-thyme-infused-salt-crust-254970\">Whole Chicken Baked in a Thyme Infused Salt Crust</a>, and <a href=\"https://spoonacular.com/recipes/crudite-with-infused-olive-oil-and-balsamic-360918\">Crudite with Infused Olive Oil and Balsamic</a> for similar recipes.`}
        />
      </KeyboardAvoidingView>
    </RootView>
  );
});
