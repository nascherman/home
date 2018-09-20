import {animate, animateChild, query, sequence, state, style, transition, trigger} from "@angular/animations";

export default [
  trigger('visibility', [
    state('hidden', style({
      visibility: 'hidden',
    })),
    transition('hidden => visibleMobile',
      sequence([
        style({
          visibility: 'visible',
          transform: 'translateY({{offsetLeave}}vh)'
        }),
        animate('400ms ease-in-out', style({
          transform: 'translateY({{offsetEnter}}px)'
        })),
        query("@*", [animateChild()], {optional: true}),
      ])),
    transition('visibleMobile => hidden',
      sequence([
        animate('400ms ease-in-out', style({
          transform: 'translateY({{offsetLeave}}vh)'
        })),
        style({
          visibility: 'hidden'
        })
      ])),
    transition('hidden => visibleDesktop',
      sequence([
        style({
          visibility: 'visible',
          transform: 'scale(0)'
        }),
        animate('400ms ease-in-out', style({
          transform: 'scale(1)'
        })),
        query("@*", [animateChild()], {optional: true}),
      ])),
    transition('visibleDesktop => hidden',
      sequence([
        animate('400ms ease-in-out', style({
          transform: 'scale(0)'
        })),
        style({
          visibility: 'hidden'
        })
      ]))
  ])
]
