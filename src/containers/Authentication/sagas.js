import { call, put, takeLatest } from 'redux-saga/effects';
import cookies from 'js-cookie';

import api from '../../utils/api';
import CONFIG from '../../../config/api.json';
import {
  REQUEST_USER_LOGIN,
  REQUEST_USER_INFO,
  REQUEST_USER_LOGOUT,
} from './constants';
import {
  setUser,
  updateAuthenticationFetching,
  updateUserLoggedIn,
} from './actions';
import { handleUserInfoData } from './helpers';

export function* redirectUserToLogin() {
  try {
    yield put(updateAuthenticationFetching(true));

    window.location.href = CONFIG.API_SIGN_IN;
  } catch (e) {
    throw new Error(e);
  }
}

export function* redirectUserToLogout() {
  try {
    yield put(updateAuthenticationFetching(true));

    // TODO: create "signout" server's endpoint to replace current behavior below
    yield put(updateUserLoggedIn(false));
    cookies.set('userLoggedIn', false);
  } catch (e) {
    throw new Error(e);
  } finally {
    yield put(updateAuthenticationFetching(false));
  }
}

export function* requestUserInfo() {
  try {
    yield put(updateAuthenticationFetching(true));

    const response = yield call(api.fetchUserData);
    const userInfo = handleUserInfoData(response.data);
    yield put(setUser(userInfo));
  } catch (e) {
    throw new Error(e);
  } finally {
    yield put(updateAuthenticationFetching(false));
  }
}

export default function* watchAuthenticationSagas() {
  yield takeLatest(REQUEST_USER_LOGIN, redirectUserToLogin),
  yield takeLatest(REQUEST_USER_LOGOUT, redirectUserToLogout),
  yield takeLatest(REQUEST_USER_INFO, requestUserInfo);
}
