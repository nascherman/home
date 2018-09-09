import {Component, Input, OnInit, OnChanges, AfterContentInit, SimpleChanges} from '@angular/core';

import animations from './modal.animations';
import {dispatch} from "@angular-redux/store";

import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations
})
export class ModalComponent implements OnChanges, AfterContentInit{
  @Input() visibility: boolean;

  static readonly TOGGLE_MODAL = 'TOGGLE_MODAL';

  protected modalAnimation: any = {
    value: this.visibility ? 'visible' : 'hidden',
    params: {
      offsetLeave: 100, // TODO create service to calc height - nav height
      offsetEnter: 0
    }
  };

  protected faTimesCircle = faTimesCircle;

  constructor() { }

  ngAfterContentInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.visibility) {
      this.modalAnimation = Object.assign({}, this.modalAnimation, {
        value: changes.visibility.currentValue ? 'visible' : 'hidden'
      });
    }
  }

  @dispatch() toggleModal = () => ({type: 'TOGGLE_MODAL'})
}

