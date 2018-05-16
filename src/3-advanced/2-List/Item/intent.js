import { changeWidth, changeColor, removeItem } from './actions';
import xs from 'xstream';

export function intent(domSource) {
  return xs.merge(
    domSource
      .select('.width-slider')
      .events('input')
      .map(changeWidth),

    domSource
      .select('.color-field')
      .events('input')
      .map(changeColor),

    domSource
      .select('.remove-btn')
      .events('click')
      .mapTo(removeItem)
  );
}
