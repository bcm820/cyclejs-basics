import { makeDOMDriver } from '@cycle/dom';

import xs from 'xstream';

const Counter = sources => {
  // 'merge' factory blends multiple streams into one to emit their events concurrently
  const action$ = xs.merge(
    sources.DOM.select('#decrement')
      .events('click')
      .map(event => -1),
    sources.DOM.select('#increment')
      .events('click')
      .map(event => 1)
  );
  // 'fold' operator reduces a stream into the initial value of a MemoryStream
  const count$ = action$.fold((acc, x) => acc + x, 0);
  return {
    DOM: count$.map(count => (
      <div>
        <button id="decrement">-</button>
        <button id="increment">+</button>
        <p>Counter: {count}</p>
      </div>
    ))
  };
};

export const drivers = {
  DOM: makeDOMDriver('#root')
};

export default Counter;
