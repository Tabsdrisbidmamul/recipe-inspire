import { makeAutoObservable, runInAction } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Agent from '../agents';
import { Result, SearchResults } from '../interfaces/results.interface';

/**
 * These settings correspond to the ingredients settings page
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

  filters = {
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

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Save ingredients list to local storage
   */
  storeCommonIngredientsToLocalStorage = async () => {
    try {
      const item = JSON.stringify(this.commonIngredients);

      // console.log('SAVING storeCommonIngredientsToLocalStorage item ', item);

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

      // console.log('RETRIEVE getCommonIngredientsFromLocalStorage ingredients ', ingredients);

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
   * Fetch the search results which will rendered on the search results screen
   */
  fetchResults = async () => {
    if (this.searchValue === '') {
      this.setSearchResults({} as SearchResults);
      this.setSearchResultsCache([], 'fetch');
      return;
    }

    this.setLoader(true);
    try {
      //TODO: Change the call from dev to spoonacular
      const _res = await Agent.dev.results();

      // @ts-ignore
      const res = _res as SearchResults;

      this.setSearchResults(res);
      this.setSearchResultsCache(res.results, 'fetch');

      // console.log('this.searchResults ', this.searchResults);
    } catch (e) {
      console.error('ERROR: setSearchResults axios error ');
      console.log(e);
    } finally {
      this.setLoader(false);
    }
  };

  /**
   * set the filter in the filters object
   * @param key
   * @param value
   */
  setFilters = (key: string, value: boolean) => {
    this.filters[key] = value;

    console.log('this.filters ', this.filters);
  };

  /**
   * Set the search results
   */
  private setSearchResults = (results: SearchResults) => {
    this.searchResults = results;
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
   * Set the loader when making async calls
   * @param state
   */
  setLoader = (state: boolean) => {
    this.loader = state;
  };
}
