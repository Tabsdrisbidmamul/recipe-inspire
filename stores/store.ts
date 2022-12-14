import { createContext } from 'react';
import IStore from '../interfaces/store.interface';
import CommonStore from './common.store';

export const store: IStore = {
  commonStore: new CommonStore(),
};

export const StoreContext = createContext(store);
