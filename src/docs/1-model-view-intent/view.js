export function view(state$) {
  return state$.map(({ weight, height, bmi }) => (
    <div>
      {renderSlider('Weight', 'lbs.', weight, 80, 300)}
      {renderSlider('Height', 'ft.', height, 150, 250)}
      <h2>BMI: {bmi}</h2>
    </div>
  ));
}

const renderSlider = (label, unit, value, min, max) => {
  return (
    <div>
      <input type="range" className={label} min={min} max={max} value={value} />
      {` ${label}: `}
      {label === 'Height' ? Math.round(value / 30 * 100) / 100 : value}
      {` ${unit} `}
    </div>
  );
};
