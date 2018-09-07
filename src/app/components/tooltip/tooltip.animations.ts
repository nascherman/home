import {animate, state, style, transition, trigger} from "@angular/animations";

export default [
  trigger('visibility', [
    state('hidden', style({
      opacity: 0
    })),
    state('visible', style({
      opacity: 1
    })),
    transition('visible <=> hidden', animate('400ms ease-in-out'))
  ])
]
