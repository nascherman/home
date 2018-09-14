import {animate, sequence, state, style, transition, trigger} from "@angular/animations";

const navigationWidth: string = '80vw';

export default [
  trigger('toolbarState', [
    state('closed', style({
      visibility: 'hidden',
      left: `-${navigationWidth}`
    })),
    transition('closed => open', [
      sequence([
        style({
          visibility: 'visible'
        }),
        animate('400ms ease-in-out', style({
          left: 0
        }))
      ])
    ]),
    transition('open => closed', [
      sequence([
        animate('400ms ease-in-out', style({
          left: `-${navigationWidth}`
        })),
        style({
          visibility: 'hidden'
        })
      ])
    ]),
  ])
]
