import {Component, Input} from '@angular/core';
import {dispatch, select} from '@angular-redux/store';

import animations from './hamburger.animations';
import {Observable} from "rxjs/index";

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss'],
  animations
})
export class HamburgerComponent {

  @select() navState: Observable<Boolean>;

  constructor() {
  }

  @dispatch() handleButtonClick = () => ({ type: 'TOGGLE_NAVIGATION' });
}
