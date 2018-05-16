import { CHANGE_WIDTH, CHANGE_COLOR } from './actions';
import reduce from './reducer';
import xs from 'xstream';

export function model(props$, action$) {
  return xs
    .merge(
      props$.map(props => state => props),
      action$.filter(CHANGE_WIDTH).map(reduce),
      action$.filter(CHANGE_COLOR).map(reduce)
    )
    .fold((state, reducer) => reducer(state), initialState);
}

const initialState = {
  color: 'red',
  width: 150
};
