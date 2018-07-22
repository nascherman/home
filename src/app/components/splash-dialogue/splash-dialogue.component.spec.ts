import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashDialogueComponent } from './splash-dialogue.component';

describe('SplashDialogueComponent', () => {
  let component: SplashDialogueComponent;
  let fixture: ComponentFixture<SplashDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplashDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
