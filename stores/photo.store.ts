import { makeAutoObservable } from 'mobx';
import Agent from '../agents';
import { VisionRequest } from '../interfaces/results.interface';
import { ResponseObject } from '../interfaces/visions.interface';
import Ingredients from '../data/ingredients/ingredients.json';

/**
 * Photo store for vision ai
 */
export default class PhotoStore {
  loader = false;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * From the packaged data, get back a response from Vision and return image annotations
   * @param data
   */
  getImageAnnotations = async (data: VisionRequest) => {
    try {
      this.setLoader(true);

      const res = await Agent.google.vision.annotateImage(data);

      const ingredient = this._determineIngredientsFromAnnotations(res);

      console.log('ingredient ', ingredient);
    } catch (e) {
      console.error('ERROR getImageAnnotations(): failure when sending data to vision ');
    } finally {
      this.setLoader(false);
    }
  };

  /**
   * From the vision response, do a O(n^2) check for ingredient name
   */
  private _determineIngredientsFromAnnotations = (result: ResponseObject) => {
    let ingredient = '';
    if (result.responses.length && result.responses[0].labelAnnotations.length) {
      for (let i = 0; i < result.responses[0].labelAnnotations.length; i++) {
        ingredient = result.responses[0].labelAnnotations[i].description.toLowerCase();

        if (Ingredients.includes(ingredient)) {
          console.log('found name ', ingredient);
          return ingredient;
        }
      }
    }
    return ingredient;
  };

  /**
   * set loader for when taking photos
   * @param state
   */
  setLoader = (state: boolean) => {
    this.loader = state;
  };
}
