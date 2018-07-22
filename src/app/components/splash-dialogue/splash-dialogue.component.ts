import {Component, Input} from '@angular/core';

import animations from './splash-dialogue.animations'
import {SplashDialogueService} from './splash-dialogue.service';

@Component({
  selector: 'app-splash-dialogue',
  templateUrl: './splash-dialogue.component.html',
  styleUrls: ['./splash-dialogue.component.scss'],
  animations,
  providers: [SplashDialogueService]
})
export class SplashDialogueComponent {

  title: string = 'Welcome';
  subheading: string = 'To the home of a ';
  adjective: string = 'Cool';
  noun: string = 'Developer';

  words: Array<string> = [
    'cool',
    'intelligent',
    'skilled',
    'thoughtful',
    'articulate',
    'experienced'
  ];

  titleInState: boolean = false;
  adjectiveInState: boolean = true;

  textAnimationDelay: Number = 3000;

  @Input() animate: boolean;

  constructor(private splashDialogueService: SplashDialogueService) {
  }

  animateTitleDone(event) {
    if (event.toState === 'in') {
      this.titleInState = true;
    }
  }

  animateSubheadingDone(event) {
    if (event.toState === 'in') {
      this.adjectiveInState = false;
    }
  }

  dynamicAdjectiveDone(event) {
    if (event.toState === 'out') {
      this.adjective = this.splashDialogueService
        .getNewDialogueWord(this.adjective, this.words);
      this.adjectiveInState = true;
    } else if (event.toState === 'in') {
      setTimeout(() => {
          this.adjectiveInState = false
        }, this.textAnimationDelay);
    }
  }
}
