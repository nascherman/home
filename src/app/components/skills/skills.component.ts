import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/index";
import {dispatch, select} from "@angular-redux/store";

import config from './skills.config';
import animations from './skills.animations';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  animations
})
export class SkillsComponent implements OnInit {

  @select() modalVisibility: Observable<any>;

  protected internalModalVisibility: boolean = false;
  protected  subSkill: any = {
    name: '',
    description: '',
    rating: 0,
    technologies: []
  };

  config = config;

  constructor() { }

  ngOnInit() {
    this.modalVisibility.subscribe(res => {
      this.internalModalVisibility = res;
    });
  }

  launchModal(subSkill) {
    this.subSkill = subSkill;
    this.toggleModal();
  }

  isIconLogo(logo) {
    return logo instanceof Object;
  }

  @dispatch() private toggleModal = () => ({type: 'TOGGLE_MODAL'})
}
