import { Issue, IssueStatus, IssuePriority } from "./issues.js";

// Factory pattern for creating issues
export class IssueFactory {
    static create(data) {
        return new Issue(data);
    }

    static createFromForm(formData) {
        const tags = formData.tags 
            ? formData.tags.split(',').map(t => t.trim()).filter(t => t)
            : [];

        return new Issue({
            title: formData.title,
            description: formData.description,
            status: formData.status || IssueStatus.NEW,
            priority: formData.priority || IssuePriority.MEDIUM,
            tags: tags,
            dueDate: formData.dueDate || null
        });
    }

    static createFromJSON(json) {
        return new Issue(json);
    }

    static clone(issue) {
        return issue.clone();
    }
}
