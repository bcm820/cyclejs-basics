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
const MIN_LENGTH = 5;

const getResult = (input, label) => {
  if (input.length <= LOWER_LIMIT)
    return {
      valid: 'pending',
      message: `Choose a ${label}`
    };
  else if (input.length <= MIN_LENGTH)
    return {
      valid: false,
      message: `Your ${label} is too short!`
    };
  else if (input.length >= UPPER_LIMIT)
    return {
      valid: false,
      message: `Your ${label} is too long!`
    };
  else
    return {
      valid: true,
      message: `Your ${label} is valid!`
    };
};
