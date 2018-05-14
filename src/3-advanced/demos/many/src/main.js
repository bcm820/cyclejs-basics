import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import List from './List';

function main(sources) {
  return List(sources);
}

export default () =>
  run(main, {
    DOM: makeDOMDriver('#root')
  });
