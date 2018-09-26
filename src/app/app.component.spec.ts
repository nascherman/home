import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NavComponent } from "./components/nav/nav.component";
import { HamburgerComponent } from "./components/hamburger/hamburger.component";
import { NavMenuComponent } from "./components/nav-menu/nav-menu.component";

import { RouterTestingModule } from "@angular/router/testing";
import { NgReduxTestingModule} from "@angular-redux/store/lib/testing";
import {Window} from "selenium-webdriver";
import {WindowRef} from "./services/window.service";
import {dispatch, NgRedux} from "@angular-redux/store";

import {RESPONSIVE_BREAKPOINT} from "./store/store.reducers";
import { appRoutes } from './config/route.config';

let windowServiceSpy, ngReduxSpy;

class MockRouterComponent {
  constructor() {}

  @dispatch() router = route => ({
    type: '@angular-redux/router::UPDATE_LOCATION',
      value: route
  });
}

describe('AppComponent', () => {
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
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
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

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

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
  //
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //
  //   spyOn(app, 'determineMobileBreakpoint')
  //     .and.returnValue(true);
  //   const setMobileBreakpointSpy = spyOn(app, 'setMobileBreakpoint')
  //     .and.returnValue(null);
  //
  //   app.windowRef.nativeWindow.dispatchEvent(
  //     new Event('resize')
  //   );
  //
  //   expect(setMobileBreakpointSpy).toHaveBeenCalledWith(true);
  // }));

  // it('Should toggle navigation appropriately on resize', async(() => {
  //
  // }));

  it('Should determine mobile breakpoint appropriately', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    ngReduxSpy.getState.and.returnValue({
      responsiveBreakpoint: RESPONSIVE_BREAKPOINT
    });

    expect(app.determineMobileBreakpoint(RESPONSIVE_BREAKPOINT - 1))
      .toBe(true);

    expect(app.determineMobileBreakpoint(RESPONSIVE_BREAKPOINT))
      .toBe(false);
  }));

  it('Should handle splash click appropriately', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

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
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;

      const mobileBreakpointSpy = spyOn(app, 'setMobileBreakpoint');
      const determineBreakpointSpy = spyOn(app, 'determineMobileBreakpoint')
        .and.returnValue(true);

      app.windowRef.nativeWindow.innerWidth = RESPONSIVE_BREAKPOINT;

      app.ngOnInit();

      expect(determineBreakpointSpy).toHaveBeenCalledWith(RESPONSIVE_BREAKPOINT);
      expect(mobileBreakpointSpy).toHaveBeenCalledWith(true);
    }));

    it('will toggle navigation and modal appropriately on route change if true', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;

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

    // it('Will set body scroll properly on modal visibility change', async(() => {
    //   const fixture = TestBed.createComponent(AppComponent);
    //   const app = fixture.debugElement.componentInstance;
    //
    //   const bodyScrollSpy = spyOn(app, 'setBodyScroll');
    //
    //   ngReduxSpy.getState.and.returnValue({
    //     responsiveBreakpoint: RESPONSIVE_BREAKPOINT,
    //     modalVisibility: false
    //   });
    //
    //   app.ngOnInit();
    //   app.toggleModal();
    //   expect(bodyScrollSpy).toHaveBeenCalledWith(false);
    // }));

    // it('Will toggle navigation on modal visibility', async(() => {
    //
    // }));
  });
});
