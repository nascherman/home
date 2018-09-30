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

  /**
   * Get the next route given the current route
   * @param {string} route
   * @returns {{path: string; redirectTo: string; pathMatch: string} | {path: string; component: SplashComponent; order: number} | {path: string; component: SummaryComponent; order: number} | {path: string; component: SkillsComponent; order: number} | {path: string; component: ContactComponent; order: number}}
   */
  getNextRoute(route: string) {
    const currentRouteIndex = this.getIndexOfRoute(this.getCleanRoute(route));
    const routeIndex = currentRouteIndex + 1 === appRoutes.length ?
      currentRouteIndex : currentRouteIndex + 1;

    return appRoutes[routeIndex];
  }

  getPreviousRoute(route: string) {
    const currentRouteIndex = this.getIndexOfRoute(this.getCleanRoute(route));
    const routeIndex = currentRouteIndex - 1 < 1 ? // 1 because index 0 is a redirect route
      currentRouteIndex : currentRouteIndex - 1;

    return appRoutes[routeIndex]
  }
}
