import xs from 'xstream';

export function model(actions) {
  const weight$ = actions.changeWeight$.startWith(100);
  const height$ = actions.changeHeight$.startWith(150);
  const state$ = xs.combine(weight$, height$).map(([weight, height]) => ({
    weight,
    height,
    bmi: calcBMI(weight, height)
  }));
  return state$;
}

const calcBMI = (weight, height) => {
  const heightIn = height / 2.54;
  return Math.round(weight / heightIn / heightIn * 703 * 100) / 100;
};
