// TOPIC
// Factory Pattern in JavaScript

// USE CASES
// - UI element creation
// - Complex notification systems

// PROBLEM IT SOLVES
// Object creation logic can become complex and scattered across 
// the codebase. The Factory Pattern provides a way to 
// encapsulate this logic, making it easier to manage and maintain.

// SOLUTION EXAMPLES
// 1) Creating a factory function for object creation
function Animal(type, sound, quirk) {
    this.type = type;
    this.sound = sound;
    this.quirk = quirk;
}

function createAnimal(type, sound) {
    return new Animal(type, sound);
}

function createQuirkyAnimal(type, sound, quirk) {
    return new Animal(type, sound, quirk);
}


const duck = createAnimal("Duck", "Quack");
const quirk = () => {
    console.log("I lay eggs but I'm a mammal!");
}
const platypus = createQuirkyAnimal("Platypus", "Pshsspsasahasdh", quirk);

console.log(duck.sound); // Quack
console.log(platypus.sound); // Pshsspsasahasdh
platypus.quirk(); // I lay eggs but I'm a mammal!


// 2) Using a class-based factory
class Car {
    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
    }

    displayInfo() {
        console.log(`Car: ${this.brand} ${this.model}`);
    }
}

class CarFactory {
    static createCar(brand, model) {
        return new Car(brand, model);
    }
}

const myCar = CarFactory.createCar("Toyota", "Corolla");
myCar.displayInfo(); // Car: Toyota Corolla 