import { makeAutoObservable } from 'mobx';
import { ModalMode } from '../types/modalMode.types';

/**
 * Common store for loaders and spinners
 */
export default class CommonStore {
  isModalVisible = false;
  mode!: ModalMode;

  constructor() {
    makeAutoObservable(this);
  }

  toggleModal = (mode?: ModalMode) => {
    this.isModalVisible = !this.isModalVisible;
    if (mode !== undefined) this.mode = mode;
  };

  setMode = (mode: ModalMode) => {
    this.mode = mode;
  };
}
