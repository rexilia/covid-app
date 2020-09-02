class Subscription {
    constructor() {
        this.teardowns = [];
    }
    add(teardown) {
        this.teardowns.push(teardown);
    }
    unsubscribe() {
        for (const teardown of this.teardowns) {
            teardown();
        }
        this.teardowns = [];
    }
}
class Subscriber {
    constructor(destination, subscription) {
        this.destination = destination;
        this.subscription = subscription;
        this.closed = false;
        const firstTeardown = () => (this.closed = true);
        subscription.add(firstTeardown);
    }
    next(value) {
        if (!this.closed) {
            this.destination.next(value);
        }
    }
    error(err) {
        if (!this.closed) {
            this.destination.error(err);
            this.subscription.unsubscribe();
        }
    }
    complete() {
        if (!this.closed) {
            this.destination.complete();
            this.subscription.unsubscribe();
        }
    }
}
class Observable {
    constructor(init) {
        this.init = init;
    }
    subscribe(observer) {
        const subscription = new Subscription();
        const subscriber = new Subscriber(observer, subscription);
        subscription.add(this.init(subscriber));
        return subscription;
    }
}
const initFunction = (observer) => {
    let i = 0;
    const id = setInterval(() => observer.next(i++), 1000);
    setTimeout(() => observer.complete(), 12000);
    return () => {
        console.log('Teardown initiated');
        clearInterval(id);
    };
};
const myObs = new Observable(initFunction);
const sub = myObs.subscribe({
    next(value) {
        console.log('The value is ' + value);
    },
    error(value) {
        console.log('This is an error');
        console.error(value);
    },
    complete() {
        console.log('This is completed');
    },
});
setTimeout(() => sub.unsubscribe(), 5000);
/**
 * Observable - Something that can be observed -> It generates a stream of data
 * Observer - Someone who observes(process: Subscription) the data from the observable.
 *            It needs to know when there is new data in the stream, when there is an error and where is no more data.
 *            It uses the event handlers
 * Subscription - Is created when an observer subscribes to an Observable
 *               * subscribe:  Creates a subscription
 *               * unsubscribe: Stops the subscription and stops the data flow. This process is called as Teardown
 *               * Teardown:
 * Subscriber - Wrap around that enables us to create a proper subscription. Its very close to the observer
 *
 * Event Handlers
 * next
 *   - Only when someone subscribes
 *   - Only when there is a next value
 *   - Only when the observable is not errored or completed
 * error
 *   - Only when someone subscribes
 *   - Only when error occurs
 *   - Only when the observable is not errored or completed
 * complete
 *   - Only when someone subscribes
 *   - Only when the stream is completed
 *   - Also when the user unsubscribes
 *   - Only when the observable is not errored or completed
 */
//# sourceMappingURL=observables.1.js.map