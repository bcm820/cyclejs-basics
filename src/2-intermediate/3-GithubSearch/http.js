import debounce from 'xstream/extra/debounce';

// Search for Github repos on input updates
export function search(domSource, timeSource) {
  return domSource
    .select('.field')
    .events('input')
    .compose(timeSource.debounce(500))
    .map(ev => ev.target.value);
}

// Search requests are debounced by 500ms
// and filtered for empty inputs
export function limit(input) {
  return input.filter(query => query.length > 0).map(query => ({
    url: `https://api.github.com/search/repositories?q=${encodeURI(query)}`,
    category: 'github'
  }));
}
