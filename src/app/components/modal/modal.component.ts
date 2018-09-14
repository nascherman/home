import {Component, Input, OnInit, OnChanges, AfterContentInit, SimpleChanges} from '@angular/core';

import animations from './modal.animations';
import {dispatch, select} from "@angular-redux/store";

import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations
})
export class ModalComponent implements OnChanges, OnInit{
  @Input() visibility: boolean;

  @select() isResponsiveBreakpoint: any;
  @select() modalVisibility: any;

  static readonly TOGGLE_MODAL = 'TOGGLE_MODAL';

  protected modalAnimation: any = {
    value: 'hidden',
    params: {
      offsetLeave: 100, // TODO create service to calc height - nav height
      offsetEnter: 0
    }
  };

  protected faTimesCircle = faTimesCircle;
  protected internalIsResponsiveBreakpoint: boolean;
  protected internalStageVisibility: boolean = this.visibility;

  constructor() { }

  ngOnInit() {
    this.isResponsiveBreakpoint.subscribe(res => {
      this.internalIsResponsiveBreakpoint = res;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // make the stage visible for animations
    if(changes.visibility.currentValue) {
      this.internalStageVisibility = changes.visibility.currentValue;
    }

    if(changes.visibility) {
      this.modalAnimation = Object.assign({}, this.modalAnimation, {
        value: changes.visibility.currentValue ?
          this.internalIsResponsiveBreakpoint ?
            'visibleMobile' :
            'visibleDesktop' : 'hidden'
      });
    }
  }

  handleAnimationDone($event) {
    // hide the modal stage after completing animations
    if ($event.toState === 'hidden') {
      this.internalStageVisibility = false;
    }
  }

  @dispatch() toggleModal = () => ({type: 'TOGGLE_MODAL'})
}

