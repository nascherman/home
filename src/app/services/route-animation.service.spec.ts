import { TestBed, inject } from '@angular/core/testing';

import { RouteAnimationService } from './route-animation.service';

import { appRoutes, routeConstants } from "../config/route.config";

describe('RouteAnimationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteAnimationService]
    });
  });

  it('should be created', inject([RouteAnimationService], (service: RouteAnimationService) => {
    expect(service).toBeTruthy();
  }));

  it('should get the route object given a route string', inject([RouteAnimationService], (service: RouteAnimationService) => {
    expect(service.getRoute(`/${routeConstants.welcomeRoute}`)).toBe(appRoutes[1]);
  }));

  it('should get the next route given the current route string', inject([RouteAnimationService], (service: RouteAnimationService) => {
    expect(service.getNextRoute(`/${routeConstants.welcomeRoute}`)).toBe(appRoutes[2]);
  }));

  it('should get the next route given the current route string', inject([RouteAnimationService], (service: RouteAnimationService) => {
    expect(service.getPreviousRoute(`/${routeConstants.aboutRoute}`)).toBe(appRoutes[1]);
  }));

  it('should get the first route from previous route given the first route is passed', inject([RouteAnimationService], (service: RouteAnimationService) => {
    expect(service.getPreviousRoute(`/${routeConstants.welcomeRoute}`)).toBe(appRoutes[1]);
  }));
});
