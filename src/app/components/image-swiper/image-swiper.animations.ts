import {animate, sequence, state, style, transition, trigger} from "@angular/animations";

const timing = '400ms';

export default [
  trigger('animation', [
    state('in', style({
      transform: 'translateX(0)'
    })),
    state('left', style({
      transform: 'translateX(-100%)'
    })),
    state('right', style({
      transform: 'translateX(100%)'
    })),
    transition('left => in',
      sequence([
        style({
          transform: 'translateX({{offsetBegin}}px)'
        }),
        animate(timing, style({
          transform: 'translateX(0)'
        }))
      ])),
    transition('in => left',
      sequence([
        style({
          transform: 'translateX({{offsetBegin}}px)'
        }),
        animate(timing, style({
          transform: 'translateX(-100%)'
        }))
      ])),
    transition('right => in',
      sequence([
        style({
          transform: 'translateX({{offsetBegin}}px)'
        }),
        animate(timing, style({
          transform: 'translateX(0)'
        }))
      ])),
    transition('in => right',
      sequence([
        style({
          transform: 'translateX({{offsetBegin}}px)'
        }),
        animate(timing, style({
          transform: 'translateX(100%)'
        }))
      ]))
  ])
];
