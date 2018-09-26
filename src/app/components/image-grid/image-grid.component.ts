import {Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChanges} from '@angular/core';

import animations from './image-grid.animations'

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss'],
  animations
})
export class ImageGridComponent implements OnInit, OnChanges {

  @Input() gridData: any;
  @Input() filterBy: any;

  @Output() clickItem: EventEmitter<any> = new EventEmitter<any>();

  currentData: any;
  currentCategory: any = '';

  constructor() { }

  ngOnInit() {
    this.currentData = this.gridData;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.gridData) {
      this.currentData = changes.gridData.currentValue;
    }
  }

  onClickItem(item) {
    this.clickItem.emit(item);
  }

  /**
   * filters by the components filter criteria and returns a list of unique filter items.
   * used to filter the available images
   * @param data an array of image grid items to filter
   */
  getFilters(data) {
    return data.reduce((accum, item) => {
      if (accum.indexOf(item[this.filterBy]) === -1) {
        accum.push(item[this.filterBy]);
      }

      return accum;
    }, [])
  }

  filter(category) {
    if (category === this.currentCategory) {
      this.currentData = this.gridData;
      this.currentCategory = '';
    } else {
      this.currentCategory = category;
      this.currentData = this.gridData.filter(item => {
        return item[this.filterBy] === category;
      });
    }
  }
}
