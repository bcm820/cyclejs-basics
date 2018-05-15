import xs from 'xstream';

/* STREAM: An event emitter with multiple listeners.
Stream events are broadcasted to all listeners at the same time. */

/* MEMORYSTREAM: Stream that remembers its most recently emitted value.
When new listeners are added, it will emit its most recent value to it.
MemoryStreams are values or pieces of state relevant after time has passed. */

/* PRODUCER:
An object with functions that start and stop a stream's events.
In Cycle.js, drivers are producers. */
const producer = {
  start: firstListener =>
    (this.count = setInterval(() => firstListener.next(this.count + 1), 1000)),
  stop: () => clearInterval(this.count),
  count: 0
};

/* FACTORY: A function that creates streams. e.g. xs.create(). */
const stream = xs.create(producer);

/* OPERATORS: Methods attached to streams that can return new output streams.
When called, an operator creates and returns another stream.
When an input stream broadcasts an event, it is passed through operator logic
and then the output stream can broadcast its on event based on the original event. */

/* LISTENER
An object with 1-3 functions attached: next(value), error(err), and complete().
Many listeners can be attached to a stream to receive its broadcasted values. */
const listener = {
  next: value => console.log('Number: ', value),
  error: err => console.error('Error: ', err),
  complete: () => console.log('Resetting to 0.')
};

/* When the stream is first created, it is idle. The value is 0.
When the first listener is added, the producer starts streaming events.
When all listeners are removed, stop() is called at the next event loop.
But if a new listener is added before the next event loop, stop() is cancelled.
This allows for swapping the single listener of a stream. */
stream.addListener(listener);
