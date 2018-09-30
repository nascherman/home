import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarMeterComponent } from './star-meter.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { faStar, faStarHalfAlt as faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/fontawesome-free-regular";

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

  it('should calculate stars on init', async(() => {
    const calcSpy = spyOn(component, 'calculateStars').and.stub();
    component.ngOnInit();
    expect(calcSpy).toHaveBeenCalledTimes(1);
  }));

  it('should calculate stars on changes', async(() => {
    const calcSpy = spyOn(component, 'calculateStars').and.stub();
    component.ngOnChanges();
    expect(calcSpy).toHaveBeenCalledTimes(1);
  }));

  describe('calculate stars', () => {


    it('should push full stars for full rating', async(() => {
      component.rating = 10;
      component.calculateStars();
      component.iconGroup.forEach(icon => {
        expect(icon).toEqual(faStar);
      })
    }));

    it('should push appropriate half and empty stars on arbitrary rating', async(() => {
      component.rating = 5;
      component.calculateStars();

      expect(component['iconGroup'][0]).toEqual(faStar);
      expect(component['iconGroup'][1]).toEqual(faStar);
      expect(component['iconGroup'][2]).toEqual(faStarHalf);
      expect(component['iconGroup'][3]).toEqual(faStarEmpty);
      expect(component['iconGroup'][4]).toEqual(faStarEmpty);

      component.rating = 2;
      component.calculateStars();

      expect(component['iconGroup'][0]).toEqual(faStar);
      expect(component['iconGroup'][1]).toEqual(faStarEmpty);
      expect(component['iconGroup'][2]).toEqual(faStarEmpty);
      expect(component['iconGroup'][3]).toEqual(faStarEmpty);
      expect(component['iconGroup'][4]).toEqual(faStarEmpty);
    }));
  });
});
