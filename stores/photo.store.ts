import { makeAutoObservable } from 'mobx';
import Agent from '../agents';
import { IPhotoAndResults, VisionRequest } from '../interfaces/results.interface';
import { ResponseObject } from '../interfaces/visions.interface';
import Ingredients from '../data/ingredients/ingredients.json';
import * as FileSystem from 'expo-file-system';
import { Camera } from 'expo-camera';
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
  private getImageAnnotations = async (data: VisionRequest) => {
    try {
      this.setLoader(true);

      const res = await Agent.google.vision.annotateImage(data);

      const ingredient = this._determineIngredientsFromAnnotations(res);

      return ingredient;
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
          return ingredient;
        }
      }
    }
    return ingredient;
  };

  /**
   * Asynchronously take a picture and return back the scanned ingredient name
   * @param permission
   * @param camera ref object
   * @returns ingredient name
   */
  takePicture = async (permission: boolean, camera: React.RefObject<Camera>) => {
    if (!permission) return;

    this.setLoader(true);

    // @ts-ignore
    const photo = (await camera.takePictureAsync()) as IPhoto;

    const imageBase64 = await FileSystem.readAsStringAsync(`${photo.uri}`, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const data: VisionRequest = {
      requests: [
        {
          image: {
            content: imageBase64,
          },
          features: [
            {
              maxResults: 10,
              type: 'LANDMARK_DETECTION',
            },

            {
              maxResults: 10,
              type: 'OBJECT_LOCALIZATION',
            },

            {
              maxResults: 10,
              type: 'LABEL_DETECTION',
            },
            {
              maxResults: 10,
              model: 'builtin/latest',
              type: 'DOCUMENT_TEXT_DETECTION',
            },

            {
              maxResults: 10,
              type: 'IMAGE_PROPERTIES',
            },
          ],
        },
      ],
    };

    const ingredient = await this.getImageAnnotations(data);

    if (ingredient === undefined) return;

    return {
      photo,
      ingredient,
    } as IPhotoAndResults;
  };

  /**
   * set loader for when taking photos
   * @param state
   */
  setLoader = (state: boolean) => {
    this.loader = state;
  };
}
