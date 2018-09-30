import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Observable} from "rxjs/index";

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        BrowserAnimationsModule
      ],
      declarations: [ ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set modal animation to initial state hidden', async(() => {
    expect(component['modalAnimation']).toEqual({
      value: 'hidden',
      params: {
        offsetLeave: 100,
        offsetEnter: 0
      }
    });
  }));

  it('should set internal responsive breakpoint on init and subscription change', async(() => {
    Object.defineProperty(component, 'isResponsiveBreakpoint', {writable: true});
    component.isResponsiveBreakpoint = new Observable(observer => {
      observer.next(true);
      observer.complete();
    });
    // private variable
    component['internalIsResponsiveBreakpoint'] = false;
    component.ngOnInit();
    expect(component['internalIsResponsiveBreakpoint']).toBe(true);
  }));

  describe('on changes', () => {
    const createVisibilityChanges = (val) => ({
      visibility: {
        currentValue: val
      }
    });

    it('should set internal input stage visibility on change', async(() => {
      component['internalStageVisibility'] = false;
      component.ngOnChanges(<any>createVisibilityChanges(true));
      expect(component['internalStageVisibility']).toBe(true);
    }));

    it('should set modal animation visibility on change', async(() => {
      // past responsive breakpoint
      component['internalIsResponsiveBreakpoint'] = true;
      component.ngOnChanges(<any>createVisibilityChanges(true));
      expect(component['modalAnimation'].value).toEqual('visibleMobile');
      // before responsive breakpoint
      component['internalIsResponsiveBreakpoint'] = false;
      component.ngOnChanges(<any>createVisibilityChanges(true));
      expect(component['modalAnimation'].value).toEqual('visibleDesktop');
      // hidden
      component.ngOnChanges(<any>createVisibilityChanges(false));
      expect(component['modalAnimation'].value).toEqual('hidden');
    }));
  });

  it('should hide stage if animation end state is hidden', async(() => {
    component['internalStageVisibility'] = true;
    component.handleAnimationDone(<any>{toState: 'hidden'});
    expect(component['internalStageVisibility']).toBe(false);
  }));

  it('should toggle modal if close icon is clicked', async(() => {
    const toggleSpy = spyOn(component, 'toggleModal');
    const el = fixture.debugElement.nativeElement
      .querySelector('.modal__close');
    el.click();

    fixture.whenStable().then(() => {
      expect(toggleSpy).toHaveBeenCalledTimes(1);
    });
  }));
});
