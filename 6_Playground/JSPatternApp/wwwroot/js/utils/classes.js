import { observerMixin } from "./mixins.js";

export class Item {
    constructor(text) {
        this.text = text;
    }
    equals(other) {
        return this.text == other.text;
    }
}

export class List {
    // Data
    #data = new Set();
    get items() { return this.#data }

    // Singleton
    static instance=null;
    static {
        this.instance = new List();
    }
    static getInstance() {
        return this.instance;
    }
    constructor() {
        if (List.instance) {
            throw new Error("Use List.getInstance() instead.");
        }
    }

    // List Behaviour
    add(item) {
        const array = Array.from(this.#data);
        const itemExists = array.filter(t=>t.equals(item)).length>0;
        if (!itemExists) {
            this.#data.add(item);
            this.notify();
        }
    }
    delete(item) {
        const array = Array.from(this.#data);
        const itemToDelete = array.filter(t=>t.text==item);
        this.#data.delete(itemToDelete[0]);
        this.notify();
    }
    find(text) {
        const array = Array.from(this.#data);
        return array.find(i=>i.text==text);
    }
    replaceList(list) {
        this.#data = list;
        this.notify();
    }
}

// Apply Observer mixin
Object.assign(List.prototype, observerMixin);