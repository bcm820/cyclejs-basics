import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';

// Simple checkbox toggle using selector-based event querying
// user actions are a stream of DOM events received by main(),
// which then updates toggle state and returns virtual DOM
function main(sources) {
  return {
    DOM: sources.DOM.select('#Checkbox')
      .events('change')
      .map(event => event.target.checked)
      .startWith(false)
      .map(toggled => (
        <div>
          <input id="Checkbox" type="checkbox" />
          <p>{toggled ? 'ON' : 'OFF'}</p>
        </div>
      ))
  };
}

export default () =>
  run(main, {
    DOM: makeDOMDriver('#root')
  });
