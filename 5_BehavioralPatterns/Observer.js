// TOPIC
// Observer Pattern in JavaScript (Publish/Subscribe Pattern, aka Pub/Sub)

// USE CASES
// - Implementing event handling systems
// - Creating reactive programming models
// - Building publish/subscribe mechanisms

// PROBLEM IT SOLVES
// Allows a object (subject) to notify other objects (observers) 
// about changes without requiring them to be tightly coupled.

// FUN FACTS
// - If you've ever used event listeners in JavaScript, 
// you've used the Observer pattern!
// - The pattern is widely used in frameworks like React 
// and Angular for state management.

// SOLUTION EXAMPLES
// 1) Simple Observer Implementation
class Subject {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }

    update(data) {
        console.log(`Observer ${this.name} received data: ${data}`);
    }
}

// Usage
const subject = new Subject();
const observer1 = new Observer("A");
const observer2 = new Observer("B");

subject.subscribe(observer1);
subject.subscribe(observer2);

subject.notify("Hello Observers!");