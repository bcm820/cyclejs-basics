export function intent(domSource) {
  return {
    user$: select(domSource, 'input', '#user').startWith(''),
    pw$: select(domSource, 'input', '#pw').startWith('')
  };
}

const select = (domSource, eventType, ref) =>
  domSource
    .select(ref)
    .events(eventType)
    .map(event => event.target.value);
