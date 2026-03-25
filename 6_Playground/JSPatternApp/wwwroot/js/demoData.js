// Demo Data Script
// Run this in the browser console on the Issue Tracker page to create sample issues

import { IssueFactory } from './utils/issueFactory.js';
import { IssueManager, IssueStatus, IssuePriority } from './utils/issues.js';
import { IssueCommand, IssueCommands, IssueCommandExecutor } from './utils/issueCommands.js';

const demoIssues = [
    {
        title: "Setup development environment",
        description: "Install Node.js, VS Code, and all required extensions for the project.",
        status: IssueStatus.CLOSED,
        priority: IssuePriority.HIGH,
        tags: ["setup", "environment"],
        dueDate: "2026-03-20"
    },
    {
        title: "Implement user authentication",
        description: "Add login and registration functionality with JWT tokens.",
        status: IssueStatus.IN_PROGRESS,
        priority: IssuePriority.CRITICAL,
        tags: ["security", "feature", "backend"],
        dueDate: "2026-03-28"
    },
    {
        title: "Fix responsive layout on mobile",
        description: "Navigation menu doesn't collapse properly on mobile devices.",
        status: IssueStatus.OPEN,
        priority: IssuePriority.HIGH,
        tags: ["bug", "ui", "mobile"],
        dueDate: "2026-03-26"
    },
    {
        title: "Add dark mode support",
        description: "Implement dark mode theme with toggle switch in settings.",
        status: IssueStatus.NEW,
        priority: IssuePriority.MEDIUM,
        tags: ["enhancement", "ui"],
        dueDate: "2026-04-05"
    },
    {
        title: "Write API documentation",
        description: "Create comprehensive API documentation using Swagger/OpenAPI.",
        status: IssueStatus.REVIEW,
        priority: IssuePriority.MEDIUM,
        tags: ["documentation", "api"],
        dueDate: "2026-03-30"
    },
    {
        title: "Optimize database queries",
        description: "Some queries are running slow. Add indexes and optimize N+1 problems.",
        status: IssueStatus.OPEN,
        priority: IssuePriority.HIGH,
        tags: ["performance", "database", "backend"],
        dueDate: "2026-04-01"
    },
    {
        title: "Update dependencies",
        description: "Update all npm packages to latest stable versions.",
        status: IssueStatus.NEW,
        priority: IssuePriority.LOW,
        tags: ["maintenance", "dependencies"],
        dueDate: null
    },
    {
        title: "Add unit tests for user service",
        description: "Increase test coverage for user service to at least 80%.",
        status: IssueStatus.IN_PROGRESS,
        priority: IssuePriority.MEDIUM,
        tags: ["testing", "quality"],
        dueDate: "2026-03-27"
    },
    {
        title: "Fix memory leak in dashboard",
        description: "Dashboard component causes memory leak after 10 minutes of usage.",
        status: IssueStatus.OPEN,
        priority: IssuePriority.CRITICAL,
        tags: ["bug", "performance", "frontend"],
        dueDate: "2026-03-25"
    },
    {
        title: "Implement email notifications",
        description: "Send email notifications for important events using SendGrid.",
        status: IssueStatus.REVIEW,
        priority: IssuePriority.MEDIUM,
        tags: ["feature", "notifications", "backend"],
        dueDate: "2026-04-02"
    },
    {
        title: "Create user onboarding flow",
        description: "Add guided tour for new users showing key features.",
        status: IssueStatus.NEW,
        priority: IssuePriority.LOW,
        tags: ["ux", "feature"],
        dueDate: null
    },
    {
        title: "Security audit",
        description: "Perform comprehensive security audit and fix vulnerabilities.",
        status: IssueStatus.NEW,
        priority: IssuePriority.CRITICAL,
        tags: ["security", "audit"],
        dueDate: "2026-04-10"
    }
];

export function loadDemoData() {
    const manager = IssueManager.getInstance();
    
    console.log('Loading demo data...');
    
    demoIssues.forEach((issueData, index) => {
        setTimeout(() => {
            const issue = IssueFactory.create(issueData);
            const cmd = new IssueCommand(IssueCommands.CREATE, issueData);
            manager.add(issue);
            console.log(`Created: ${issue.title}`);
        }, index * 100);
    });
    
    setTimeout(() => {
        console.log(`✅ Successfully loaded ${demoIssues.length} demo issues!`);
    }, demoIssues.length * 100 + 500);
}

export function clearAllIssues() {
    const manager = IssueManager.getInstance();
    const allIssues = manager.issues;
    
    allIssues.forEach(issue => {
        manager.delete(issue.id);
    });
    
    console.log('✅ All issues cleared!');
}

// Auto-export to window for easy console access
window.loadDemoData = loadDemoData;
window.clearAllIssues = clearAllIssues;

console.log('Demo utilities loaded! Use:');
console.log('  loadDemoData() - Load sample issues');
console.log('  clearAllIssues() - Clear all issues');
