import { button, div } from '@cycle/dom';
import xs from 'xstream';

export function view(items$) {
  const addButtons = div('.addButtons', [
    button('.add-one-btn', 'Add New Item'),
    button('.add-many-btn', 'Add Many Items')
  ]);

  return items$
    .map(items => {
      const itemVNodeStreamsByKey = items.map(item =>
        item.DOM.map(vnode => {
          vnode.key = item.id;
          return vnode;
        })
      );
      return xs
        .combine(...itemVNodeStreamsByKey)
        .map(vnodes => div('.list', [addButtons].concat(vnodes)));
    })
    .flatten();
}
