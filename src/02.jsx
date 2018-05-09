import { makeDOMDriver } from '@cycle/dom';

const ToggleCheckbox = sources => {
  return {
    DOM: sources.DOM.select('input')
      .events('change')
      .map(event => event.target.checked)
      .startWith(false)
      .map(toggled => (
        <div>
          <input type="checkbox" /> {toggled ? 'ON' : 'OFF'}
        </div>
      ))
  };
};

export const drivers = {
  DOM: makeDOMDriver('#root')
};

export default ToggleCheckbox;
