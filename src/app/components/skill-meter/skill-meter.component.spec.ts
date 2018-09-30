import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillMeterComponent } from './skill-meter.component';

describe('SkillMeterComponent', () => {
  let component: SkillMeterComponent;
  let fixture: ComponentFixture<SkillMeterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillMeterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillMeterComponent);
    component = fixture.componentInstance;
    component.skill = {
      subskills: [
        {
          rating: 10
        },
        {
          rating: 5
        },
        {
          rating: 3
        }
      ]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create list of skill bars based on skill subskill input', async(() => {
    const els = fixture.debugElement.nativeElement
      .querySelectorAll('li');

    fixture.whenStable().then(() => {
      expect(els.length).toBe(3);
    });
  }));

  describe('scroll', () => {
    it('should scroll meter if IntersectionObserver is not defined', async(() => {
      const scrollSpy = spyOn(component, 'handleScrollIntoView');
      IntersectionObserver = undefined;
      component.ngOnInit();
      expect(scrollSpy).toHaveBeenCalledTimes(1);
    }));

    it('should scroll into view upon intersection', async(() => {
      const scrollSpy = spyOn(component, 'handleScrollIntoView');

      component.handleIntersection([{
        intersectionRatio: 1
      }, {
        intersectionRatio: 0.1
      }]);

      expect(scrollSpy).toHaveBeenCalledTimes(2);
    }));

    it('should set is visible upon scroll into view', async(() => {
      component['isVisible'] = false;
      component.handleScrollIntoView();
      expect(component['isVisible']).toBe(true);
    }));
  });

  describe('width setting', () => {
    const elementWidth = 100;
    const labelWidth = 5;
    const element = {
      clientWidth: elementWidth,
      querySelector: () => {
        return {
          getBoundingClientRect: () => ({width: labelWidth})
        }
      }
    };

    it('should set bar width to full width of element on full rating', async(() => {
      expect(component.getBarWidth(10, element))
        .toBe('95px');
    }));

    it('should set bar width appropriately on arbitrary rating', async(() => {
      expect(component.getBarWidth(5, element))
        .toBe('47.5px');

      expect(component.getBarWidth(3, element))
        .toBe('28.5px');
    }));
  });

  describe('launch modal', () => {
    it('should call toggle modal on click of a subskill rating element', async(() => {
      const toggleSpy = spyOn(component, 'toggleModal');
      const el = fixture.debugElement.nativeElement
        .querySelector('.bar__label');
      el.click();

      fixture.whenStable().then(() => {
        expect(toggleSpy).toHaveBeenCalledTimes(1);
      });
    }));

    it('should emit clicked item with subskill on call toggle modal', async(() => {
      const clickSpy = spyOn(component.clickItem, 'emit');

      component.toggleModal(component.skill.subskills[0]);

      expect(clickSpy).toHaveBeenCalledTimes(1);
      expect(clickSpy).toHaveBeenCalledWith(component.skill.subskills[0]);
    }));
  });
});
