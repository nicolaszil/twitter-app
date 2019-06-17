import {
  REQUEST_SEARCH_RESULTS,
  SET_SEARCH_RESULTS,
  SET_SEARCH_FETCHING,
} from './constants';

export const searchResults = query => ({
  type: REQUEST_SEARCH_RESULTS,
  query,
});

export const setSearchResults = results => ({
  type: SET_SEARCH_RESULTS,
  results,
});

export const updateSearchFetching = value => ({
  type: SET_SEARCH_FETCHING,
  value,
});
