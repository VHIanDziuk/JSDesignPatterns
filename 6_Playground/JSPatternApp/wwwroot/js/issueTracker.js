import { log } from "./utils/debug.js";
import { IssueManager, IssueStatus } from './utils/issues.js';
import { IssueCommand, IssueCommands, IssueCommandExecutor } from './utils/issueCommands.js';
import { IssueStorage } from './utils/issueStorage.js';
import { UIComponents } from './utils/components.js';

const logger = new log();
logger.out('Issue Tracker loaded');

// Global DOM references
globalThis.DOM = {
    currentView: 'board',
    currentFilters: {},
    searchQuery: '',
    editingIssueId: null
};

const DOM = globalThis.DOM;

// Filter and search logic
function getFilteredIssues() {
    const manager = IssueManager.getInstance();
    let issues = manager.issues;

    // Apply search
    if (DOM.searchQuery.trim() !== '') {
        issues = manager.search(DOM.searchQuery);
    }

    // Apply filters
    if (DOM.currentFilters.status) {
        issues = issues.filter(issue => issue.status === DOM.currentFilters.status);
    }
    if (DOM.currentFilters.priority) {
        issues = issues.filter(issue => issue.priority === DOM.currentFilters.priority);
    }
    if (DOM.currentFilters.tag) {
        issues = issues.filter(issue => issue.tags.includes(DOM.currentFilters.tag));
    }

    return issues;
}

// Render board view
function renderBoardView(issues) {
    DOM.contentArea.innerHTML = '';
    const boardContainer = document.createElement('div');
    boardContainer.className = 'board-view';

    Object.values(IssueStatus).forEach(status => {
        const statusIssues = issues.filter(issue => issue.status === status);
        const column = UIComponents.createStatusColumn(status, statusIssues);
        boardContainer.appendChild(column);
    });

    DOM.contentArea.appendChild(boardContainer);
}

// Render list view
function renderListView(issues) {
    DOM.contentArea.innerHTML = '';
    const listContainer = document.createElement('div');
    listContainer.className = 'list-view';

    if (issues.length === 0) {
        listContainer.innerHTML = '<p class="empty-state">No issues found</p>';
    } else {
        issues.forEach(issue => {
            listContainer.appendChild(UIComponents.createIssueCard(issue, 'list'));
        });
    }

    DOM.contentArea.appendChild(listContainer);
}

// Main render function
function renderApp() {
    const issues = getFilteredIssues();
    
    // Update stats
    updateStats(issues);

    // Render appropriate view
    if (DOM.currentView === 'board') {
        renderBoardView(issues);
    } else {
        renderListView(issues);
    }

    // Update view toggle button
    if (DOM.viewToggleBtn) {
        DOM.viewToggleBtn.textContent = DOM.currentView === 'board' ? '📋 List View' : '📊 Board View';
    }
}

// Update statistics
function updateStats(issues) {
    if (!DOM.statsContainer) return;

    const stats = {
        total: issues.length,
        new: issues.filter(i => i.status === IssueStatus.NEW).length,
        open: issues.filter(i => i.status === IssueStatus.OPEN).length,
        inProgress: issues.filter(i => i.status === IssueStatus.IN_PROGRESS).length,
        review: issues.filter(i => i.status === IssueStatus.REVIEW).length,
        closed: issues.filter(i => i.status === IssueStatus.CLOSED).length,
        critical: issues.filter(i => i.priority === 'critical').length,
        high: issues.filter(i => i.priority === 'high').length
    };

    DOM.statsContainer.innerHTML = `
        <div class="stat-item">
            <div class="stat-value">${stats.total}</div>
            <div class="stat-label">Total</div>
        </div>
        <div class="stat-item">
            <div class="stat-value">${stats.inProgress}</div>
            <div class="stat-label">In Progress</div>
        </div>
        <div class="stat-item">
            <div class="stat-value">${stats.review}</div>
            <div class="stat-label">Review</div>
        </div>
        <div class="stat-item">
            <div class="stat-value">${stats.closed}</div>
            <div class="stat-label">Closed</div>
        </div>
        <div class="stat-item priority-critical">
            <div class="stat-value">${stats.critical}</div>
            <div class="stat-label">Critical</div>
        </div>
        <div class="stat-item priority-high">
            <div class="stat-value">${stats.high}</div>
            <div class="stat-label">High</div>
        </div>
    `;
}

