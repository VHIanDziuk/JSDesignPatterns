// TOPIC
// Command Pattern in JavaScript

// USE CASES
// - Managing actions of your application

// PROBLEM IT SOLVES
// It decouples request senders from request handlers, 
// allowing for more flexible and reusable code.

// FUN FACTS
// - The Command Pattern is commonly used in GUI libraries
// to handle user actions.

// SOLUTION EXAMPLES
// Example: A simple command pattern implementation in JavaScript

// Command Interface
class Command {
    execute() {}
}

/*
    Concrete commands
*/
class LightOnCommand extends Command {
    constructor(light) {
        super();
        this.light = light;
    }

    execute() {
        this.light.turnOn();
    }
}

class LightOffCommand extends Command {
    constructor(light) {
        super();
        this.light = light;
    }

    execute() {
        this.light.turnOff();
    }
}

// Receiver
class Light {
    turnOn() {
        console.log("Light is ON");
    }

    turnOff() {
        console.log("Light is OFF");
    }
}

// Invoker
class RemoteControl {
    submit(command) {
        command.execute();
    }
}

// Client code
const light = new Light();
const lightOn = new LightOnCommand(light);
const lightOff = new LightOffCommand(light);
const remote = new RemoteControl();

remote.submit(lightOn);
remote.submit(lightOff);
