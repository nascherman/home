import {animate, sequence, state, style, transition, trigger} from "@angular/animations";

export default [
  trigger('visibility', [
    state('hidden', style({
      visibility: 'hidden',
    })),
    transition('hidden => visible',
      sequence([
        style({
          visibility: 'visible',
          transform: 'translateY({{offsetLeave}}vh)'
        }),
        animate('400ms ease-in-out', style({
          transform: 'translateY({{offsetEnter}}px)'
        }))
      ])),
    transition('visible => hidden',
      sequence([
        animate('400ms ease-in-out', style({
          transform: 'translateY({{offsetLeave}}vh)'
        })),
        style({
          visibility: 'hidden'
        })
      ]))
  ]),
]
