import { makeDOMDriver } from '@cycle/dom';
import { model } from './model';
import { run } from '@cycle/run';

function main(sources) {
  return { DOM: view(model(intent(sources.DOM))) };
}

function intent(domSource) {
  return domSource.select('#go').events('click');
}

function view(state$) {
  return state$.map(({ left, top }) => (
    <div>
      <button id="go">Go!</button>
      <div style={targetStyle(left, top)} />
    </div>
  ));
}

const targetStyle = (left, top) => ({
  position: 'relative',
  backgroundColor: 'blue',
  width: '60px',
  height: '60px',
  left: `${Math.round(left)}px`,
  top: `${Math.round(top)}px`
});

export default () => {
  run(main, {
    DOM: makeDOMDriver('#root')
  });
};
