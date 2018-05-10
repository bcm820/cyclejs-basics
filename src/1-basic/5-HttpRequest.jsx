import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';

// HTTP Request to receive, update, and render state
// Docs: https://cycle.js.org/api/http.html
function main(sources) {
  // A DOM driver's click event is mapped into a stream
  // returning a randomly generated URL string
  // An object may also be passed, with more configs,
  // i.e. defining a `category` key to give to select() below
  const request$ = sources.DOM.select('#request')
    .events('click')
    .map(() => {
      const id = Math.round(Math.random() * 9) + 1;
      return `https://jsonplaceholder.typicode.com/users/${id}`;
    });

  // The HTTP driver observes the DOM source, receives the URL,
  // receives and returns a repsonse metastream (stream of streams)
  const httpMetastream$$ = sources.HTTP.select();

  // When the httpMetastream$$ is returned, we flatten it to get
  // the request body stream, which we store in response$
  const response$ = httpMetastream$$
    .flatten()
    .map(res => res.body)
    .startWith(null);

  // For event handling, we add a listener to check
  // any statuses or errors received by the response$ stream
  response$.addListener({
    next: httpResponse => console.log(httpResponse.status),
    error: err => console.log(err),
    complete: () => {}
  });

  // We map new virtual DOM nodes with the response object
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
