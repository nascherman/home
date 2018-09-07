import { Component, OnInit } from '@angular/core';
import { dispatch, WithSubStore, select } from '@angular-redux/store';
import {Observable} from "rxjs/index";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  static readonly TOGGLE_NAVIGATION = 'TOGGLE_NAVIGATION';

  @select() router: Observable<any>;

  constructor() { }
}
