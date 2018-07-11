import { Component, OnInit } from '@angular/core';
import { dispatch, WithSubStore, select } from '@angular-redux/store';
import {Observable} from "rxjs/index";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  static readonly TOGGLE_NAVIGATION = 'TOGGLE_NAVIGATION';

  @select() navState: Observable<Boolean>;

  constructor() { }

  ngOnInit() {
  }

  @dispatch() toggleNavigation = () => ({ type: 'TOGGLE_NAVIGATION' });
}
