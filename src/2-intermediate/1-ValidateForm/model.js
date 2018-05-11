import xs from 'xstream';

export function model(actions) {
  return xs
    .combine(actions.user$, actions.pw$)
    .remember()
    .map(([user, pw]) => validateInfo([user, pw]));
}

const validateInfo = ([user, pw]) => {
  return {
    user: getResult(user, 'username'),
    pw: getResult(pw, 'password')
  };
};

const LOWER_LIMIT = 1;
const UPPER_LIMIT = 10;
const USER_LENGTH = 6;
const PW_LENGTH = 7;

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
