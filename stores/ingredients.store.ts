import { makeAutoObservable } from 'mobx';

/**
 * These settings correspond to the ingredients settings page
 */
export default class IngredientsStore {
  constructor() {
    makeAutoObservable(this);
  }
}
