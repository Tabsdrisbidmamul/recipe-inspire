import { makeAutoObservable } from 'mobx';

/**
 * These settings correspond to the ingredients settings page
 */
export default class IngredientsStore {
  eggs = false;

  constructor() {
    makeAutoObservable(this);
  }

  setEggs = (state: boolean) => {
    this.eggs = state;
  };
}
