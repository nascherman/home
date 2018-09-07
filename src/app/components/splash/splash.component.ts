import { Component, OnInit } from '@angular/core';
import splashAnimation from './splash.animations';
import {dispatch, select} from "@angular-redux/store";
import {Observable} from "rxjs/index";

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  animations: [splashAnimation]
})
export class SplashComponent implements OnInit {
  @select() modalVisibility: Observable<any>;

  splashDialogueAnimate: boolean = false;
  internalModalVisibility: boolean = false;

  constructor() { }

  ngOnInit() {
    this.modalVisibility.subscribe(res => {
      this.internalModalVisibility = res;
    });
  }

  imageAnimateDone() {
    this.splashDialogueAnimate = true;
  }

  @dispatch() toggleModal = () => ({
    type: 'TOGGLE_MODAL'
  });

}
