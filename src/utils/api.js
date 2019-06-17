import axios from 'axios';

import { queryParser, paramsReplacer } from './url';
import CONFIG from '../../config/api.json';

export const fetchUserData = (queryParams = {}) => {
  const url = CONFIG.API_USER_INFO;
  return axios.get(url);
};

export const fetchSearchResults = (queryParams = {}) => {
  const url = CONFIG.API_SEARCH;
  const query = queryParser(queryParams);
  return axios.get(url + query);
};

export default {
  fetchUserData,
  fetchSearchResults,
};
