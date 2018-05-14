import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import onionify from 'cycle-onionify';
import Folder from './Folder';

const main = onionify(Folder);

export default () =>
  run(main, {
    DOM: makeDOMDriver('#app')
  });
