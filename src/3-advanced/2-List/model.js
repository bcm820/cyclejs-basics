import xs from 'xstream';

export function model(action$, itemFn) {
  function createRandomItemProps() {
    let hexColor = Math.floor(Math.random() * 16777215).toString(16);
    while (hexColor.length < 6) {
      hexColor = '0' + hexColor;
    }
    hexColor = '#' + hexColor;
    const randomWidth = Math.floor(Math.random() * 800 + 200);
    return { color: hexColor, width: randomWidth };
  }

  let mutableLastId = 0;

  function createNewItem(props) {
    const id = mutableLastId++;
    const sinks = itemFn(props, id);
    return { id, DOM: sinks.DOM.remember(), Remove: sinks.Remove };
  }

  const addItemReducer$ = action$
    .filter(a => a.type === 'ADD_ITEM')
    .map(action => {
      const amount = action.payload;
      let newItems = [];
      for (let i = 0; i < amount; i++) {
        newItems.push(createNewItem(createRandomItemProps()));
      }
      return function addItemReducer(listItems) {
        return listItems.concat(newItems);
      };
    });

  const removeItemReducer$ = action$.filter(a => a.type === 'REMOVE_ITEM').map(
    action =>
      function removeItemReducer(listItems) {
        return listItems.filter(item => item.id !== action.payload);
      }
  );

  const initialState = [createNewItem({ color: 'red', width: 150 })];

  return xs
    .merge(addItemReducer$, removeItemReducer$)
    .fold((listItems, reducer) => reducer(listItems), initialState);
}
