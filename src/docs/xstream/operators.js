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
