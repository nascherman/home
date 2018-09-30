import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburgerComponent } from './hamburger.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ElementRef} from "@angular/core";
import {Observable} from "rxjs/index";

let elementRefSpy;

describe('HamburgerComponent', () => {
  let component: HamburgerComponent;
  let fixture: ComponentFixture<HamburgerComponent>;

  beforeEach(async(() => {
    const elementSpy = jasmine.createSpyObj(
      'ElementRef',
      ['nativeElement']
    )

    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [ HamburgerComponent ],
      providers: [
        { provide: ElementRef, useValue: elementSpy }
      ]
    })
    .compileComponents();

    elementRefSpy = TestBed.get(ElementRef);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HamburgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // make observable writeable for testing
    Object.defineProperty(component, 'navState', {writable: true})
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a default animation state on create', async(() => {
    expect(component.animationState).toEqual({
      value: 'closed',
      params: {
        height: 0
      }
    })
  }));

  it('Should update animation state to open on nav state change', async(() => {
    component.navState = new Observable<Boolean>(observer => {
      observer.next(true);
      observer.complete();
    });
    component.ngAfterContentInit();

    expect(component.animationState.value).toBe('open');
  }));

  it('Should update animation state to close on nav state change', async(() => {
    component.navState = new Observable<Boolean>(observer => {
      observer.next(false);
      observer.complete();
    });
    component.ngAfterContentInit();

    expect(component.animationState.value).toBe('closed');
  }));
});
