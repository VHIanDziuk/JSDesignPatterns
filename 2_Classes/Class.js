// TOPIC
// JS Classes, inheritance, and private fields

// CONSIDERATIONS
// state management in classes
// using private fields to encapsulate data
// inheritance, instantiation and other OOP principles

// Setting up a base class for input fields
class BaseInput{
    // these are public fields
    FIELD_TYPES = ['text', 'password', 'email', 'number', 'date'];
    value = '';
}

// Inheriting from BaseInput
class Input extends BaseInput {
    // This is a private field
    #type = 'text'; // Default type

    constructor(type) {
        super();
        if (this.FIELD_TYPES.includes(type)) {
            this.#type = type;
        } else {
            throw new Error(`Invalid input type: ${type}`);
        }
    }

    printType() {
        console.log(`Input type is: ${this.#type}`);
    }
}

// Creating instances of Input class
const textInput = new Input('text');
const emailInput = new Input('email');

textInput.printType(); // Output: Input type is: text
emailInput.printType(); // Output: Input type is: email