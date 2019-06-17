import {
  SET_SEARCH_RESULTS,
  SET_SEARCH_FETCHING,
} from './constants';

const initialState = {
  isFetching: false,
  results: [],
};

const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return { ...state, results: action.results };
    case SET_SEARCH_FETCHING:
      return { ...state, isFetching: action.value };
    default:
      return state;
  }
};

export default SearchReducer;
