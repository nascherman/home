import { Reducer, Action } from "redux";
import { ModalComponent } from "./modal.component";

export const modalReducer: Reducer<boolean> = (state = false, action: Action): boolean => {
  switch(action.type) {
    case ModalComponent.TOGGLE_MODAL:
        return !state;
  }

  return state;
};
