import { TestBed, inject } from '@angular/core/testing';

import { SplashDialogueService } from './splash-dialogue.service';

describe('SplashDialogueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SplashDialogueService]
    });
  });

  it('should be created', inject([SplashDialogueService], (service: SplashDialogueService) => {
    expect(service).toBeTruthy();
  }));
});
