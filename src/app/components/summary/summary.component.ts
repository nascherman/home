import { Component, OnInit } from '@angular/core';

// import animations from './summary.animations';

import {dispatch, select} from "@angular-redux/store";

import config from './summary.config';
import {Observable} from "rxjs/index";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  @select() modalVisibility: Observable<any>;

  config: any = config;

  protected internalModalVisibility: boolean = false;
  protected currentItem: any = {
    name: '',
    category: '',
    img: '',
    details: {}
  };

  constructor() { }

  ngOnInit() {
    this.modalVisibility.subscribe(res => {
      this.internalModalVisibility = res;
    });
  }

  launchModal(data) {
    this.currentItem = data;
    this.toggleModal();
  }

  @dispatch() toggleModal = () => ({type: 'TOGGLE_MODAL'});
}
