import { run } from '@cycle/run';
import { makeDOMDriver, h2 } from '@cycle/dom';
import xs from 'xstream';

// Simple timer using xs.periodic
// main() is a dataflow component
// It receives source inputs from drivers (i.e. user interaction with DOM)
// It returns sink outputs to drivers (i.e. virtual DOM updates)
function main(sources) {
  const sinks = {
    DOM: xs.periodic(1000).map(i => h2(`Seconds elapsed: ${i}`))
  };
  return sinks;
}

// main() is passed to the Cycle.js run function
// which ties it to the drivers (most often DOM actions)
// If this file was the npm entry point, we can call run() directly
function runApp() {
  const drivers = {
    DOM: makeDOMDriver('#root')
  };
  run(main, drivers);
}
export default runApp;
