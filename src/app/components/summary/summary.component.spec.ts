import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryComponent } from './summary.component';
import {TooltipComponent} from "../tooltip/tooltip.component";
import {ImageGridComponent} from "../image-grid/image-grid.component";
import {ModalComponent} from "../modal/modal.component";
import {ImageSwiperComponent} from "../image-swiper/image-swiper.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireModule} from "@angular/fire";
import { Observable } from "rxjs/index";
import {WindowRef} from "../../services/window.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const input = [
  { name: 'Polska', uname: 'polska', parent: ''},
  { name: 'Dolnośląskie', uname: 'dolnoslaskie', parent: 'polska'},
  { name: 'Wrocław', uname: 'wroclaw', parent: 'dolnoslaskie'}
];

const data = new Observable();

const collectionStub = {
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
};

const angularFirestoreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
};

let angularFireStoreSpy, windowServiceSpy;

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

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
      declarations: [
        SummaryComponent,
        TooltipComponent,
        ImageGridComponent,
        ModalComponent,
        ImageSwiperComponent
      ],
      providers: [
        { provide: AngularFirestore, useValue: angularFirestoreStub },
        { provide: WindowRef, useValue: winSpy }
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
});
