import {Component, Input, OnChanges, OnInit} from '@angular/core';

import { faStar, faStarHalfAlt as faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/fontawesome-free-regular";

import animations from './star-meter.animations';

@Component({
  selector: 'app-star-meter',
  templateUrl: './star-meter.component.html',
  styleUrls: ['./star-meter.component.scss'],
  animations
})
export class StarMeterComponent implements OnInit, OnChanges {

  @Input() rating: number = 0;

  faStar = faStar;
  faStarHalf = faStarHalf;

  iconGroup : Array<any> = [];

  constructor() { }

  ngOnInit() {
    this.calculateStars();
  }

  ngOnChanges() {
    this.calculateStars()
  }

  calculateStars() {
    this.iconGroup = [];

    for (let i = this.rating; i > 0; i -= 2) {
      if (i - 2 >= 0) {
        this.iconGroup.push(faStar);
      } else {
        this.iconGroup.push(faStarHalf);
      }
    }

    while (this.iconGroup.length < 5) {
      this.iconGroup.push(faStarEmpty);
    }
  }
}
