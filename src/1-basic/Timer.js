import { makeDOMDriver, h2 } from '@cycle/dom';
import xs from 'xstream';

const Timer = sources => {
  const sinks = {
    DOM: xs.periodic(1000).map(i => h2(`Seconds elapsed: ${i}`))
  };
  return sinks;
};

export const drivers = {
  DOM: makeDOMDriver('#root')
};

export default Timer;
