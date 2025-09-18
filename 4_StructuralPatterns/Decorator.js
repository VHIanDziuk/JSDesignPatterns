// TOPIC
// Decorator Pattern in JavaScript

// USE CASES
// - Adding new functionality to a standardized object (button, input field, etc.)
// - Enhancing third-party libraries without modifying their source code
// - Implementing cross-cutting concerns (logging, caching, authentication)
// - Wrapping API responses to format or process data

// PROBLEM IT SOLVES
// Allows behavior to be added to individual 
// objects, either statically or dynamically, 
// without affecting the behavior of other objects 
// from the same class.

// FUN FACTS
// - The Decorator Pattern is widely used in React.js
// with Higher-Order Components (HOCs) and hooks to
// enhance component functionality.
// - The Decorator Pattern is named after the 
// concept of decorating an object with additional 
// features, similar to how you might decorate a 
// cake or a room.


// SOLUTION EXAMPLES
// 1) Creating a simple decorator using inheritance
class Button {
    #b;
    render() {
        // this.#b = $("#someCSSID").dxButton('instance')
    }
}

class DecoratedButton extends Button {
    render() {
        super.render();
        // Decorate with additional functionality
    }
}
