import {Component, Input, OnInit} from '@angular/core';

import animations from './modal.animations';
import {dispatch} from "@angular-redux/store";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations
})
export class ModalComponent {
  static readonly TOGGLE_MODAL = 'TOGGLE_MODAL';

  @Input() visibility: boolean;

  constructor() { }
}

