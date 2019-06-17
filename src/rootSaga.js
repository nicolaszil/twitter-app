import { all, fork } from 'redux-saga/effects';

import watchAuthenticationSagas from './containers/Authentication/sagas';
import watchSearchSagas from './containers/Search/sagas';

export default function* rootSaga() {
  yield all([
    fork(watchAuthenticationSagas),
    fork(watchSearchSagas),
  ]);
}
