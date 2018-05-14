export function getResults(httpSource) {
  return httpSource
    .select('github')
    .flatten()
    .map(res => res.body.items)
    .startWith([]);
}

export function renderResults(results$) {
  return results$.map(results => (
    <div>
      <label className="label">Search:</label>
      <input className="field" type="text" />
      <hr />
      <ul className="search-results">
        {results.map(result => (
          <li className="search-result">
            <a href={result.html_url}>{result.name}</a>
          </li>
        ))}
      </ul>
    </div>
  ));
}

// TODO: Show loading status prior to search
// TODO: Create Github Battle... then Github Tournament!
