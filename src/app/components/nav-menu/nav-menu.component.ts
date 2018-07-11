import { Component } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from "rxjs/index";
import animations from './nav-menu.animations'

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  animations
})
export class NavMenuComponent {
  @select() navState: Observable<Boolean>;
}
