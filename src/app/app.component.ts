import {Component, OnInit} from '@angular/core';
import {select} from "@angular-redux/store";
import {Observable} from "rxjs/index";

import animations from './config/global.animation';
import {RouteAnimationService} from "./services/route-animation.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations
})
export class AppComponent implements OnInit {
  title = 'home-page';

  @select() router: Observable<any>;

  routerOutletState: any;

  lastRoute: string = '';

  constructor(private routeAnimationService: RouteAnimationService) {}

  ngOnInit() {
    this.router.subscribe(val => {
      const lastRouteOrder = this.routeAnimationService.getRoute(this.lastRoute).order;
      const nextRouteOrder = this.routeAnimationService.getRoute(val).order;

      this.routerOutletState = {
        value: val,
        params: {
          offsetEnter: lastRouteOrder > nextRouteOrder ? -100 : 100,
          offsetLeave: lastRouteOrder > nextRouteOrder ? 100 : -100
        }
      };

      this.lastRoute = val;
    });
  }
}
