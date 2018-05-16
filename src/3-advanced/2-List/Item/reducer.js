export default action => state => {
  switch (action.type) {
    case 'CHANGE_WIDTH':
      return {
        color: state.color,
        width: action.payload
      };

    case 'CHANGE_COLOR':
      return {
        width: state.width,
        color: action.payload
      };

    default:
      return state;
  }
};