// Setup filter bar
function setupFilters() {
    const manager = IssueManager.getInstance();
    const allTags = manager.getAllTags();
    
    DOM.filterContainer.innerHTML = UIComponents.createFilterBar(allTags);

    // Get filter elements
    DOM.searchInput = document.getElementById('search-input');
    DOM.statusFilter = document.getElementById('status-filter');
    DOM.priorityFilter = document.getElementById('priority-filter');
    DOM.tagFilter = document.getElementById('tag-filter');
    DOM.clearFiltersBtn = document.getElementById('clear-filters-btn');

    // Restore search from session storage
    const savedSearch = sessionStorage.getItem('issueSearchQuery');
    if (savedSearch) {
        DOM.searchQuery = savedSearch;
        DOM.searchInput.value = savedSearch;
    }

    // Add event listeners
    DOM.searchInput.addEventListener('input', (e) => {
        DOM.searchQuery = e.target.value;
        sessionStorage.setItem('issueSearchQuery', DOM.searchQuery);
        const cmd = new IssueCommand(IssueCommands.SEARCH, { query: DOM.searchQuery });
        IssueCommandExecutor.execute(cmd);
    });

    DOM.statusFilter.addEventListener('change', (e) => {
        DOM.currentFilters.status = e.target.value;
        renderApp();
    });

    DOM.priorityFilter.addEventListener('change', (e) => {
        DOM.currentFilters.priority = e.target.value;
        renderApp();
    });

    DOM.tagFilter.addEventListener('change', (e) => {
        DOM.currentFilters.tag = e.target.value;
        renderApp();
    });

    DOM.clearFiltersBtn.addEventListener('click', () => {
        const cmd = new IssueCommand(IssueCommands.CLEAR_FILTERS);
        IssueCommandExecutor.execute(cmd);
    });
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    logger.out('DOM Content Loaded');

    // Get DOM references
    DOM.contentArea = document.getElementById('content-area');
    DOM.filterContainer = document.getElementById('filter-container');
    DOM.statsContainer = document.getElementById('stats-container');
    DOM.createIssueBtn = document.getElementById('create-issue-btn');
    DOM.viewToggleBtn = document.getElementById('view-toggle-btn');
    DOM.issueFormModal = document.getElementById('issue-form-modal');
    DOM.issueForm = document.getElementById('issue-form');
    DOM.cancelFormBtn = document.getElementById('cancel-form-btn');

    // Restore view preference
    const savedView = sessionStorage.getItem('issueTrackerView');
    if (savedView) {
        DOM.currentView = savedView;
    }

    // Setup render function globally for commands
    DOM.renderApp = renderApp;

    // Load data from storage
    IssueStorage.load();

    // Setup filters
    setupFilters();

    // Event listeners
    DOM.createIssueBtn.addEventListener('click', () => {
        const cmd = new IssueCommand(IssueCommands.OPEN_FORM);
        IssueCommandExecutor.execute(cmd);
    });

    DOM.viewToggleBtn.addEventListener('click', () => {
        const cmd = new IssueCommand(IssueCommands.TOGGLE_VIEW);
        IssueCommandExecutor.execute(cmd);
    });

    // Form submission
    DOM.issueForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            title: DOM.issueForm.title.value,
            description: DOM.issueForm.description.value,
            status: DOM.issueForm.status.value,
            priority: DOM.issueForm.priority.value,
            tags: DOM.issueForm.tags.value,
            dueDate: DOM.issueForm.dueDate.value
        };

        if (DOM.editingIssueId) {
            // Update existing issue
            const cmd = new IssueCommand(IssueCommands.UPDATE, {
                issueId: DOM.editingIssueId,
                updates: formData
            });
            IssueCommandExecutor.execute(cmd);
            DOM.editingIssueId = null;
        } else {
            // Create new issue
            const cmd = new IssueCommand(IssueCommands.CREATE, formData);
            IssueCommandExecutor.execute(cmd);
        }

        DOM.issueFormModal.close();
    });

    DOM.cancelFormBtn.addEventListener('click', () => {
        const cmd = new IssueCommand(IssueCommands.CLOSE_FORM);
        IssueCommandExecutor.execute(cmd);
    });

    // Initial render
    renderApp();

    // Re-render when issues change
    IssueManager.getInstance().addObserver(renderApp);
    IssueManager.getInstance().addObserver(setupFilters);
});

// Keyboard shortcuts
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'n') {
        event.preventDefault();
        const cmd = new IssueCommand(IssueCommands.OPEN_FORM);
        IssueCommandExecutor.execute(cmd);
    }
    if (event.ctrlKey && event.key === 'z') {
        event.preventDefault();
        const cmd = new IssueCommand(IssueCommands.UNDO);
        IssueCommandExecutor.execute(cmd);
    }
    if (event.ctrlKey && event.key === 'b') {
        event.preventDefault();
        const cmd = new IssueCommand(IssueCommands.TOGGLE_VIEW);
        IssueCommandExecutor.execute(cmd);
    }
    if (event.key === 'Escape' && DOM.issueFormModal && DOM.issueFormModal.open) {
        const cmd = new IssueCommand(IssueCommands.CLOSE_FORM);
        IssueCommandExecutor.execute(cmd);
    }
});
