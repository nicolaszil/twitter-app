import {
  REQUEST_USER_LOGIN,
  REQUEST_USER_LOGOUT,
  SET_LOGGED_IN,
  REQUEST_USER_INFO,
  SET_USER_INFO,
  SET_AUTHENTICATION_FETCHING,
} from './constants';

export const startLoginUser = () => ({
  type: REQUEST_USER_LOGIN,
});

export const startLogoutUser = () => ({
  type: REQUEST_USER_LOGOUT,
});

export const updateUserLoggedIn = value => ({
  type: SET_LOGGED_IN,
  value,
});

export const getUserInfo = () => ({
  type: REQUEST_USER_INFO,
});

export const setUser = userInfo => ({
  type: SET_USER_INFO,
  userInfo,
});

export const updateAuthenticationFetching = value => ({
  type: SET_AUTHENTICATION_FETCHING,
  value,
});
