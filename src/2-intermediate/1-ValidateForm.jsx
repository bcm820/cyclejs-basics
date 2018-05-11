import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import xs from 'xstream';

import { select } from './helpers';
import { LOWER_LIMIT, UPPER_LIMIT, USER_LENGTH, PW_LENGTH } from './constants';

function main(sources) {
  const user$ = select(sources.DOM, 'input', '#user').startWith('');
  const pw$ = select(sources.DOM, 'input', '#pw').startWith('');
  const info$ = xs.combine(user$, pw$).remember();
  const results$ = info$.map(([user, pw]) => validateInfo([user, pw]));
  const vdom$ = results$.map(res => (
    <div>
      <h2>Member Form</h2>
      {renderInput('Login', 'user', res.user)}
      {renderInput('Password', 'pw', res.pw)}
    </div>
  ));
  return { DOM: vdom$ };
}

const validateInfo = ([user, pw]) => {
  return {
    user: getResult(user, 'username'),
    pw: getResult(pw, 'password')
  };
};

const getResult = (input, label) => {
  if (input.length <= LOWER_LIMIT) return `Pick a ${label}.`;
  else if (input.length <= USER_LENGTH)
    return renderMessage(label, 'too short', 'red');
  else if (input.length >= UPPER_LIMIT)
    return renderMessage(label, 'too long', 'red');
  else return renderMessage(label, 'works', 'green');
};

const renderMessage = (value, desc, color) => (
  <span style={{ color, fontWeight: 600 }}>
    Your {value} is {desc}!
  </span>
);

const renderInput = (label, id, result) => (
  <p>
    {label}: <input id={id} type="text" /> {result}
  </p>
);

export default () => {
  run(main, {
    DOM: makeDOMDriver('#root')
  });
};
