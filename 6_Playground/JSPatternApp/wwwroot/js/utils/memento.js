import { List } from "./classes.js"

export const History = {
    history: [],
    push(state) { 
        if (state) {
            this.history.push(new Set([...state])) 
        }
    },
    pop() { 
        if (this.history.length>1) {
            this.history.pop();
            return this.history.pop();
        }
     }
}

List.getInstance().addObserver(()=> {
    History.push(List.getInstance().items);
})