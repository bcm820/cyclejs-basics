import { run } from '@cycle/run';
import isolate from '@cycle/isolate';
import { makeDOMDriver } from '@cycle/dom';
import xs from 'xstream';

import { Slider } from './Slider';
import PROPS from './constants';

// Any Cycle.js app can be reused as a component in larger Cycle.js app.
// Sources and sinks are the interface between the application and the drivers,
// but they are also the interface between a child component and its parent.
function main(sources) {
  const sliders = buildSliderComponents(sources);
  const bmi = calcBMI(...sliders.map(slider => slider.value));
  return {
    DOM: xs
      .combine(...sliders.map(slider => slider.DOM, bmi))
      .map(([weightVDom, heightVDom, bmi]) => (
        <div>
          {weightVDom}
          {heightVDom}
          <h2>BMI is {bmi}</h2>
        </div>
      ))
  };
}

// Build each slider component from props
// Map each as a new isolated component in an array
// Component instances must be isolated to prevent collision
const buildSliderComponents = sources => {
  return Object.keys(PROPS).map(key => {
    const sourceWithProps = { ...sources, props: xs.of(PROPS[key]) };
    return isolate(Slider)(sourceWithProps);
  });
};

const calcBMI = (weight$, height$) =>
  xs.combine(weight$, height$).map(([weight, height]) => {
    const heightIn = height / 2.54;
    return Math.round(weight / heightIn / heightIn * 703 * 100) / 100;
  });

export default () => {
  run(main, {
    DOM: makeDOMDriver('#root')
  });
};
