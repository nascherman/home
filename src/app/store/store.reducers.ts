import { combineReducers } from 'redux';
import { routerReducer } from '@angular-redux/router';

import { toggleReducer } from "../components/nav/nav.reducer";

export const rootReducer = combineReducers({
  router: routerReducer,
  navState: toggleReducer
});
