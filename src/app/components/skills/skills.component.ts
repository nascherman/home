import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/index";
import {select} from "@angular-redux/store";

import config from './skills.config';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  config = config;
  currentSkill: any = config.skills[0];

  @select() isResponsiveBreakpoint: Observable<any>;

  constructor() { }

  ngOnInit() {
  }

  updateCurrentSkill(skill: Object) {
    this.currentSkill = skill;
  }
}
