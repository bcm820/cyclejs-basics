import { makeDOMDriver } from '@cycle/dom';

import xs from 'xstream';

function BMICalculator(sources) {
  const weight$ = sources.DOM.select('#weight')
    .events('input')
    .map(event => event.target.value)
    .startWith(100);
  const height$ = sources.DOM.select('#height')
    .events('input')
    .map(event => event.target.value)
    .startWith(150);

  const state$ = xs.combine(weight$, height$).map(([weight, height]) => {
    const heightFt = Math.round(height / 30 * 100) / 100; // cm -> ft
    const heightIn = height / 2.54; // cm -> in
    const bmi = Math.round(weight / heightIn / heightIn * 703 * 100) / 100;
    return { height, weight, bmi, heightFt };
  });

  return {
    DOM: state$.map(({ weight, height, bmi, heightFt }) => (
      <div>
        <div>
          <input id="weight" type="range" min="80" max="300" value={weight} />
          Weight: {weight} lbs.
        </div>
        <div>
          <input id="height" type="range" min="150" max="250" value={height} />
          Height: {heightFt} ft.
        </div>
        <h2>BMI: {bmi}</h2>
      </div>
    ))
  };
}

export const drivers = {
  DOM: makeDOMDriver('#root')
};

export default BMICalculator;
