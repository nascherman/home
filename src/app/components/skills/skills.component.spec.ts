import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsComponent } from './skills.component';
import {SkillMeterComponent} from "../skill-meter/skill-meter.component";
import {ModalComponent} from "../modal/modal.component";
import {StarMeterComponent} from "../star-meter/star-meter.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import * as skills from './skills.config.json';
import {Observable} from "rxjs/index";

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        BrowserAnimationsModule
      ],
      declarations: [
        SkillsComponent,
        SkillMeterComponent,
        ModalComponent,
        StarMeterComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize sub skill properly', async(() => {
    expect(component['subSkill']).toEqual({
      name: '',
      description: '',
      rating: 0,
      technologies: []
    });
  }));

  it('should create skill details element for each input skill', async(() => {
    const els = fixture.debugElement.nativeElement
      .querySelectorAll('.skills__item');

    fixture.whenStable().then(() => {
      expect(els.length).toEqual(component.skills.length);
    });
  }));

  it('should set internal modal visibility on change', async(() => {
    Object.defineProperty(component, 'modalVisibility', {writable: true});
    component.modalVisibility = new Observable<any>(observer => {
      observer.next(true);
      observer.complete();
    });
    component['internalModalVisibility'] = false;
    component.ngOnInit();
    expect(component['internalModalVisibility']).toBe(true);
  }));

  describe('launch modal', () => {
    it('should set  sub skill appropriately on launching modal', async(() => {
      const tempSubSkill = { test: 'test'};
      component.launchModal(tempSubSkill);
      expect(component['subSkill']).toEqual(tempSubSkill);
    }));

    it('should call toggle modal on launch modal', async(() => {
      const toggleSpy = spyOn(component, 'toggleModal');
      component.launchModal({});
      expect(toggleSpy).toHaveBeenCalledTimes(1);
    }));
  });
});
