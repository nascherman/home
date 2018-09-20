import {animate, query, stagger, style, transition, trigger} from "@angular/animations";

import {animationDelay} from "../star-meter/star-meter.animations";

// HACK so skill stars animate before skill logos
const timing = `400ms  ${animationDelay}ms ease-in-out`;

export default [
  trigger('icon', [
    transition('* => *', [
      query(':enter', [
        style({ opacity: 0 }),
        stagger(200, [
          animate(timing, style({ opacity: 1 }))
        ]),
      ], {optional: true})
    ]),
  ]),
]
