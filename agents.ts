import axios, { Axios, AxiosResponse } from 'axios';
import results from './data/results/result1.json';

const sleep = (delay: number) => {
  return new Promise((resolve: any) => {
    setTimeout(resolve, delay);
  });
};

// axios.defaults.baseURL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=1d0ed0ed46ed44bd8b12ef46cefd537d/";

axios.interceptors.response.use(async (response) => {
  await sleep(1000);

  return response;
});

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
};

const spoonacular = {
  search: (query: string) => requests.get('results/result1.json'),
};

const Agent = {
  dev,
  spoonacular,
};

export default Agent;
