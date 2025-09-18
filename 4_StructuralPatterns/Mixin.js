// TOPIC
// Mixin Pattern in JavaScript

// USE CASES
// - Debugging objects by adding logging functionality
// - Adding utility functions to classes without inheritance
// - Sharing common functionality across unrelated classes

// PROBLEM IT SOLVES
// Allows objects to borrow methods and properties
// from other objects without using inheritance.
// This avoids changing the nature of the original class
// and promotes code reuse and composition.

// FUN FACTS
// - Mixins are a popular pattern in JavaScript
// for code reuse and composition.
// - The term "mixin" comes from the idea of mixing
// multiple sources of behavior into a single object.

// SOLUTION EXAMPLES
// 1) Creating a simple mixin
const loggerMixin = {
    log(message) {
        console.log(`[LOG]: ${message}`);
    }
};

class User {
    constructor(name) {
        this.name = name;
    }
}

// Apply mixin
Object.assign(User.prototype, loggerMixin);

const user = new User("Alice");
user.log("User created"); // [LOG]: User created