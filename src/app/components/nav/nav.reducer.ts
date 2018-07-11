import { Reducer, Action } from 'redux';
import { NavComponent } from "./nav.component";

export const toggleReducer: Reducer<boolean> = (state = false, action: Action): boolean => {
  switch(action.type) {
    case NavComponent.TOGGLE_NAVIGATION:
      return !state
  }

  return state;
};
