import { TestBed, inject } from '@angular/core/testing';

import { RouteAnimationService } from './route-animation.service';

describe('RouteAnimationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteAnimationService]
    });
  });

  it('should be created', inject([RouteAnimationService], (service: RouteAnimationService) => {
    expect(service).toBeTruthy();
  }));
});
