import { Injectable } from '@angular/core';
import {appRoutes} from '../config/route.config';

@Injectable({
  providedIn: 'root'
})
export class RouteAnimationService {

  constructor() { }

  getRoute(route: string) {
    const cleanRoute = route.replace('/', '');

    return appRoutes.find(item => item.path === cleanRoute);
  }
}
