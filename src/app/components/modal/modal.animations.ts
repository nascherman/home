import {animate, sequence, state, style, transition, trigger} from "@angular/animations";

export default [
  trigger('visibility', [
    state('hidden', style({
      visibility: 'hidden',
      transform: 'scale(0)'
    })),
    // state('visible', style({
    //   visibility: 'visible'
    // })),
    transition('hidden => visible',
      sequence([
        style({
          visibility: 'visible',
        }),
        animate('400ms ease-in-out', style({
          transform: 'scale(1)'
        }))
      ])),
    transition('visible => hidden',
      sequence([
        animate('400ms ease-in-out', style({
          transform: 'scale(0)'
        })),
        style({
          visibility: 'hidden'
        })
      ]))
  ]),
]
