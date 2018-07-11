import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgReduxModule } from "@angular-redux/store";
import { NgReduxRouterModule } from "@angular-redux/router";

import { StoreModule } from './store/store.module';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { NavComponent } from './components/nav/nav.component';
import { HamburgerComponent } from './components/hamburger/hamburger.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HamburgerComponent,
    NavMenuComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserAnimationsModule,
    NgReduxModule,
    NgReduxRouterModule,
    StoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
