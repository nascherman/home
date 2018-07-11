import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";

const navigationWidth: string = '80vw';

export default [
  trigger('toolbarState', [
    state('closed', style({
      visibility: 'hidden',
      left: `-${navigationWidth}`
    })),
    transition('closed => open', [
      animate('0.4s ease',
        keyframes([
          style({
            visibility: 'hidden',
            offset: 0
          }),
          style({
            visibility: 'visible',
            offset: 0.2
          }),
          style({
            left: 0,
            offset: 1
          })
        ]))
    ]),
    transition('open => closed', [
      animate('0.4s ease',
        keyframes([
          style({
            left: 0,
            offset: 0
          }),
          style({
            left: `-${navigationWidth}`,
            offset: 0.8
          }),
          style({
            visibility: 'hidden',
            offset: 1
          })
        ]))
    ]),
  ])
]
