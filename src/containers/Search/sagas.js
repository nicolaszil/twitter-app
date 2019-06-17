import { call, put, takeEvery } from 'redux-saga/effects';

import api from '../../utils/api';
import { REQUEST_SEARCH_RESULTS } from './constants';
import { setSearchResults, updateSearchFetching } from './actions';
import { handleSearchResults } from './helpers';

export function* requestSearchResults(action) {
  try {
    yield put(updateSearchFetching(true));

    const { query } = action;
    sessionStorage.setItem('search-query', query);

    const response = yield call(api.fetchSearchResults, { q: query.replace('#', '') });
    const results = handleSearchResults(response.data);

    yield put(setSearchResults(results));
  } catch (e) {
    throw new Error(e);
  } finally {
    yield put(updateSearchFetching(false));
  }
}

export default function* watchSearchSagas() {
  yield takeEvery(REQUEST_SEARCH_RESULTS, requestSearchResults);
}
