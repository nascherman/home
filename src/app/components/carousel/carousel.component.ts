import {Component, Input, OnInit} from '@angular/core';

import animations from './carousel.animations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations
})
export class CarouselComponent implements OnInit {
  @Input() items: any;
  @Input() currentItem: any;
  @Input() clickItemFn: Function;

  constructor() { }

  ngOnInit() {
  }

  getCarouselPosition(item) {
    const currentItemIndex = this.items.findIndex(item => {
      return item.id === this.currentItem.id;
    });

    const itemIndex = this.items.findIndex(i => {
      return i.id === item.id;
    });

    const relativeIndex = itemIndex - currentItemIndex;

    if (relativeIndex > 1 || relativeIndex < -1) {
      return 'out';
    } else if (relativeIndex === 1) {
      return 'right'
    } else {
      return 'left';
    }
  }
}
