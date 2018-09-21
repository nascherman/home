import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";

export default [
  trigger('openTopState', getIconAnimation('top')),
  trigger('openMiddleState', [
    state('open', style({
      opacity: 0
    })),
    state('closed', style({
      opacity: 1
    })),
    transition('closed => open', animate('400ms ease')),
    transition('open => closed', animate('400ms ease')),
  ]),
  trigger('openBottomState', getIconAnimation('bottom')),
];

function getIconAnimation(type) {
  let translation: string = type === 'top' ? `` : `-`;
  let rotation: string = type === 'top' ? '45deg' : '-45deg';

  return [
    state('open', style({
      transform: `translate(0, calc(${translation}{{height}}px/3)) rotate(${rotation})`
    }), {params: {height: 0}}),
    transition('open => *', [
      animate('0.4s ease-in',
        keyframes([
          style({
            transform: `translate(0, calc(${translation}{{height}}px/3)) rotate(${rotation})`,
            offset: 0
          }),
          style({
            transform: `translate(0, calc(${translation}{{height}}px/3)) rotate(0)`,
            offset: 0.2
          }),
          style({
            transform: 'translate(0, 0) rotate(0)',
            offset: 1
          }),
        ])
      )
    ], {params: {height: 0}}),
    transition('* => open', [
      animate('0.4s ease-in',
        keyframes([
          style({
            transform: 'translate(0, 0) rotate(0)',
            offset: 0
          }),
          style({
            transform: `translate(0, calc(${translation}{{height}}px/3)) rotate(0)`,
            offset: 0.2
          }),
          style({
            transform: `translate(0, calc(${translation}{{height}}px/3)) rotate(${rotation})`,
            offset: 1
          })
        ])
      )
    ])
  ]
}
