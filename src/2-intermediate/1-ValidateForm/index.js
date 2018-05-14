import { makeDOMDriver } from '@cycle/dom';
import { model } from './model';
import { view } from './view';
import { intent } from './intent';
import { run } from '@cycle/run';

function main(sources) {
  return { DOM: view(model(intent(sources.DOM))) };
}

export default () => {
  run(main, {
    DOM: makeDOMDriver('#root')
  });
};
