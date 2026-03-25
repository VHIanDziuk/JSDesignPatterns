import { observerMixin } from "./mixins.js";

// Issue statuses
export const IssueStatus = {
    NEW: "new",
    OPEN: "open",
    IN_PROGRESS: "in-progress",
    REVIEW: "review",
    CLOSED: "closed"
};

// Issue priorities
export const IssuePriority = {
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high",
    CRITICAL: "critical"
};

// Issue class
export class Issue {
    constructor(data) {
        this.id = data.id || this.generateId();
        this.title = data.title || "";
        this.description = data.description || "";
        this.status = data.status || IssueStatus.NEW;
        this.priority = data.priority || IssuePriority.MEDIUM;
        this.tags = data.tags || [];
        this.createdDate = data.createdDate || new Date().toISOString();
        this.dueDate = data.dueDate || null;
        this.assignee = data.assignee || "myself";
    }

    generateId() {
        return `issue-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    equals(other) {
        return this.id === other.id;
    }

    clone() {
        return new Issue({ ...this });
    }
}

// IssueManager - Singleton pattern
export class IssueManager {
    // Data
    #data = new Map();
    
    get issues() { 
        return Array.from(this.#data.values()); 
    }

    // Singleton
    static instance = null;
    static {
        this.instance = new IssueManager();
    }
    static getInstance() {
        return this.instance;
    }
    constructor() {
        if (IssueManager.instance) {
            throw new Error("Use IssueManager.getInstance() instead.");
        }
    }

    // Issue Management
    add(issue) {
        if (!this.#data.has(issue.id)) {
            this.#data.set(issue.id, issue);
            this.notify();
        }
    }

    update(issueId, updates) {
        const issue = this.#data.get(issueId);
        if (issue) {
            Object.assign(issue, updates);
            this.notify();
        }
    }

    delete(issueId) {
        if (this.#data.has(issueId)) {
            this.#data.delete(issueId);
            this.notify();
        }
    }

    get(issueId) {
        return this.#data.get(issueId);
    }

    getByStatus(status) {
        return this.issues.filter(issue => issue.status === status);
    }

    getByPriority(priority) {
        return this.issues.filter(issue => issue.priority === priority);
    }

    getByTag(tag) {
        return this.issues.filter(issue => issue.tags.includes(tag));
    }

    search(query) {
        const lowerQuery = query.toLowerCase();
        return this.issues.filter(issue => 
            issue.title.toLowerCase().includes(lowerQuery) ||
            issue.description.toLowerCase().includes(lowerQuery) ||
            issue.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
    }

    replaceAll(issues) {
        this.#data.clear();
        issues.forEach(issue => {
            this.#data.set(issue.id, issue);
        });
        this.notify();
    }

    getAllTags() {
        const tags = new Set();
        this.issues.forEach(issue => {
            issue.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags).sort();
    }
}

// Apply Observer mixin
Object.assign(IssueManager.prototype, observerMixin);
