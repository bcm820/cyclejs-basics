/**
 * FREQUENLTY USED FACTORIES
 * of(...args)                    Creates a Stream that immediately emits args given
 * from(input)                    Creates a Stream from an Array, Promise, or Observable
 * merge(stream1, stream2)        Blends multiple streams, emitting events concurrently
 * concat(stream1, stream2)       Concatenates multiple streams into one stream
 * combine(stream1, stream2)      Combines multiple streams into a MemoryStream of events as an array
 * periodic(milliseconds)         Creates a Stream that emits incremental numbers given milliseconds
 * tween(configObj)               Creates a Stream of numbers emitted in quick burst (e.g. for animations).
 */

/**
 * GENERAL FACTORIES
 * create(producer)               Creates a Stream
 * createWithMemory(producer)     Creates a MemoryStream
 * fromArray(array)               Converts an array to a Stream
 * fromPromise(promise)           Converts a promise to a Stream
 * fromObservable(observable)     Converts an observable to a Stream
 * fromEvent(element, event)      Creates a stream from DOM events / EventEmitter events
 * fromDiagram(diagram, options)  Creates a stream from an ASCII marble diagram.
 * empty()                        Creates a Stream that immediately emits complete()
 * throw(error)                   Creates a Stream that immediately emits a given error
 * never()                        Creates a stream that emits no events
 */
