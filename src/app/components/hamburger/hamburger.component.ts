import {Component, OnInit, Input} from '@angular/core';
import { select } from '@angular-redux/store';

import animations from './hamburger.animations';
import {Observable} from "rxjs/index";

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss'],
  animations
})
export class HamburgerComponent implements OnInit {

  @select() navState: Observable<Boolean>;
  @Input() toggle: Function;

  constructor() {
  }

  ngOnInit() {
    console.log('Hamburger Init');
  }

  handleButtonClick() {
    this.toggle();
  }
}
