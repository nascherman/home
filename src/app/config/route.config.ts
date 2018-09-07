import { SplashComponent } from '../components/splash/splash.component';
import { SummaryComponent } from '../components/summary/summary.component';
import { SkillsComponent } from "../components/skills/skills.component";
import { ContactComponent } from "../components/contact/contact.component";

export const routeConstants = {
  welcomeRoute: 'welcome',
  aboutRoute: 'about',
  skillsRoute: 'skills',
  contactRoute: 'contact'
};

export const appRoutes = [
  {
    path: '',
    redirectTo: routeConstants.welcomeRoute,
    pathMatch: 'full'
  },
  {
    path: routeConstants.welcomeRoute,
    component: SplashComponent,
    order: 0
  },
  {
    path: routeConstants.aboutRoute,
    component: SummaryComponent,
    order: 1
  },
  {
    path: routeConstants.skillsRoute,
    component: SkillsComponent,
    order: 2,
  },
  {
    path: routeConstants.contactRoute,
    component: ContactComponent,
    order: 3
  }
];

export default appRoutes;
