import { combineReducers } from 'redux';
import { routerReducer } from '@angular-redux/router';

import { toggleReducer } from "../components/nav/nav.reducer";
import { modalReducer } from "../components/modal/modal.reducer";

import routeConfig from '../config/route.config';
import {mobileBreakpointReducer} from "../app.reducer";

export const RESPONSIVE_BREAKPOINT = 1024;

export const rootReducer = combineReducers({
  router: routerReducer,
  navState: toggleReducer,
  responsiveBreakpoint: () => {
    return RESPONSIVE_BREAKPOINT;
  },
  isResponsiveBreakpoint: mobileBreakpointReducer,
  modalVisibility: modalReducer
});
