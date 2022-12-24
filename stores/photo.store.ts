import { makeAutoObservable } from 'mobx';

/**
 * Photo store for vision ai
 */
export default class PhotoStore {
  constructor() {
    makeAutoObservable(this);
  }
}
