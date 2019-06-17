import { combineReducers } from 'redux';

import authenticationReducer from './containers/Authentication/reducer';
import searchReducer from './containers/Search/reducer';

export default combineReducers({
  authentication: authenticationReducer,
  search: searchReducer,
});
