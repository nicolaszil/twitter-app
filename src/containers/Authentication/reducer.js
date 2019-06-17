import {
  SET_LOGGED_IN,
  SET_USER_INFO,
  SET_AUTHENTICATION_FETCHING,
} from './constants';

const initialState = {
  isFetching: false,
  userInfo: {
    isLoggedIn: undefined,
  },
};

const AuthenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN:
      return {
        ...state,
        userInfo: { ...state.userInfo, isLoggedIn: (/true/i).test(action.value) },
      };
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.userInfo },
      };
    case SET_AUTHENTICATION_FETCHING:
      return { ...state, isFetching: action.value };
    default:
      return state;
  }
};

export default AuthenticationReducer;
