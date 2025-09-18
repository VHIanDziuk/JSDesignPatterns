// TOPIC
// Singleton Pattern in JavaScript

// USE CASES
// - Managing shared resources (state management, configuration)
// - Logging services
// - Caching mechanisms

// PROBLEM IT SOLVES
// Ensures a class has only one instance and provides 
// a global point of access to it.

// SOLUTION EXAMPLES
// 1) Creating a singleton using a simple object
const SimpleSingleton = {
    value: 0,
    setValue(newValue) {
        this.value = newValue;
    },
    getValue() {
        return this.value;
    }
};

// 2) Using a closure to encapsulate the instance (IIFE)
const Singleton = (function() {
    let instance;
    let value = 0;

    function setValue(newValue) {
        value = newValue;
    }

    function createInstance() {
        const obj = new Object("I am the instance");
        return obj;
    }

    return {
        setValue: setValue,
        getValue: () => value,
        getInstance: function() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();


const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

console.log(instance1); 
console.log(instance2); 
console.log(instance1 === instance2); // true

// Using the singleton to manage a shared value
Singleton.setValue(42);
console.log(Singleton.getValue());
