import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NavComponent } from "./components/nav/nav.component";
import { HamburgerComponent } from "./components/hamburger/hamburger.component";
import { NavMenuComponent } from "./components/nav-menu/nav-menu.component";

import { RouterTestingModule } from "@angular/router/testing";
import { NgReduxTestingModule} from "@angular-redux/store/lib/testing";
import {WindowRef} from "./services/window.service";
import {dispatch, NgRedux} from "@angular-redux/store";

import {RESPONSIVE_BREAKPOINT} from "./store/store.reducers";
import { appRoutes } from './config/route.config';
import {Observable} from "rxjs/index";

let windowServiceSpy, ngReduxSpy;

describe('AppComponent', () => {
  let fixture, app;

  beforeEach(async(() => {
    const winSpy = jasmine.createSpyObj(
      'WindowRef',
      ['nativeWindow']
    );

    const reduxSpy = jasmine.createSpyObj(
      'NgRedux',
      ['getState', 'dispatch']
    );

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgReduxTestingModule
      ],
      declarations: [
        AppComponent,
        NavComponent,
        HamburgerComponent,
        NavMenuComponent
      ],
      providers: [
        { provide: WindowRef, useValue: winSpy },
        { provide: NgRedux, useValue: reduxSpy }
      ]
    }).compileComponents();

    windowServiceSpy = TestBed.get(WindowRef);
    ngReduxSpy = TestBed.get(NgRedux);
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;

  }));
  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it('Should set body overflow ', async(() => {
    windowServiceSpy.nativeWindow
      .and.returnValue({
      document: {
        body: {
          style: {
            overflowY: ''
          }
        }
      }
    });

    app.setBodyScroll(true);

    expect(app.windowRef.nativeWindow.document.body.style.overflowY)
      .toBe('auto');

    app.setBodyScroll(false);

    expect(app.windowRef.nativeWindow.document.body.style.overflowY)
      .toBe('hidden');
  }));

  // it('Should set mobile breakpoint appropriately on resize', async(() => {
  //   ngReduxSpy.getState.and.returnValue({
  //     responsiveBreakpoint: RESPONSIVE_BREAKPOINT
  //   });

  //   spyOn(app, 'determineMobileBreakpoint')
  //     .and.returnValue(true);
  //   const setMobileBreakpointSpy = spyOn(app, 'setMobileBreakpoint');
  //
  //   fixture.debugElement.triggerEventHandler('window:resize', app);
  //
  //   expect(setMobileBreakpointSpy).toHaveBeenCalledWith(true);
  // }));

  // it('Should toggle navigation appropriately on resize', async(() => {
  //
  // }));

  it('Should determine mobile breakpoint appropriately', async(() => {
    ngReduxSpy.getState.and.returnValue({
      responsiveBreakpoint: RESPONSIVE_BREAKPOINT
    });

    expect(app.determineMobileBreakpoint(RESPONSIVE_BREAKPOINT - 1))
      .toBe(true);

    expect(app.determineMobileBreakpoint(RESPONSIVE_BREAKPOINT))
      .toBe(false);
  }));

  it('Should handle splash click appropriately', async(() => {
    const toggleModalSpy = spyOn(app, 'toggleModal');
    const toggleNavigationSpy = spyOn(app, 'toggleNavigation');

    app.internalModalVisibility = true;
    app.internalNavState = true;

    app.handleSplashClick();

    expect(toggleModalSpy).toHaveBeenCalledTimes(1);
    expect(toggleNavigationSpy).toHaveBeenCalledTimes(1);

    app.internalModalVisibility = false;
    app.internalNavState = false;

    app.handleSplashClick();

    // no additional calls
    expect(toggleModalSpy).toHaveBeenCalledTimes(1);
    expect(toggleNavigationSpy).toHaveBeenCalledTimes(1);
  }));

  describe('Initialization functions', () => {
    it('Should set mobile breakpoint on initialization', async(() => {
      const mobileBreakpointSpy = spyOn(app, 'setMobileBreakpoint');
      const determineBreakpointSpy = spyOn(app, 'determineMobileBreakpoint')
        .and.returnValue(true);

      app.windowRef.nativeWindow.innerWidth = RESPONSIVE_BREAKPOINT;

      app.ngOnInit();

      expect(determineBreakpointSpy).toHaveBeenCalledWith(RESPONSIVE_BREAKPOINT);
      expect(mobileBreakpointSpy).toHaveBeenCalledWith(true);
    }));

    it('will toggle navigation and modal appropriately on route change if true', async(() => {
      const toggleModalSpy = spyOn(app, 'toggleModal');
      const toggleNavigationSpy = spyOn(app, 'toggleNavigation');

      ngReduxSpy.getState.and.returnValue({
        responsiveBreakpoint: RESPONSIVE_BREAKPOINT
      });

      app.ngOnInit();
      app.internalNavState = true;
      app.internalModalVisibility = true;
      app.internalIsResponsiveBreakpoint = true;

      app.router.next('/about');

      expect(toggleModalSpy).toHaveBeenCalled();
      expect(toggleNavigationSpy).toHaveBeenCalled();
    }));

    it('will set the router outlet state and last route on route change', async(() => {
      Object.defineProperty(app, 'router', { writable: true });
      app.router = new Observable(observer => {
        observer.next('/about');
        observer.complete();
      });
      ngReduxSpy.getState.and.returnValue({
        responsiveBreakpoint: RESPONSIVE_BREAKPOINT
      });

      app.ngOnInit();

      expect(app.routerOutletState).toEqual({
        value: '/about',
          params: {
          offsetEnter: 100,
            offsetLeave: -100
        }
      });
      expect(app.lastRoute).toBe('/about');
    }));

    describe('nav state', () => {
      beforeEach(async(() => {
        Object.defineProperty(app, 'navState', {writable: true})
        ngReduxSpy.getState.and.returnValue({
          responsiveBreakpoint: RESPONSIVE_BREAKPOINT
        });
      }));

      it('Will set internal nav state appropriately on navigation state change', async(() => {
        app.navState = new Observable(observer => {
          observer.next(true);
          observer.complete();
        });
        app.internalNavState = false;
        app.ngOnInit();
        expect(app.internalNavState).toBe(true);
      }));

      it('Will toggle modal on nav state change if modal is visible', async(() => {
        const toggleModalSpy = spyOn(app, 'toggleModal');

        app.navState = new Observable(observer => {
          observer.next(true);
          observer.complete();
        });
        app.internalModalVisibility = true;
        app.ngOnInit();

        expect(toggleModalSpy).toHaveBeenCalled();
      }));

      it('Will not toggle modal on nav state change if modal is not visibile', async(() => {
        const toggleModalSpy = spyOn(app, 'toggleModal');

        app.navState = new Observable(observer => {
          observer.next(true);
          observer.complete();
        });
        app.internalModalVisibility = false;
        app.ngOnInit();

        expect(toggleModalSpy).toHaveBeenCalledTimes(0);
      }));
    });

    it('Will set responsive breakpoint on change', async(() => {
      Object.defineProperty(app, 'isResponsiveBreakpoint', {writable: true})

      app.isResponsiveBreakpoint = new Observable(observer => {
        observer.next(true);
        observer.complete();
      });
      ngReduxSpy.getState.and.returnValue({
        responsiveBreakpoint: RESPONSIVE_BREAKPOINT
      });

      app.internalIsResponsiveBreakpoint = false;
      app.ngOnInit();
      expect(app.internalIsResponsiveBreakpoint).toBe(true);
    }));

    describe('modal visibility', () => {
      beforeEach(async(() => {
        Object.defineProperty(app, 'modalVisibility', {writable: true})
        ngReduxSpy.getState.and.returnValue({
          responsiveBreakpoint: RESPONSIVE_BREAKPOINT
        });
      }));

      it('Will set internal modal visibility on modal visibility change', async(() => {
        app.modalVisibility = new Observable(observer => {
          observer.next(true);
          observer.complete();
        });

        app.internalModalVisibility = false;
        app.ngOnInit();

        expect(app.internalModalVisibility).toBe(true);
      }));

      it('Will disable body scroll if modal is visible', async(() => {
        const bodyScrollSpy = spyOn(app, 'setBodyScroll');

        app.modalVisibility = new Observable(observer => {
          observer.next(true);
          observer.complete();
        });

        app.ngOnInit();

        expect(bodyScrollSpy).toHaveBeenCalledTimes(1);
        expect(bodyScrollSpy).toHaveBeenCalledWith(false);
      }));

      it('Will enable set body scroll if modal is not visible', async(() => {
        const bodyScrollSpy = spyOn(app, 'setBodyScroll');

        app.modalVisibility = new Observable(observer => {
          observer.next(false);
          observer.complete();
        });

        app.ngOnInit();

        expect(bodyScrollSpy).toHaveBeenCalledTimes(1);
        expect(bodyScrollSpy).toHaveBeenCalledWith(true);
      }));

      it('Will toggle navigation on modal visibility change if nav is visible', async(() => {
        const toggleNavigationSpy = spyOn(app, 'toggleNavigation');

        app.modalVisibility = new Observable(observer => {
          observer.next(true);
          observer.complete();
        });
        app.internalNavState = true;

        app.ngOnInit();
        expect(toggleNavigationSpy).toHaveBeenCalledTimes(1);
      }));

      it('Will not toggle navigation on modal visibility change if nav is not visible', async(() => {
        const toggleNavigationSpy = spyOn(app, 'toggleNavigation');

        app.modalVisibility = new Observable(observer => {
          observer.next(true);
          observer.complete();
        });
        app.internalNavState = false;

        app.ngOnInit();
        expect(toggleNavigationSpy).toHaveBeenCalledTimes(0);
      }));
    });
  });
});
