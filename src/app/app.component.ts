import {Component, Host, HostListener, OnInit} from '@angular/core';
import {dispatch, NgRedux, select} from "@angular-redux/store";
import {Observable} from "rxjs/index";
import {Store} from 'redux';
import {Router} from "@angular/router";

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
  @select() navState: Observable<any>;
  @select() modalVisibility: Observable<any>;
  @select() isResponsiveBreakpoint: Observable<boolean>;

  internalNavState: boolean;
  internalModalVisibility: boolean;
  internalIsResponsiveBreakpoint: boolean;

  routerOutletState: any;

  constructor(protected ngRedux: NgRedux<any>,
              private routeAnimationService: RouteAnimationService,
              protected windowRef: WindowRef,
              private routerService: Router) {
  }

  ngOnInit() {
    this.setMobileBreakpoint(
      this.determineMobileBreakpoint(this.windowRef.nativeWindow.innerWidth)
    );

    this.router.subscribe(val => {
      const lastRouteOrder: number = this.routeAnimationService.getRoute(this.lastRoute).order;
      const nextRouteOrder: number = this.routeAnimationService.getRoute(val).order;

      // hide the modal or navigation if they are open during navigation
      if (this.internalNavState && this.internalIsResponsiveBreakpoint) {
        this.toggleNavigation();
      }

      if (this.internalModalVisibility) {
        this.toggleModal();
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

    this.navState.subscribe(res => {
      this.internalNavState = res;

      if (!this.internalIsResponsiveBreakpoint && !this.internalNavState) {
        this.toggleNavigation();
      }
    });

    this.isResponsiveBreakpoint.subscribe(res => {
      this.internalIsResponsiveBreakpoint = res;

      if (!res && !this.internalNavState) {
        // this.toggleNavigation();
      }
    });

    this.modalVisibility.subscribe(res => {
      this.internalModalVisibility = res;

      if (this.internalModalVisibility) {
        this.setBodyScroll(false);
      } else {
        this.setBodyScroll(true);
      }

      if (this.internalNavState) {
        this.toggleNavigation();
      }
    });
  }

  setBodyScroll(scroll: boolean) {
    const { document } = this.windowRef.nativeWindow;

    if (document) {
      document.body.style.overflowY = scroll ? 'auto' : 'hidden';
    }
  }

  @HostListener('window:resize', ['$event'])
  @debounce()
  handleWindowResize(event) {
    const isMobileBreakpoint = this.determineMobileBreakpoint(event.currentTarget.innerWidth);
    this.setMobileBreakpoint(isMobileBreakpoint);

    // hide nav bar if switching to mobile view
    if (isMobileBreakpoint && this.internalNavState) {
      this.toggleNavigation();
    }
  }

  determineMobileBreakpoint(width: number) {
    const mobileBreakpoint = this.ngRedux.getState().responsiveBreakpoint;
    return width < mobileBreakpoint;
  }

  handleSplashClick() {
    if (this.internalModalVisibility) {
      this.toggleModal();
    }

    if (this.internalNavState) {
      this.toggleNavigation();
    }
  }

  @dispatch() setMobileBreakpoint = isMobileBreakpoint => ({
    value: isMobileBreakpoint,
    type: 'IS_MOBILE_BREAKPOINT'
  });
  @dispatch() toggleNavigation = () => ({type: 'TOGGLE_NAVIGATION'})
  @dispatch() toggleModal = () => ({type: 'TOGGLE_MODAL'})
}
