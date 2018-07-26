import { Component, OnInit } from '@angular/core';
import { routeConstants } from '../../config/route.config';
import {select} from "@angular-redux/store";
import {Observable} from "rxjs/index";

import routeAnimation from '../../config/route.animation';


@Component({
  selector: 'app-sketches',
  templateUrl: './sketches.component.html',
  styleUrls: ['./sketches.component.scss']
})
export class SketchesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
