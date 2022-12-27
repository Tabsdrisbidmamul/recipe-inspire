import { makeAutoObservable, runInAction } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Agent from '../agents';
import {
  IPhotoAndResults,
  RandomRecipes,
  RecommendResult,
  Result,
  SearchResults,
} from '../interfaces/results.interface';

/**
 * store for ingredients, and diet settings as well making http calls to get recipes and recipe details
 */
export default class IngredientsStore {
  private readonly COMMON_INGREDIENT_KEY = 'commonIngredient';
  searchValue = '';

  commonIngredients = {
    salt: false,
    pepper: false,
    'olive oil': false,
    'vegetable oil': false,
    flour: false,
    sugar: false,
    'tomato paste': false,
    'chicken stock': false,
    'beef stock': false,
    pasta: false,
    rice: false,
    lentil: false,
    potatoes: false,
    onion: false,
    garlic: false,
    'soy sauce': false,
    'bay leaves': false,
    'chili powder': false,
    paprika: false,
    parsley: false,
    oregano: false,
    'garlic powder': false,
    cumin: false,
    cinnamon: false,
    basil: false,
    eggs: false,
    milk: false,
    butter: false,
    lemons: false,
  } as { [key: string]: boolean };

  searchResults = {} as SearchResults;
  searchResultsCache: Result[] = [];

  currentPage = 0;
  maxPages = 0;

  filters = {
    'gluten free': false,
    ketogenic: false,
    vegetarian: false,
    'lacto-vegetarian': false,
    'ovo-vegetarian': false,
    vega: false,
    pescetarian: false,
    paleo: false,
    primal: false,
    'low foodmap': false,
    whole30: false,
  } as { [key: string]: boolean };

  loader = false;
  recommendedLoader = false;
  paginateLoader = false;

  selectedRecipe: Result = {} as Result;

  recommendedRecipes: RecommendResult[] = [];

  randomRecipe: RandomRecipes = {} as RandomRecipes;

  previousRecipeIds: string[] = [];

  navigationId: number = 0;

  scannedIngredients: IPhotoAndResults[] = [];
  removedScannedIngredients: IPhotoAndResults[] = [];

  scannedIngredientsFilter = {} as { [key: string]: boolean };

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Save ingredients list to local storage
   */
  storeCommonIngredientsToLocalStorage = async () => {
    try {
      const item = JSON.stringify(this.commonIngredients);

      await AsyncStorage.setItem(this.COMMON_INGREDIENT_KEY, item);
    } catch (e: any) {
      console.log('ERROR: Could not save common ingredients to local storage ', e.message);
    }
  };

  /**
   * Read ingredients from local storage and set store up
   */
  getCommonIngredientsFromLocalStorage = async () => {
    try {
      const ingredients = await AsyncStorage.getItem(this.COMMON_INGREDIENT_KEY);

      if (ingredients !== null) {
        const item = JSON.parse(ingredients);

        runInAction(() => {
          this.commonIngredients = item;
        });
      }
    } catch (e: any) {
      console.log('ERROR: Could not read common ingredients from local storage ', e.message);
    }
  };

  /**
   * We cannot pass params when using goBack() - a real let down, and thus we use our DI to handle something that navigation should have done
   * @param id
   */
  setNavigationId = (id: number) => {
    this.navigationId = id;
  };

  pushToPreviousRecipeIds = (id: string) => {
    this.previousRecipeIds.push(id);
  };

  popPreviousRecipeIds = () => {
    return this.previousRecipeIds.pop();
  };

  /**
   * Set or add the key value to the ingredients filter to
   * @param key
   * @param value
   */
  setScannedIngredientsFilter = (key: string, value: boolean) => {
    this.scannedIngredientsFilter[key] = value;
    this.fetchResults();
  };

  /**
   * Delete the filter
   * @param key
   */
  removeScannedIngredientFilters = (key: string) => {
    delete this.scannedIngredientsFilter[key];
    this.fetchResults();
  };

  /**
   * Set the ingredient via property name accessor, this will then be used to be saved in local async storage
   * @param ingredientName
   * @param value
   */
  setCommonIngredients = (ingredientName: string, value: boolean) => {
    this.commonIngredients[ingredientName] = value;
  };

  /**
   * Set new search value, this is used for dynamic search results
   * @param value
   */
  setSearchValue = (value: string) => {
    this.searchValue = value;
  };

