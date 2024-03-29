import CommonStore from '../stores/common.store';
import IngredientsStore from '../stores/ingredients.store';
import PhotoStore from '../stores/photo.store';
import UserStore from '../stores/user.store';

export default interface IStore {
  commonStore: CommonStore;
  userStore: UserStore;
  ingredientsStore: IngredientsStore;
  photoStore: PhotoStore;
}
