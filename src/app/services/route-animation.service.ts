import { Injectable } from '@angular/core';
import routeConfig from '../config/route.config';


@Injectable({
  providedIn: 'root'
})
export class RouteAnimationService {

  constructor() { }

  getRoute(route) {
    const cleanRoute = route.replace('/', '');

    return routeConfig.find(item => item.path === cleanRoute);
  }
}
