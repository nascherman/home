import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SummaryComponent} from './summary.component';
import {TooltipComponent} from "../tooltip/tooltip.component";
import {ImageGridComponent} from "../image-grid/image-grid.component";
import {ModalComponent} from "../modal/modal.component";
import {ImageSwiperComponent} from "../image-swiper/image-swiper.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireModule} from "@angular/fire";
import {Observable} from "rxjs/index";
import {WindowRef} from "../../services/window.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


 import {SummaryItem} from "./summary.component";

let angularFireStoreSpy, windowServiceSpy;

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  const testDbData = [new SummaryItem()];

  beforeEach(async(() => {
    const collectionStub = {
      valueChanges: jasmine.createSpy('valueChanges')
        .and.returnValue(
          new Observable(observer => {
            observer.next(testDbData);
            observer.complete();
          })
        )
    };

    const angularFirestoreStub = {
      collection: jasmine.createSpy('collection')
        .and.returnValue(collectionStub)
    };

    const winSpy = jasmine.createSpyObj(
      'WindowRef',
      ['nativeWindow']
    );

    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        BrowserAnimationsModule
      ],
      declarations: [
        SummaryComponent,
        TooltipComponent,
        ImageGridComponent,
        ModalComponent,
        ImageSwiperComponent
      ],
      providers: [
        {provide: AngularFirestore, useValue: angularFirestoreStub},
        {provide: WindowRef, useValue: winSpy}
      ]
    })
      .compileComponents();

    angularFireStoreSpy = TestBed.get(AngularFirestore);
    windowServiceSpy = TestBed.get(WindowRef);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
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

  it('should initialize config to db response', async(() => {
    expect(component['config'][0]).toEqual(testDbData[0]);
  }));

  it('should set internal modal visibility on visibility change', async(() => {
    Object.defineProperty(component, 'modalVisibility', {writable: true});
    component['modalVisibility'] = new Observable<any>(observer => {
      observer.next(true);
      observer.complete();
    });
    component['internalModalVisibility'] = false;
    component.ngOnInit();
    expect(component['internalModalVisibility']).toBe(true);
  }));

  describe('toggle modal', () => {
    const testData = {test: 'test'};

    it('should set current data to passed in data on launch modal', async(() => {
      component.launchModal(testData);
      expect(component['currentItem']).toEqual(testData);
    }));

    it('should call toggle modal on launch modal', async(() => {
      const toggleSpy = spyOn(component, 'toggleModal');
      component.launchModal(testData);
      expect(toggleSpy).toHaveBeenCalledTimes(1);
    }));
  })
});
