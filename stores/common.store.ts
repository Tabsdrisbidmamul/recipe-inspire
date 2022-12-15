import { makeAutoObservable } from 'mobx';

/**
 * Common store for loaders and spinners
 */
export default class CommonStore {
  constructor() {
    makeAutoObservable(this);
  }
}
