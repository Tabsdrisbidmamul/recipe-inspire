import { makeAutoObservable, runInAction } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    console.log('this.searchValue ', this.searchValue);
  };
}
