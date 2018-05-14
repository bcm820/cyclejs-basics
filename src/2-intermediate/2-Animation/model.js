import xs from 'xstream';
import tween from 'xstream/extra/tween';
import concat from 'xstream/extra/concat';

export function model(action) {
  return action
    .map(() =>
      concat(
        xs.of({ left: 0, top: 0 }),
        leftToRight$,
        topToBottom$,
        circularReturn$,
        leftTopToBottom$
      )
    )
    .flatten()
    .startWith({ left: 0, top: 0 });
}

const leftToRight$ = tween({
  from: 0,
  to: 600,
  duration: 1000,
  ease: tween.power3.easeIn
}).map(x => ({ left: x, top: 0 }));

const topToBottom$ = tween({
  from: 0,
  to: 600,
  duration: 1000,
  ease: tween.power3.easeInOut
}).map(x => ({ left: 600, top: x }));

const circularReturn$ = tween({
  from: Math.PI / 2,
  to: Math.PI,
  duration: 1000,
  ease: tween.power3.easeOut
}).map(x => ({ left: 600 + Math.cos(x) * 600, top: Math.sin(x) * 600 }));

const leftTopToBottom$ = tween({
  from: 0,
  to: 600,
  duration: 1000,
  ease: tween.power3.easeIn
}).map(x => ({ left: 0, top: x }));
