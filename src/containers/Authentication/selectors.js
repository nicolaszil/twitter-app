import { createSelector } from 'reselect';

const authenticationState = state => state.authentication;

export const makeSelectUserInfo = () => createSelector(
  authenticationState,
  state => state.userInfo || {},
);

export const makeSelectAuthenticationFetching = () => createSelector(
  authenticationState,
  state => state.isFetching,
);
