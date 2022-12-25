import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import results from './data/results/result1.json';
import results2 from './data/results/result2.json';
import details from './data/details/details1.json';
import recommend from './data/recommend/recommend1.json';
import random from './data/random/random1.json';
import { RandomRecipes, RecommendResult, Result, SearchResults, VisionRequest } from './interfaces/results.interface';
import { ResponseObject } from './interfaces/visions.interface';
import Toast from 'react-native-toast-message';

const sleep = (delay: number) => {
  return new Promise((resolve: any) => {
    setTimeout(resolve, delay);
  });
};

// BUG :Base url is not respected in react native
// axios.defaults.baseURL = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=1d0ed0ed46ed44bd8b12ef46cefd537d&';

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    Toast.show({
      type: 'error',
      text1: 'Something went wrong',
      position: 'top',
    });

    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const dev = {
  results: async () => {
    await sleep(1000);
    return results;
  },
  paginate: async () => {
    await sleep(1000);
    return results2;
  },
  details: async () => {
    await sleep(1000);
    return details;
  },
  recommend: async () => {
    await sleep(1000);
    return recommend;
  },
  random: async () => {
    await sleep(1000);
    return random;
  },
};

const spoonacular = {
  searchWithQuery: (query: string, offset: number) => {
    return requests.get<SearchResults>(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=1d0ed0ed46ed44bd8b12ef46cefd537d&query=${query}&offset=${offset}&fillIngredients=true&addRecipeInformation=true`
    );
  },

  searchWithQueryAndFilters: (query: string, filters: string[], offset: number) =>
    requests.get<SearchResults>(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=1d0ed0ed46ed44bd8b12ef46cefd537d&query=${query}&offset=${offset}&diet=${filters.join(
        ','
      )}&fillIngredients=true&addRecipeInformation=true`
    ),

  searchWithIngredients: (ingredients: string[], offset: number) =>
    requests.get<SearchResults>(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=1d0ed0ed46ed44bd8b12ef46cefd537d&offset=${offset}&includeIngredients=${ingredients.join(
        ','
      )}&fillIngredients=true&addRecipeInformation=true`
    ),

  searchWithIngredientsAndFilters: (ingredients: string[], filters: string[], offset: number) =>
    requests.get<SearchResults>(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=1d0ed0ed46ed44bd8b12ef46cefd537d&offset=${offset}&includeIngredients=${ingredients.join(
        ','
      )}&diet=${filters.join(',')}&fillIngredients=true&addRecipeInformation=true`
    ),

  getRecipeInformation: (recipeId: number) =>
    requests.get<Result>(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=1d0ed0ed46ed44bd8b12ef46cefd537d`
    ),

  getSimiliarRecipe: (recipeId: number) =>
    requests.get<RecommendResult[]>(
      `https://api.spoonacular.com/recipes/${recipeId}/similar?apiKey=1d0ed0ed46ed44bd8b12ef46cefd537d&number=1`
    ),

  getRandomRecipe: () => {
    return requests.get<RandomRecipes>(
      'https://api.spoonacular.com/recipes/rando?apiKey=1d0ed0ed46ed44bd8b12ef46cefd537d&number=1'
    );
  },
};

const google = {
  vision: {
    annotateImage: (data: VisionRequest) =>
      requests.post<ResponseObject>(
        'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDBNHsBZ-AkKromEvC4lpA4TrWlFazoMZ0',
        data
      ),
  },
};

const Agent = {
  dev,
  spoonacular,
  google,
};

export default Agent;
