import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarMeterComponent } from './star-meter.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('StarMeterComponent', () => {
  let component: StarMeterComponent;
  let fixture: ComponentFixture<StarMeterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        BrowserAnimationsModule
      ],
      declarations: [ StarMeterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
