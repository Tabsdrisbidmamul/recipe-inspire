import { UserCredential } from 'firebase/auth';
import { makeAutoObservable } from 'mobx';
import Toast from 'react-native-toast-message';
import { readFirestore, writeToFirestore } from '../firebase';
import { Result } from '../interfaces/results.interface';

/**
 * User store for authorising endpoints
 */
export default class UserStore {
  private readonly COLLECTION_NAME = 'favourites';

  user: UserCredential | undefined = undefined;
  favourites: Result[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Set this to undefine to log the user out
   * @param user
   */
  setUser = async (user: UserCredential | undefined) => {
    this.user = user;

    if (user === undefined) return;

    try {
      const document = await readFirestore(this.COLLECTION_NAME, this.user!.user.uid);

      if (document === undefined) return;

      const results = document.recipes as Result[];

      this._setFavourites(results);
    } catch (e) {
      console.error('ERROR setUser(): could not read firestore');
    }
  };

  /**
   * Internal helper method to set the favourites on login
   * @param results
   */
  private _setFavourites = (results: Result[]) => {
    this.favourites = results;
  };

  /**
   * Add the recipe to the favourites list
   * @param recipe
   */
  setFavourites = async (recipe: Result) => {
    this.favourites.push(recipe);

    await this._saveFavourites();
  };

  /**
   * Remove the selected recipe from favourites
   * @param recipe
   */
  removeFavourites = async (recipe: Result) => {
    const newList = this.favourites.filter((el) => el.id !== recipe.id);
    this._setFavourites(newList);

    await this._saveFavourites();
  };

  /**
   * Write the favourites to firestore
   */
  private _saveFavourites = async () => {
    try {
      await writeToFirestore(this.COLLECTION_NAME, this.user!.user.uid, { recipes: this.favourites });
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Error saving favourites',
      });
    }
  };
}
