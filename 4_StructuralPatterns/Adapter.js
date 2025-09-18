// TOPIC
// Adapter Pattern in JavaScript

// USE CASES
// - Adapting third-party libraries to fit your application's interface
// - Integrating legacy code with modern systems
// - Enabling two incompatible interfaces to work together

// PROBLEM IT SOLVES
// Allows incompatible interfaces to work together
// by wrapping an existing class with a new interface.

// FUN FACTS
// - The Adapter Pattern is often used in API integrations
// to ensure that the API's interface matches the expected
// interface of the application.

// SOLUTION EXAMPLES
// 1) Object Adapter using composition
class OldSystem {
    specificRequest() {
        return "Old system response";
    }
}

class NewSystem {
    request() {
        return "New system response";
    }
}

class SystemAdapter {
    constructor(system) {
        if(typeof system.specificRequest === 'function') {
            this.oldSystem = system;
        }
        if(typeof system.request === 'function') {
            this.newSystem = system;
        }
    }

    request() {
        if(this.oldSystem) {
            return this.oldSystem.specificRequest();
        }
        if(this.newSystem) {
            return this.newSystem.request();
        }
    }
}

const oldSystem = new OldSystem();
const newSystem = new NewSystem();
const adapterA = new SystemAdapter(oldSystem);
const adapterB = new SystemAdapter(newSystem);

console.log(adapterA.request()); // "Old system response"
console.log(adapterB.request()); // "New system response"