  /**
   * Get recommended recipes, we have to make 2 calls, as the first call to get the recommended recipes does not return the image url
   * @param recipeId
   */
  getRecommendedRecipes = async (recipeId: number) => {
    try {
      this.setRecommendedLoader(true);
      //TODO: remove dev call

      // const res = await Agent.spoonacular.getSimiliarRecipe(recipeId);

      // @ts-ignore
      const res = (await Agent.dev.recommend()) as RecommendResult[];

      const results = await this._getRecipeInformationToPopulateRecommendedRecipes(res);

      this.setRecommendedRecipes(results);
    } catch (e) {
      console.error(`ERROR: getRecommendedRecipes() could not get recipes for recipe id ${recipeId}`);
    } finally {
      this.setRecommendedLoader(false);
    }
  };

  /**
   * Make a call to the API to get a selection of recipes
   */
  getRandomRecipe = async () => {
    try {
      this.setLoader(true);

      //TODO: remove dev call
      // const res = await Agent.spoonacular.getRandomRecipe();

      //@ts-ignore
      const res = (await Agent.dev.random()) as RandomRecipes;

      this.setRandomRecipe(res);
    } catch (e) {
      console.error('ERROR getRandomRecipe(): could not get recipe');
    } finally {
      this.setLoader(false);
    }
  };

  /**
   * Set random recipes (which will be an array of one value)
   * @param results
   */
  private setRandomRecipe = (results: RandomRecipes) => {
    this.randomRecipe = results;
  };

  /**
   * Another reason why we need an async forloop in JS, promise.all promises to retrieve the recipes information only for the image url
   * @param recipes
   * @returns
   */
  private _getRecipeInformationToPopulateRecommendedRecipes = async (recipes: RecommendResult[]) => {
    let transformedRecipes: RecommendResult[] = [];

    try {
      //TODO: remove dev call

      // const promises = recipes.map((el) => Agent.spoonacular.getRecipeInformation(el.id));
      const promises = recipes.map((el) => Agent.dev.details());

      const resolvedPromises = await Promise.all(promises);

      resolvedPromises.forEach((recipe) => {
        transformedRecipes.push({
          id: recipe.id,
          imageType: recipe.imageType,
          title: recipe.title,
          readyInMinutes: recipe.readyInMinutes,
          servings: recipe.servings,
          source: recipe.sourceUrl,
          image: recipe.image,
        });
      });
    } catch (e) {
      console.error('ERROR _getRecipeInformationToPopulateRecommendedRecipes(), a promise was unresolved');
    }

    return transformedRecipes;
  };

  /**
   * Fetch the search results which will rendered on the search results screen
   */
  fetchResults = async () => {
    // do not search if no value or no filters set
    if (this.searchValue === '' && !this._anyFiltersToggled()) {
      this.setSearchResults({} as SearchResults);
      this.setSearchResultsCache([], 'fetch');
      return;
    }

    this.setLoader(true);
    try {
      const res = await this._fetchResults();

      this.setSearchResults(res);
      this.setSearchResultsCache(res.results, 'fetch');
      this.calculateAndSetMaxPages(res);
    } catch (e) {
      console.error('ERROR: fetchResults axios error ');
    } finally {
      this.setLoader(false);
    }
  };

  /**
   * Fetch search results for the next page
   */
  fetchPaginatedResults = async () => {
    if (this.currentPage > this.maxPages) return;

    this.setCurrentPage(this.currentPage + 1);

    this.setPaginateLoader(true);
    try {
      const res = await this._fetchResults();

      this.setSearchResults(res);

      this.setSearchResultsCache(res.results, 'paginate');
    } catch (e) {
      console.error('ERROR: fetchResults axios error ');
    } finally {
      this.setPaginateLoader(false);
    }
  };

  /**
   * Check if any or some of the filters in ingredients or diets filter have been set
   */
  private _anyFiltersToggled = () => {
    const isDietFiltersSet = Object.entries(this.filters).some(([key, value]) => {
      if (value) return true;
    });

    const isIngredientFiltersSet = Object.entries(this.scannedIngredientsFilter).some(([key, value]) => {
      if (value) return true;
    });

    return isDietFiltersSet || isIngredientFiltersSet;
  };

  /**
   * helper method to fetch the results, common function and refactored
   * @returns
   */
  private _fetchResults = async () => {
    let res = {} as SearchResults;

    // any filters set, add them to the query
    if (Object.values(this.filters).some((el) => el)) {
      const filters = Object.entries(this.filters)
        .filter((el) => el[1])
        .map((el) => el[0]);

      res = await Agent.spoonacular.searchWithQueryAndFilters(this.searchValue, filters, this.currentPage);

      // scanned ingredients; do a ingredients search
    } else if (Object.values(this.scannedIngredientsFilter).some((el) => el)) {
      const ingredients = Object.keys(this.scannedIngredientsFilter);

      console.log('_fetchResults ingredients ', ingredients);

      res = await Agent.spoonacular.searchWithIngredients(ingredients, this.currentPage);
    } else {
      // TODO: remove dev call
      // res = await Agent.spoonacular.searchWithQuery(this.searchValue, this.currentPage);

      //@ts-ignore
      res = (await Agent.dev.paginate()) as SearchResults;
    }

    return res;
  };

