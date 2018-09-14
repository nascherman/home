import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import animations from './image-grid.animations'

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss'],
  animations
})
export class ImageGridComponent implements OnInit {

  @Input() gridData: any;
  @Input() filterBy: any;

  @Output() clickItem: EventEmitter<any> = new EventEmitter<any>();

  currentData: any;
  currentCategory: any = '';

  constructor() { }

  ngOnInit() {
    this.currentData = this.gridData;
  }

  onClickItem(item) {
    this.clickItem.emit(item);
  }

  getCategories(data) {
    return data.reduce((accum, item) => {
      if (accum.indexOf(item.category) === -1) {
        accum.push(item.category);
      }

      return accum;
    }, [])
  }

  filterByCategory(category) {
    if (category === this.currentCategory) {
      this.currentData = this.gridData;
      this.currentCategory = '';
    } else {
      this.currentCategory = category;
      this.currentData = this.gridData.filter(item => {
        return item.category === category;
      });
    }
  }
}
