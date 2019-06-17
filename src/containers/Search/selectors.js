import { createSelector } from 'reselect';

const searchState = state => state.search;

export const makeSelectSearchResults = () => createSelector(
  searchState,
  state => state.results || {},
);

export const makeSelectSearchFetching = () => createSelector(
  searchState,
  state => state.isFetching,
);
