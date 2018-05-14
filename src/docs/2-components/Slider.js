import xs from 'xstream';

export function Slider(sources) {
  const state$ = model(intent(sources));
  const vdom$ = view(state$);
  return {
    DOM: vdom$,
    value: state$.map(({ value }) => value)
  };
}

function intent(sources) {
  const actions = {
    props$: sources.props,
    value$: sources.DOM.select('#slider')
      .events('input')
      .map(event => event.target.value)
  };
  return actions;
}

function model(actions) {
  const { props$, value$ } = actions;
  const state$ = props$
    .map(props => value$.map(value => ({ ...props, value })).startWith(props))
    .flatten()
    .remember();
  return state$;
}

function view(state$) {
  const vdom$ = state$.map(({ label, unit, value, min, max }) => (
    <div>
      <input type="range" id="slider" min={min} max={max} value={value} />
      {` ${label}: ${label === 'Height' ? toFeet(value) : value} ${unit}`}
    </div>
  ));
  return vdom$;
}

const toFeet = value => Math.round(value / 30 * 100) / 100;
