import {animate, group, keyframes, query, state, style, transition, trigger} from "@angular/animations";

const animationTiming = '0.7s ease-in-out';

export default [
  trigger('routeAnimation', [
    transition('* <=> *', [
      query(':enter, :leave', style({ position: 'fixed', width:'100%' })
        , { optional: true }),
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
        ], {optional: true})
      ])
    ])
  ])
];
