import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';

// HTTP Request to receive, update, and render state
// Docs: https://cycle.js.org/api/http.html
function main(sources) {
  // A DOM driver's click event is mapped into a stream
  // returning a randomly generated URL string
  const request$ = sources.DOM.select('#request')
    .events('click')
    .map(() => {
      const id = Math.round(Math.random() * 9) + 1;
      return `https://jsonplaceholder.typicode.com/users/${id}`;
    });
  // An object may also be passed with more configs
  // i.e. defining a `category` key to give to select() below

  // The HTTP driver observes the DOM source, receives the URL,
  // sends the request and maps a response metastream (stream of streams)
  const responseMetastream$$ = sources.HTTP.select();

  // When the responseMetastream$$ is returned,
  // flatten it into one stream to get the response body
  const response$ = responseMetastream$$
    .flatten()
    .map(res => res.body)
    .startWith(null);

  // Map new virtual DOM nodes with the response body
  const vdom$ = response$.map(user => (
    <div>
      <button id="request">Get random user</button>
      {user === null ? null : (
        <div>
          <h1>{user.name}</h1>
          <h4>{user.email}</h4>
          <a href={user.website}>{user.website}</a>
        </div>
      )}
    </div>
  ));

  return {
    DOM: vdom$,
    HTTP: request$
  };
}

export default () => {
  run(main, {
    DOM: makeDOMDriver('#root'),
    HTTP: makeHTTPDriver()
  });
};
