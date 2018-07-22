import { combineReducers } from 'redux';
import { routerReducer } from '@angular-redux/router';

import { toggleReducer } from "../components/nav/nav.reducer";

import routeConfig from '../config/route.config';

export const rootReducer = combineReducers({
  router: routerReducer,
  navState: toggleReducer,
  routeConfig: () => {
    return routeConfig;
  }
});
