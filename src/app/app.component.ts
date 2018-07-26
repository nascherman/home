import {Component, HostListener, OnInit} from '@angular/core';
import {dispatch, NgRedux, select} from "@angular-redux/store";
import {Observable} from "rxjs/index";
import {Store} from 'redux';

import animations from './config/route.animation';
import {RouteAnimationService} from "./services/route-animation.service";

import {debounce} from "./decorators/debounce.decorator";
import {WindowRef} from "./services/window.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations,
  providers: [WindowRef]
})
export class AppComponent implements OnInit {
  static readonly IS_MOBILE_BREAKPOINT = 'IS_MOBILE_BREAKPOINT';

  title: string = 'home-page';
  lastRoute: string = '';

  @select() router: Observable<any>;

  routerOutletState: any;

  constructor(private ngRedux: NgRedux<any>,
              private routeAnimationService: RouteAnimationService,
              private windowRef: WindowRef) {
  }

  ngOnInit() {
    this.setMobileBreakpoint(
      this.determineMobileBreakpoint(this.windowRef.nativeWindow.innerWidth)
    );

    this.router.subscribe(val => {
      const lastRouteOrder: number = this.routeAnimationService.getRoute(this.lastRoute).order;
      const nextRouteOrder: number = this.routeAnimationService.getRoute(val).order;
      const navState: string = this.ngRedux.getState().navState;

      if (navState) {
        this.toggleNavigation();
      }

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

  @HostListener('window:resize', ['$event'])
  @debounce()
  handleWindowResize(event) {
    this.setMobileBreakpoint(
      this.determineMobileBreakpoint(event.currentTarget.innerWidth)
    );
  }

  determineMobileBreakpoint(width: number) {
    const mobileBreakpoint = this.ngRedux.getState().responsiveBreakpoint;
    return width < mobileBreakpoint;
  }

  @dispatch() setMobileBreakpoint = isMobileBreakpoint => ({
    value: isMobileBreakpoint,
    type: 'IS_MOBILE_BREAKPOINT'
  });
  @dispatch() toggleNavigation = () => ({type: 'TOGGLE_NAVIGATION'})
}
