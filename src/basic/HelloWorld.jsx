import { makeDOMDriver } from '@cycle/dom';

const HelloWorld = sources => {
  return {
    DOM: sources.DOM.select('input')
      .events('input')
      .map(event => event.target.value)
      .startWith('World')
      .map(name => (
        <div>
          <label>Name: </label>
          <input type="text" value={name} />
          <h1>Hello {name}</h1>
        </div>
      ))
  };
};

export const drivers = {
  DOM: makeDOMDriver('#root')
};

export default HelloWorld;
