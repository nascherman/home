import {animate, keyframes, style, transition, trigger} from "@angular/animations";

const carouselTiming = '0.6s ease-in-out';

export default [
  trigger('carouselPosition', [
    transition('left <=> in', [
        animate(carouselTiming,
          keyframes([
            style({
              opacity: 0.5
            }),
            style({
              opacity: 1
            })
          ]))
    ]),
    transition('in <=> right', [
      animate(carouselTiming,
        keyframes([
          style({
            opacity: 1
          }),
          style({
            opacity: 0.3
          })
        ]))
    ]),
    transition('out <=> right', [
      animate(carouselTiming,
        keyframes([
          style({
            opacity: 0,
          }),
          style({
            opacity: 0.3
          })
        ]))
    ]),
    transition('out <=> left', [
      animate(carouselTiming,
        keyframes([
          style({
            opacity: 0
          }),
          style({
            opacity: 0.5
          })
        ]))
    ])
  ])
]
