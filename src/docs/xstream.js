import xs from 'xstream';

/* STREAM: An event emitter with multiple listeners.
Stream events are broadcasted to all listeners at the same time. */

/* PRODUCER: An object with functions that start and stop a stream's events.
In Cycle.js, drivers are producers... */
const producer = {
  start: firstListener =>
    (this.count = setInterval(() => firstListener.next(this.count + 1), 1000)),
  stop: () => clearInterval(this.count),
  count: 0
};

/* FACTORY: A function that creates streams. e.g. xs.create(). */
const stream = xs.create(producer);

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

/* MEMORYSTREAM: A stream that remembers the most recent "next" event sent to its listeners.
When new listeners are added, the MemoryStream will send its most recent next value to it.
MemoryStreams represent values or pieces of state relevant even after time has passed. */

/* OPERATORS: Methods attached to streams that can return new output streams.
When called, an operator creates and returns another stream.
When an input stream broadcasts an event, it is passed through operator logic
and then the output stream can broadcast its on event based on the original event. */

/**
 * FACTORIES & OPERATORS
 * Docs: https://github.com/staltz/xstream
 * Extras: https://github.com/staltz/xstream/blob/master/EXTRA_DOCS.md
 */

/**
 * FREQUENLTY USED FACTORIES
 * of(...args)                    Creates a Stream that immediately emits args given
 * from(input)                    Creates a Stream from an Array, Promise, or Observable
 * merge(stream1, stream2)        Blends multiple streams, emitting events concurrently
 * combine(stream1, stream2)      Combines multiple streams into a MemoryStream of events as an array
 * concat(stream1, stream2)
 * periodic(milliseconds)         Creates a Stream that emits incremental numbers given milliseconds
 */

/**
 * GENERAL FACTORIES
 * create(producer)               Creates a Stream
 * createWithMemory(producer)     Creates a MemoryStream
 * fromArray(array)               Converts an array to a Stream
 * fromPromise(promise)           Converts a promise to a Stream
 * fromObservable(observable)     Converts an observable to a Stream
 * empty()                        Creates a Stream that immediately emits complete()
 * throw(error)                   Creates a Stream that immediately emits a given error
 * never()                        Creates a stream that emits no events
 */

/**
 * FREQUENTLY USED OPERATORS
 * map(transform)                 Transforms each event from a Stream to get a new Stream
 * mapTo(value)                   Transforms each event from a Stream into a single value
 * filter(test)                   Outputs a Stream emitting only values that pass a given test
 * startWith(value)               Prepends given value to passed input Stream events, returning a MemoryStream
 * flatten()                      Flattens a stream of streams, handling each event at a time without concurrency
 * fold(accumulate, seed)         Reduces an input Stream into the initial value of a MemoryStream that accumulates
 * compose(operator)              Passes an input Stream to a custom operator to produce an output Stream
 * take(amount)                   Passes the first amount of events to an output Stream, then completes it
 * drop(amount)                   Ignores the first amount of input events before passing all the rest
 * last()                         When the input Stream completes, the output Stream will emit the last event
 * endWhen(otherStream)           Causes an output Stream to complete when a given other Stream completes
 * replaceError(replace)          If an error occurs on an input Stream, replaces an error with another Stream
 * remember()                     Returns a duplicate output stream, but as a MemoryStream for new listeners
 * imitate(otherStream)           Changes a current Stream to emit the same events a given other Stream does (returns null)
 */

/**
 * GENERAL OPERATORS
 * addListener(listener)          Adds a listener to a Stream
 * removeListener(listener)       Removes a listener from a Stream
 * subscribe(listener)            Adds a listener, returning a subscription to remove that listener
 * debug(labelOrSpy)              Returns a duplicate output stream, but runs a spy function (or logs each by default)
 * setDebugListener(listener)     Adds a Stream's debug listener, which listens without triggering start/stop
 */
