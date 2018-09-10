import { Component, OnInit } from '@angular/core';

// import animations from './summary.animations';

import {select} from "@angular-redux/store";

import config from './summary.config';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  config: any = config;

  constructor() { }

  ngOnInit() {

  }

  launchModal(data) {
    console.log('DATA', data);
  }
}
