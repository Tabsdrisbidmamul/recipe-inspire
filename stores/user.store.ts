import { makeAutoObservable } from 'mobx';

/**
 * User store for authorising endpoints
 */
export default class UserStore {
  user: any;

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (user: any) => {
    this.user = user;
  };
}
