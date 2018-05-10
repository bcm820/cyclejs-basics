import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';

import xs from 'xstream';

// Increment/Decrement Counter
// main() receives user actions and return two streams combined
// into one via two methods, mapped as a stream of vdom nodes.
function main(sources) {
  // xs.merge is a factory for streams
  // it blends multiple streams into one to emit their events concurrently
  const action$ = xs.merge(
    sources.DOM.select('#decrement')
      .events('click')
      .map(event => -1),
    sources.DOM.select('#increment')
      .events('click')
      .map(event => 1)
  );
  // xs.fold is an operator for streams
  // it reduces a stream of values into the initial value of a MemoryStream
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
}

// As main() grows, the need to separate concerns grows as well
// For now, we keep things together to focus on dataflow

export default () => {
  run(main, {
    DOM: makeDOMDriver('#root')
  });
};
