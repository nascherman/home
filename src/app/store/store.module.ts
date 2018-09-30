import { NgModule } from "@angular/core";

import { NgReduxModule, NgRedux, DevToolsExtension } from "@angular-redux/store";
import { NgReduxRouterModule, NgReduxRouter } from "@angular-redux/router";

import reduxLogger from 'redux-logger';
import persistState from 'redux-localstorage';

import { IAppState } from './store.model';
import { rootReducer } from './store.reducers';

const stateToStore: Array<string> = [
  'router'
];

@NgModule({
  imports: [
    NgReduxModule,
    NgReduxRouterModule.forRoot()
  ],
  providers: []
})
export class StoreModule {
  constructor(
    public store: NgRedux<IAppState>,
    devTools: DevToolsExtension,
    ngReduxRouter: NgReduxRouter
  ) {
    store.configureStore(
      rootReducer,
      {},
      [ reduxLogger ],
      devTools.isEnabled() ?
        [persistState(stateToStore), devTools.enhancer() ] :
        [persistState(stateToStore)]
    );

    if (ngReduxRouter) {
      ngReduxRouter.initialize();
    }
  }
}
