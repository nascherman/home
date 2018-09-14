import {animate, sequence, state, style, transition, trigger} from "@angular/animations";

const timing = '400ms ease-in-out';

export default [
  trigger('animate', [
    state('void',
      style({
        transform: 'translateX(100%)'
      })
    ),
    transition('void => *',
      sequence([
        style({
          transform: 'translateX(100%)'
        }),
        animate(timing, style({
          transform: 'translateX(0)'
        }))
      ])),
    transition('* => void',
      sequence([
        style({
          transform: 'translateX(0)'
        }),
        animate(timing, style({
          transform: 'translateX(100%)'
        }))
      ]))
  ])
]
