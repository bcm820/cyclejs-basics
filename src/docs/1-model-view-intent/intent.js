export function intent(domSource) {
  const actions = {
    changeWeight$: observeAction(domSource, 'Weight'),
    changeHeight$: observeAction(domSource, 'Height')
  };
  return actions;
}

const observeAction = (domSource, className) => {
  const action = domSource
    .select(`.${className}`)
    .events('input')
    .map(event => event.target.value);
  return action;
};
