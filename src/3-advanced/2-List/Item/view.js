export function view(state$) {
  return state$.map(({ color, width }) => {
    const style = {
      border: '1px solid #000',
      background: 'none repeat scroll 0% 0% ' + color,
      width: width + 'px',
      height: '70px',
      display: 'block',
      padding: '20px',
      margin: '10px 0px'
    };
    return (
      <div style={style}>
        <input className="color-field" type="text" value={color} />
        <div className="slider-container">
          <input
            className="width-slider"
            type="range"
            min="150"
            max="500"
            value={width}
          />
        </div>
        <div className="width-content">{width}</div>
        <button className="remove-btn">Remove</button>
      </div>
    );
  });
}
