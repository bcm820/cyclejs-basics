import { makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';

function RandomUser(sources) {
  const getRandomUser$ = sources.DOM.select('#getUser')
    .events('click')
    .map(() => {
      const randomId = Math.round(Math.random() * 9) + 1;
      return {
        url: `https://jsonplaceholder.typicode.com/users/${randomId}`,
        category: 'users',
        method: 'GET'
      };
    });

  const user$ = sources.HTTP.select('users') // category
    .flatten()
    .map(res => res.body)
    .startWith(null);

  const vdom$ = user$.map(user => (
    <div>
      <button id="getUser">Get random user</button>
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
    HTTP: getRandomUser$
  };
}

export const drivers = {
  DOM: makeDOMDriver('#root'),
  HTTP: makeHTTPDriver()
};

export default RandomUser;
