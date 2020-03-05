import axios from 'axios';
import { BASE_URL } from './constants';
const parseQueryParams = params =>
  Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');

export default axios.create({
  baseURL: `${BASE_URL}`,
});

export { parseQueryParams };
