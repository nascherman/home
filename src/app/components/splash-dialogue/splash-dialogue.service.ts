import { Injectable } from '@angular/core';

@Injectable()
export class SplashDialogueService {

  constructor() { }

  getNewDialogueWord(word, words) {
    const filteredArray = words.filter(w => w !== word);

    return filteredArray[Math.floor(Math.random() * filteredArray.length)];
  }
}
