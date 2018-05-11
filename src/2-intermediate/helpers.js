export const select = (domSource, eventType, ref) =>
  domSource
    .select(ref)
    .events(eventType)
    .map(event => event.target.value);
