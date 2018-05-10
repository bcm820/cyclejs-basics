import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';

// Hello World using selector-based event querying
// user actions are a stream of DOM events received by main(),
// which then updates input state and returns virtual DOM
function main(sources) {
  return {
    DOM: sources.DOM.select('#Name')
      .events('input')
      .map(event => event.target.value)
      .startWith('World!')
      .map(name => (
        <div>
          <label>Name: </label>
          <input id="Name" type="text" value={name} />
          <h1>Hello {name}</h1>
        </div>
      ))
  };
}

export default () => {
  run(main, {
    DOM: makeDOMDriver('#root')
  });
};
