// INTENT
export const changeWidth = event => ({
  type: 'CHANGE_WIDTH',
  payload: parseInt(event.target.value)
});

export const changeColor = event => ({
  type: 'CHANGE_COLOR',
  payload: event.target.value
});

export const removeItem = { type: 'REMOVE_ITEM' };

// MODEL
export const CHANGE_WIDTH = action => action.type === 'CHANGE_WIDTH';
export const CHANGE_COLOR = action => action.type === 'CHANGE_COLOR';
export const REMOVE_ITEM = action => action.type === 'REMOVE_ITEM';
