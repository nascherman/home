import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSwiperComponent } from './image-swiper.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

describe('ImageSwiperComponent', () => {
  let component: ImageSwiperComponent;
  let fixture: ComponentFixture<ImageSwiperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FontAwesomeModule ],
      declarations: [ ImageSwiperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSwiperComponent);
    component = fixture.componentInstance;
    component.images = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
