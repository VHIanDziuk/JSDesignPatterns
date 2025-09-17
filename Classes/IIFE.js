// TOPIC
// JS Immediately Invoked Function Expression (IIFE)
// Immediately Invoked Function Expression (IIFE) in JavaScript to 
// create a private scope for variables and functions. This pattern 
// helps encapsulate code, preventing variables and functions from 
// polluting the global scope, and is often used to simulate modules 
// or private data before ES6 modules and classes were introduced.

// CONSIDERATIONS
// encapsulation of data across shared views and view components
// singleton pattern usage with IIFE when class instances are not needed

// Using IIFE to create a module-like structure
const MyModule = (function() {
    
    // Private variable
    let privateVar = 'I am private';
    var anotherPrivateVar = 42;

    // Public API
    return {
        getPrivateVar: function() {
            return privateVar;
        }
    };
})();

console.log('Output: ', MyModule.getPrivateVar()); // Output: I am private

// The IIFE pattern encapsulates anotherPrivateVar, 
// protecting against large function scope encapsulation for var declarations
// console.log(anotherPrivateVar); // ReferenceError: anotherPrivateVar is not defined
console.log(MyModule.anotherPrivateVar); // undefined
