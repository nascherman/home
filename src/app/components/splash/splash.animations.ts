import {animate, trigger, transition, style, keyframes, state} from '@angular/animations';

export default [
  trigger('image', [
    transition('void => *', [
      animate('1s ease-in',
        keyframes([
          style({
            transform: 'scale(0.5)',
            opacity: 0
          }),
          style({
            transform: 'scale(0.8)',
            opacity: 0.1
          }),
          style({
            transform: 'scale(1)',
            opacity: 1
          })
        ]))
    ])
  ])
];
