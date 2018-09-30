import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {SimpleChange, SimpleChanges} from "@angular/core";

import { ImageGridComponent } from './image-grid.component';

describe('ImageGridComponent', () => {
  let component: ImageGridComponent;
  let fixture: ComponentFixture<ImageGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageGridComponent);
    component = fixture.componentInstance;

    component.gridData = [];
    component.filterBy = '';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set grid data to current data on init', async(() => {
    component.gridData = [{test: 'something'}];
    component.ngOnInit();
    expect(component.currentData).toEqual(component.gridData);
  }));

  it('should update current data with grid data on changes', async(() => {
    const testGridData = [{test: 'something'}];
    component.ngOnChanges(<any>{
      gridData: {
        currentValue: testGridData
      }
    });
    expect(component.currentData).toEqual(testGridData);
  }));

  it('should emit click item output on click with current item', async(() => {
    const clickSpy = spyOn(component.clickItem, 'emit').and.stub();
    const itemTest = {test: 'something'};

    component.onClickItem(itemTest);
    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(clickSpy).toHaveBeenCalledWith(itemTest);
  }));

  describe('filters', () => {
    const testGridData = [
      {
        id: 0,
        test: 'yo'
      },
      {
        id: 1,
        test: 'yo yo'
      },
      {
        id: 2,
        test: 'yo yo yo'
      }
    ];

    beforeEach(async(() => {
      component.filterBy = 'test';
      component.gridData = testGridData;
    }));

    it('should determine filters from unique values from passed in data', async(() => {
      expect(component.getFilters(testGridData)).toEqual([
        'yo', 'yo yo', 'yo yo yo'
      ])
    }));

    it('should filter current data by category on filter and ' +
      'unfilter current data if current category is filtered twice', async(() => {
      // set current data to grid data
      component.ngOnInit();
      component.filter('yo');

      expect(component.currentData[0].id).toEqual(testGridData[0].id);
      expect(component.currentData[0].test).toEqual(testGridData[0].test);
      expect(component.currentData.length).toBe(1);
      expect(component.currentCategory).toEqual('yo');

      component.filter('yo');
      expect(component.currentData).toEqual(component.gridData);
      expect(component.currentCategory).toEqual('');
    }));
  });
});
