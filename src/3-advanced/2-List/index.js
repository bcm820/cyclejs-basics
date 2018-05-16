import { makeDOMDriver } from '@cycle/dom';
import { intent } from './intent';
import { model } from './model';
import { view } from './view';
import { run } from '@cycle/run';

import xs from 'xstream';
import { button, div } from '@cycle/dom';
import isolate from '@cycle/isolate';
import Item from './Item';

function main(sources) {
  const proxyItemRemove$ = xs.create();
  const action$ = intent(sources.DOM, proxyItemRemove$);
  const itemWrapper = makeItemWrapper(sources.DOM);
  const items$ = model(action$, itemWrapper);
  const itemRemove$ = items$
    .map(items => xs.merge(...items.map(item => item.Remove)))
    .flatten();
  proxyItemRemove$.imitate(itemRemove$);
  const vtree$ = view(items$);

  return {
    DOM: vtree$
  };
}

function makeItemWrapper(DOM) {
  return function itemWrapper(props, id) {
    const item = isolate(Item)({ DOM, Props: xs.of(props) });
    return {
      DOM: item.DOM,
      Remove: item.Remove.mapTo(id)
    };
  };
}

export default () =>
  run(main, {
    DOM: makeDOMDriver('#root')
  });
