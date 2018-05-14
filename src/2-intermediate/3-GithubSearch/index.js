import { makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';
import { timeDriver } from '@cycle/time';
import { search, limit } from './http';
import { mapResults, render } from './DOM';
import { run } from '@cycle/run';

function main(sources) {
  return {
    HTTP: limit(search(sources.DOM, sources.Time)),
    DOM: render(mapResults(sources.HTTP))
  };
}

export default () => {
  run(main, {
    DOM: makeDOMDriver('#root'),
    HTTP: makeHTTPDriver(),
    Time: timeDriver
  });
};
