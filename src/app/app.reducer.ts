import { AppComponent } from "./app.component";
import {Reducer, AnyAction} from 'redux';

export const mobileBreakpointReducer: Reducer<boolean> = (state = false, action: AnyAction): boolean => {
  switch(action.type) {
    case AppComponent.IS_MOBILE_BREAKPOINT:
      return action.value;
    default:
      return state;
  }
};
