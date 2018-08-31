import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import {RouterModule, Routes} from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgReduxModule } from "@angular-redux/store";
import { NgReduxRouterModule } from "@angular-redux/router";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { StoreModule } from './store/store.module';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { NavComponent } from './components/nav/nav.component';
import { HamburgerComponent } from './components/hamburger/hamburger.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { SplashComponent } from './components/splash/splash.component';
import { SplashDialogueComponent } from './components/splash-dialogue/splash-dialogue.component';
import { SummaryComponent } from './components/summary/summary.component';
import { SketchesComponent } from './components/sketches/sketches.component';

import {appRoutes} from './config/route.config';
import { ContactComponent } from './components/contact/contact.component';
import { SkillsComponent } from './components/skills/skills.component';
import { SkillMeterComponent } from './components/skill-meter/skill-meter.component';
import { CarouselComponent } from './components/mobile-selector/mobile-selector.component';
import { FilterByPipe } from './pipes/filter-by.pipe';
import { PhonePipe } from './pipes/phone.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HamburgerComponent,
    NavMenuComponent,
    SplashComponent,
    SplashDialogueComponent,
    SummaryComponent,
    SketchesComponent,
    ContactComponent,
    SkillsComponent,
    SkillMeterComponent,
    CarouselComponent,
    FilterByPipe,
    PhonePipe
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
    StoreModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PhonePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
