// TOPIC
// Momento Pattern in JavaScript

// USE CASES
// - Implementing undo/redo functionality
// - Saving and restoring the state of an object
// - Creating checkpoints in long-running processes

// PROBLEM IT SOLVES
// The Memento Pattern allows an object to capture 
// its internal state and save it externally, so it 
// can be restored later without exposing
// its internal structure.


// FUN FACTS
// - The Memento Pattern is often used in text editors
// to implement undo/redo functionality.
// - It can also be found in game development for saving
// and loading game states.

// SOLUTION EXAMPLES
// 1) Text Editor
class TextEditor {
    constructor() {
        this.content = "";
        this.history = [];
    }

    type(text) {
        this.saveState();
        this.content += text;
    }

    saveState() {
        this.history.push(this.content);
    }

    undo() {
        if (this.history.length > 0) {
            this.content = this.history.pop();
        }
    }

    getContent() {
        return this.content;
    }
}