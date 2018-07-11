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
  const translationFactor = 2.75;

  let translation: string = type === 'top' ? `calc(100% * ${translationFactor})` : `calc(-100% * ${translationFactor})`;
  let rotation: string = type === 'top' ? '45deg' : '135deg';

  return [
    state('open', style({
      transform: `translate(0, ${translation}) rotate(${rotation})`
    })),
    transition('open => *', [
      animate('0.4s ease-in',
        keyframes([
          style({
            transform: `translate(0, ${translation}) rotate(${rotation})`,
            offset: 0
          }),
          style({
            transform: `translate(0, ${translation}) rotate(0)`,
            offset: 0.2
          }),
          style({
            transform: 'translate(0, 0) rotate(0)',
            offset: 1
          }),
        ])
      )
    ]),
    transition('* => open', [
      animate('0.4s ease-in',
        keyframes([
          style({
            transform: 'translate(0, 0) rotate(0)',
            offset: 0
          }),
          style({
            transform: `translate(0, ${translation}) rotate(0)`,
            offset: 0.2
          }),
          style({
            transform: `translate(0, ${translation}) rotate(${rotation})`,
            offset: 1
          })
        ])
      )
    ])
  ]
}
