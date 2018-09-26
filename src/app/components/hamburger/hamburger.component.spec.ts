import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburgerComponent } from './hamburger.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('HamburgerComponent', () => {
  let component: HamburgerComponent;
  let fixture: ComponentFixture<HamburgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [ HamburgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HamburgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
