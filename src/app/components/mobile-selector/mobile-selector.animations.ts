import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";

const carouselTiming = '0.6s ease-in-out';

export default [
  trigger('carouselPosition', [
    state('out', style({
      opacity: 0
    })),

    state('in', style({
      opacity: 1
    })),
    transition('in <=> out', [
      animate(carouselTiming,
        keyframes([
          style({
            opacity: 1
          }),
          style({
            opacity: 0
          })
        ]))
    ])
  ])
]
