import axios, { Axios, AxiosResponse } from 'axios';
import results from './data/results/result1.json';
import results2 from './data/results/result2.json';
import { SearchResults } from './interfaces/results.interface';

const sleep = (delay: number) => {
  return new Promise((resolve: any) => {
    setTimeout(resolve, delay);
  });
};

// BUG :Base url is not respected in native
// axios.defaults.baseURL = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=1d0ed0ed46ed44bd8b12ef46cefd537d&';

// axios.interceptors.response.use(async (response) => {
//   await sleep(1000);

//   return response;
// });

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
};

const spoonacular = {
  searchWithQuery: (query: string, offset: number) => {
    // console.log(`spoonacular query ${query} and offset ${offset}\n`);
    // console.log(`query=${query}&offset=${offset}&addRecipeNutrition=true&addRecipeInformation=true`);
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
    requests.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=1d0ed0ed46ed44bd8b12ef46cefd537`),
};

const Agent = {
  dev,
  spoonacular,
};

export default Agent;
