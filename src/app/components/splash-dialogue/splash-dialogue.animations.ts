import {animate, trigger, transition, style, keyframes, state} from '@angular/animations';

export default [
  trigger('dynamicAdjective', [
    state('out', style({
      opacity: 0,
      top: '-2em'
    })),
    state('in', style({
      opacity: 1,
      top: 0
    })),
    transition('* => out', [
      animate('1s ease-in',
        keyframes([
          style({
            opacity: 1,
            top: 0
          }),
          style({
            opacity: 0,
            top: '-2em'
          })
        ]))
    ]),
    transition('out => in', [
      animate('1s ease-in',
        keyframes([
          style({
            opacity: 0,
            top: '2em'
          }),
          style({
            opacity: 1,
            top: 0
          })
        ]))
    ])
  ]),
  trigger('splashDialogue', [
    state('out', style({
      opacity: 0,
      left: '-20vw'
    })),
    transition('* => in', [
      animate('1s ease-in',
        keyframes([
          style({
            opacity: 0,
            left: '-20vw'
          }),
          style({
            opacity: 0.1,
            left: '-4vw'
          }),
          style({
            opacity: 1,
            left: 0
          })
        ]))
    ])
  ])
]
