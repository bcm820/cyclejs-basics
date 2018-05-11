export function view(state$) {
  return state$.map(res => (
    <div>
      <h2>Member Form</h2>
      {renderInput('Login', 'user', res.user)}
      {renderInput('Password', 'pw', res.pw)}
    </div>
  ));
}

const renderInput = (label, id, result) => (
  <p>
    {label}: <input id={id} type="text" />
    <span style={renderStyle(result.valid)}> {result.message}</span>
  </p>
);

const renderStyle = valid => ({
  color: valid === 'pending' ? 'black' : !valid ? 'red' : 'green'
});
