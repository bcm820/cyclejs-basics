import { intent } from './intent';
import { model } from './model';
import { view } from './view';
import { REMOVE_ITEM } from './actions';

function Item(sources) {
  const { DOM, Props } = sources;
  const action$ = intent(DOM);
  return {
    DOM: view(model(Props, action$)),
    Remove: action$.filter(REMOVE_ITEM)
  };
}

export default Item;
