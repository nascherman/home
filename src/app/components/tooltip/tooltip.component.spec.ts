import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipComponent } from './tooltip.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {WindowRef} from "../../services/window.service";
import {NgRedux} from "@angular-redux/store";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

let windowServiceSpy;

describe('TooltipComponent', () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;

  beforeEach(async(() => {
    const winSpy = jasmine.createSpyObj(
      'WindowRef',
      ['nativeWindow']
    );

    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        BrowserAnimationsModule
      ],
      declarations: [ TooltipComponent ],
      providers: [
        { provide: WindowRef, useValue: winSpy }
      ]
    })
    .compileComponents();

    windowServiceSpy = TestBed.get(WindowRef);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
