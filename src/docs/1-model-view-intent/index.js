import { makeDOMDriver } from '@cycle/dom';
import { intent } from './intent';
import { model } from './model';
import { view } from './view';
import { run } from '@cycle/run';

/* Model-View-Intent (MVI)
Notes & example from https://cycle.js.org/model-view-intent.html

Intent: Observes and interprets user actions
Model: Observes the intent, managing state
View: Observes the model and represents its state

DOM source -> action streams -> state stream -> stream of virtual DOM nodes
Misc sources  INTENT            MODEL           VIEW
              actions           state           virtual DOM

main() defines how DOM events create actions
which flow to the model, transforming state
represented in the view, which updates the DOM
The cycle is composed as three functions: intent, model, and view */

function main(sources) {
  return { DOM: view(model(intent(sources.DOM))) };
  // const actions = intent(sources.DOM);
  // const state$ = model(actions);
  // const vdom$ = view(state$);
  // return { DOM: vdom$ }
}

export default () => {
  run(main, {
    DOM: makeDOMDriver('#root')
  });
};
