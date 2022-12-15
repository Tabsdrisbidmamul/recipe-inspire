import { createContext } from 'react';
import IStore from '../interfaces/store.interface';
import CommonStore from './common.store';
import IngredientsStore from './ingredients.store';
import UserStore from './user.store';

/**
 * State management provider
 */
export const store: IStore = {
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  ingredientsStore: new IngredientsStore(),
};

export const StoreContext = createContext(store);
