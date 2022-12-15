import CommonStore from '../stores/common.store';
import UserStore from '../stores/user.store';

export default interface IStore {
  commonStore: CommonStore;
  userStore: UserStore;
}
