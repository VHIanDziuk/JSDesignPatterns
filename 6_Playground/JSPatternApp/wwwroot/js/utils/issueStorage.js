import { IssueManager, Issue } from "./issues.js";
import { IssueFactory } from "./issueFactory.js";
import { log } from "./debug.js";

const logger = new log();

const manager = IssueManager.getInstance();

export const IssueStorage = {
    STORAGE_KEY: "issueTracker",
    
    load() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                const data = JSON.parse(stored);
                if (Array.isArray(data)) {
                    data.forEach(issueData => {
                        const issue = IssueFactory.createFromJSON(issueData);
                        manager.add(issue);
                    });
                    logger.out(`Loaded ${data.length} issues from storage`);
                }
            }
        } catch (error) {
            logger.out(`Error loading issues: ${error.message}`, 'error');
        }
    },
    
    save() {
        try {
            const issues = manager.issues;
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(issues));
            logger.out(`Saved ${issues.length} issues to storage`);
        } catch (error) {
            logger.out(`Error saving issues: ${error.message}`, 'error');
        }
    },
    
    clear() {
        localStorage.removeItem(this.STORAGE_KEY);
        logger.out('Cleared issue storage');
    }
}

// Auto-save when issues change
manager.addObserver(IssueStorage.save);