  /**
   * Fetch the selected recipe details view
   * @param recipeId
   */
  getRecipe = async (recipeId: number) => {
    try {
      this.setLoader(true);

      // TODO: remove dev calls
      // const recipe = await Agent.spoonacular.getRecipeInformation(recipeId);

      // @ts-ignore
      const recipe = (await Agent.dev.details()) as Result;

      this.setSelectedRecipe(recipe);
    } catch (e) {
      console.error(`ERROR: getRecipe() could not retrieve recipe for ${recipeId}`);
      console.log(e);
    } finally {
      this.setLoader(false);
    }
  };

  /**
   * Add ingredients to the scanned ingredients
   * @param photoAndIngredient
   */
  setScannedIngredients = (photoAndIngredient: IPhotoAndResults) => {
    this.scannedIngredients.push(photoAndIngredient);
  };

  /**
   * Remove the scanned index from the array and update the results
   * @param index
   */
  removeScannedIngredient = (index: number) => {
    this.scannedIngredients.splice(index, 1);
    this.fetchResults();
  };

  /**
   * Remove scanned ingredient at index position and push the removed element to the removed list
   * @param index
   */
  removeScannedIngredientAndPushToRemoveList = (index: number) => {
    const elementToRemove = this.scannedIngredients[index];
    this.setRemovedScannedIngredients(elementToRemove);

    this.scannedIngredients.splice(index, 1);
  };

  /**
   * Add an element to the removed scanned ingredients
   * @param photoAndIngredient
   */
  setRemovedScannedIngredients = (photoAndIngredient: IPhotoAndResults) => {
    this.removedScannedIngredients.push(photoAndIngredient);
  };

  /**
   * Remove the scanned ingredient from the remove list and push the element back to the scanned list
   * @param index
   */
  removeScannedIngredientAndPushToScannedList = (index: number) => {
    const elementToRemove = this.removedScannedIngredients[index];
    this.setScannedIngredients(elementToRemove);

    this.removedScannedIngredients.splice(index, 1);
  };

  /**
   * Set the selected recipe
   * @param recipe
   */
  setSelectedRecipe = (recipe: Result) => {
    this.selectedRecipe = recipe;
  };

  /**
   * Set the recommended recipes array
   * @param recipes
   */
  private setRecommendedRecipes = (recipes: RecommendResult[]) => {
    this.recommendedRecipes = recipes;
  };

  /**
   * set the filter in the filters object
   * @param key
   * @param value
   */
  setFilters = (key: string, value: boolean) => {
    this.filters[key] = value;
    this.fetchResults();
  };

  /**
   * Set the search results
   */
  private setSearchResults = (results: SearchResults) => {
    this.searchResults = results;
  };

  /**
   * Set the current page
   * @param page
   */
  private setCurrentPage = (page: number) => {
    this.currentPage = page;
  };

  /**
   * Set max pages for the search
   * @param pages
   */
  private setMaxPages = (pages: number) => {
    this.maxPages = pages;
  };

  /**
   * Will calculate the maximum number of pages for the search and will set the max pages
   * @param results
   */
  private calculateAndSetMaxPages = (results: SearchResults) => {
    const pages = Math.ceil(results.totalResults / results.number);

    this.setMaxPages(pages);
  };

  /**
   * Set a cache of the overall search results, this will be used when rendering all the results in the flatlist
   */
  private setSearchResultsCache = (results: Result[], mode: 'fetch' | 'paginate') => {
    if (results.length && mode === 'fetch') {
      this.searchResultsCache = [...results];
    } else if (results.length && mode === 'paginate') {
      this.searchResultsCache = [...this.searchResultsCache, ...results];
    } else {
      this.searchResultsCache = [];
    }
  };

  /**
   * Set the loader for when recommended recipes are loading
   * @param state
   */
  private setRecommendedLoader = (state: boolean) => {
    this.recommendedLoader = state;
  };

  /**
   * Set the loader when making async calls
   * @param state
   */
  setLoader = (state: boolean) => {
    this.loader = state;
  };

  /**
   * Set the paginate loader when making async calls
   * @param state
   */
  private setPaginateLoader = (state: boolean) => {
    this.paginateLoader = state;
  };
}
