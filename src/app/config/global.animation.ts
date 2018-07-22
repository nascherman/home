import {animate, group, keyframes, query, state, style, transition, trigger} from "@angular/animations";

const animationTiming = '1s ease-in';

export default [
  trigger('routeAnimation', [
    transition('* <=> *', [
      group([
        query(':enter', [
          style({
            transform: 'translateY({{offsetEnter}}%)',
            zIndex: 2
          }),
          animate(animationTiming,
            style({
              transform: 'translateY(0)',
              zIndex: 2
            }))
        ], {optional: true}),
        query(':leave', [
          style({
            transform: 'translateY(0)',
            zIndex: 1
          }),
          animate(animationTiming,
            style({
              transform: 'translateY({{offsetLeave}}%)',
              zIndex: 1
            }))
        ])
      ])
    ])
  ])
];
