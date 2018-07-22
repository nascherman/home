import {Component, OnInit, Input} from '@angular/core';
import {dispatch, select} from '@angular-redux/store';

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

  constructor() {
  }

  ngOnInit() {
    console.log('Hamburger Init');
  }

  @dispatch() handleButtonClick = () => ({ type: 'TOGGLE_NAVIGATION' });
}
