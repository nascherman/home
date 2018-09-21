import {AfterContentInit, Component, ElementRef, Input} from '@angular/core';
import {dispatch, select} from '@angular-redux/store';

import animations from './hamburger.animations';
import {Observable} from "rxjs/index";

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss'],
  animations
})
export class HamburgerComponent implements AfterContentInit {

  @select() navState: Observable<Boolean>;

  animationState: any = {
    value: 'closed',
    params: {
      height: 0
    }
  };

  constructor(private elementRef: ElementRef) {
  }

  ngAfterContentInit() {
    const {height} = this.elementRef.nativeElement.getBoundingClientRect();

    this.navState.subscribe(res => {
      this.animationState = {
        value: res ? 'open' : 'closed',
        params: {
          height
        }
      }
    });
  }

  @dispatch() handleButtonClick = () => ({type: 'TOGGLE_NAVIGATION'});
}
