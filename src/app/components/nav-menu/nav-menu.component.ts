import { Component } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from "rxjs/index";
import animations from './nav-menu.animations'

import {appRoutes} from "../../config/route.config";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  animations
})
export class NavMenuComponent {
  @select() navState: Observable<Boolean>;
  @select() isMobileBreakpoint: Observable<Boolean>;
  @select() router: Observable<string>;

  // pop the first element from appRoutes since it defines the fallback route
  appRoutes: Array<any> = appRoutes.slice(1, appRoutes.length);
}
