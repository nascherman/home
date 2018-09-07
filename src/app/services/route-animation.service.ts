import { Injectable } from '@angular/core';
import {appRoutes} from '../config/route.config';

@Injectable({
  providedIn: 'root'
})
export class RouteAnimationService {

  constructor() { }

  private getCleanRoute(route: string) {
    return route.replace('/', '');
  }

  private getIndexOfRoute(route: string) {
    return appRoutes.map(item => item.path).indexOf(route);
  }

  getRoute(route: string) {
    return appRoutes.find(item => item.path === this.getCleanRoute(route));
  }

  getNextRoute(route: string) {
    const currentRouteIndex = this.getIndexOfRoute(route);
    const routeIndex = currentRouteIndex + 1 === appRoutes.length ?
      currentRouteIndex : currentRouteIndex + 1;

    return appRoutes[routeIndex];
  }

  getPreviousRoute(route: string) {
    const currentRouteIndex = this.getIndexOfRoute(route);
    const routeIndex = currentRouteIndex - 1 < 0 ?
      currentRouteIndex : currentRouteIndex - 1;

    return appRoutes[routeIndex]
  }
}
