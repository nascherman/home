import { Component, OnInit } from '@angular/core';
import splashAnimation from './splash.animations';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  animations: [splashAnimation]
})
export class SplashComponent implements OnInit {
  splashDialogueAnimate: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  imageAnimateDone() {
    this.splashDialogueAnimate = true;
  }

}
