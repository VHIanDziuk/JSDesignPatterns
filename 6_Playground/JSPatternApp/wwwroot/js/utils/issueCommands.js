import { IssueManager } from './issues.js';
import { IssueFactory } from './issueFactory.js';
import { IssueHistory } from './issueMemento.js';

export class IssueCommand {
    name;
    args;
    constructor(name, args = {}) {
        this.name = name;
        this.args = args;
    }
}

export const IssueCommands = {
    CREATE: "create",
    UPDATE: "update",
    DELETE: "delete",
    CHANGE_STATUS: "change-status",
    UNDO: "undo",
    FILTER: "filter",
    SEARCH: "search",
    CLEAR_FILTERS: "clear-filters",
    TOGGLE_VIEW: "toggle-view",
    OPEN_FORM: "open-form",
    CLOSE_FORM: "close-form",
    OPEN_EDIT: "open-edit"
}

export const IssueCommandExecutor = {
    execute(command) {
        const manager = IssueManager.getInstance();
        const DOM = globalThis.DOM;

        switch (command.name) {
            case IssueCommands.CREATE:
                const newIssue = IssueFactory.createFromForm(command.args);
                if (newIssue.title.trim() !== '') {
                    manager.add(newIssue);
                    if (DOM.issueForm) {
                        DOM.issueForm.reset();
                    }
                }
                break;

            case IssueCommands.UPDATE:
                const { issueId, updates } = command.args;
                manager.update(issueId, updates);
                break;

            case IssueCommands.DELETE:
                manager.delete(command.args.issueId);
                break;

            case IssueCommands.CHANGE_STATUS:
                const issue = manager.get(command.args.issueId);
                if (issue) {
                    manager.update(command.args.issueId, { status: command.args.newStatus });
                }
                break;

            case IssueCommands.UNDO:
                const previousState = IssueHistory.pop();
                if (previousState) {
                    manager.replaceAll(previousState);
                }
                break;

            case IssueCommands.FILTER:
                if (DOM.renderApp) {
                    DOM.currentFilters = command.args;
                    DOM.renderApp();
                }
                break;

            case IssueCommands.SEARCH:
                if (DOM.renderApp) {
                    DOM.searchQuery = command.args.query;
                    DOM.renderApp();
                }
                break;

            case IssueCommands.CLEAR_FILTERS:
                if (DOM.renderApp) {
                    DOM.currentFilters = {};
                    DOM.searchQuery = "";
                    if (DOM.searchInput) DOM.searchInput.value = "";
                    if (DOM.statusFilter) DOM.statusFilter.value = "";
                    if (DOM.priorityFilter) DOM.priorityFilter.value = "";
                    if (DOM.tagFilter) DOM.tagFilter.value = "";
                    DOM.renderApp();
                }
                break;

            case IssueCommands.TOGGLE_VIEW:
                if (DOM.renderApp) {
                    DOM.currentView = DOM.currentView === 'board' ? 'list' : 'board';
                    sessionStorage.setItem('issueTrackerView', DOM.currentView);
                    DOM.renderApp();
                }
                break;

            case IssueCommands.OPEN_FORM:
                if (DOM.issueFormModal) {
                    DOM.editingIssueId = null;
                    DOM.issueForm.reset();
                    DOM.issueFormModal.showModal();
                }
                break;

            case IssueCommands.CLOSE_FORM:
                if (DOM.issueFormModal) {
                    DOM.issueFormModal.close();
                    DOM.editingIssueId = null;
                }
                break;

            case IssueCommands.OPEN_EDIT:
                const issueToEdit = manager.get(command.args.issueId);
                if (issueToEdit && DOM.issueFormModal) {
                    DOM.editingIssueId = issueToEdit.id;
                    // Populate form with issue data
                    DOM.issueForm.title.value = issueToEdit.title;
                    DOM.issueForm.description.value = issueToEdit.description;
                    DOM.issueForm.status.value = issueToEdit.status;
                    DOM.issueForm.priority.value = issueToEdit.priority;
                    DOM.issueForm.tags.value = issueToEdit.tags.join(', ');
                    DOM.issueForm.dueDate.value = issueToEdit.dueDate ? issueToEdit.dueDate.split('T')[0] : '';
                    DOM.issueFormModal.showModal();
                }
                break;
        }
    }
}
