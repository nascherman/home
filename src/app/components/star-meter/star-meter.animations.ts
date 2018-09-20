import {animate, query, stagger, style, transition, trigger} from "@angular/animations";

const timingMillisecond = 100;
const timing = `${timingMillisecond}ms ease-in-out`;

// HACK to stagger animation for deeply nested component
export const animationDelay = timingMillisecond * 5 + 200;

export default [
  trigger('starAnimation', [
    transition('* => *', [
      query(':enter', [
        style({ opacity: 0 }),
        stagger(timingMillisecond, [
          animate(timing, style({ opacity: 1 }))
        ])
      ], {optional: true})
    ]),
  ]),
]
