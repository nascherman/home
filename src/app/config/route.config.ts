import { SplashComponent } from '../components/splash/splash.component';
import { SummaryComponent } from '../components/summary/summary.component';
import { SketchesComponent } from '../components/sketches/sketches.component';

import {routeConstants} from "./global.constants";

export default [
  {
    path: routeConstants.splashRoute,
    component: SplashComponent,
    order: 0
  },
  {
    path: routeConstants.summaryRoute,
    component: SummaryComponent,
    order: 1
  },
  {
    path: routeConstants.sketchesRoute,
    component: SketchesComponent,
    order: 2
  }
];
