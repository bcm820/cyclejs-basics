import xs from 'xstream';

export function intent(domSource, itemRemove$) {
  return xs.merge(
    domSource
      .select('.add-one-btn')
      .events('click')
      .mapTo({ type: 'ADD_ITEM', payload: 1 }),

    domSource
      .select('.add-many-btn')
      .events('click')
      .mapTo({ type: 'ADD_ITEM', payload: 10 }),

    itemRemove$.map(id => ({ type: 'REMOVE_ITEM', payload: id }))
  );
}
