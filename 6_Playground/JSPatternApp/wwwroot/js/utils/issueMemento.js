import { IssueManager, Issue } from "./issues.js";

// Memento pattern for undo functionality
export const IssueHistory = {
    history: [],
    maxHistory: 50,
    
    push(state) {
        if (state && Array.isArray(state)) {
            // Deep clone the state
            const clonedState = state.map(issue => issue.clone());
            this.history.push(clonedState);
            
            // Keep history size manageable
            if (this.history.length > this.maxHistory) {
                this.history.shift();
            }
        }
    },
    
    pop() {
        if (this.history.length > 1) {
            this.history.pop(); // Remove current state
            return this.history[this.history.length - 1]; // Return previous state
        }
        return null;
    },
    
    clear() {
        this.history = [];
    }
}

// Auto-save state when issues change
IssueManager.getInstance().addObserver(() => {
    IssueHistory.push(IssueManager.getInstance().issues);
});
