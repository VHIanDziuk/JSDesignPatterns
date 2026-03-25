import { IssueStatus, IssuePriority } from './issues.js';
import { IssueCommand, IssueCommands, IssueCommandExecutor } from './issueCommands.js';

// Reusable UI Components
export const UIComponents = {
    
    // Create an issue card
    createIssueCard(issue, viewType = 'board') {
        const card = document.createElement('div');
        card.className = `issue-card priority-${issue.priority} ${viewType === 'list' ? 'list-view' : ''}`;
        card.dataset.issueId = issue.id;
        
        const priorityBadge = this.createBadge(issue.priority, 'priority');
        const statusBadge = viewType === 'list' ? this.createBadge(issue.status, 'status') : '';
        
        const tagsHTML = issue.tags.length > 0 
            ? `<div class="issue-tags mt-2">
                ${issue.tags.map(tag => this.createBadge(tag, 'tag')).join('')}
               </div>`
            : '';
        
        const dueDateHTML = issue.dueDate 
            ? `<div class="issue-due-date mt-2">
                <small>📅 ${this.formatDate(issue.dueDate)}</small>
               </div>`
            : '';
        
        const description = issue.description 
            ? `<p class="issue-description">${this.escapeHtml(issue.description)}</p>`
            : '';

        card.innerHTML = `
            <div class="issue-card-header">
                <div>
                    ${priorityBadge}
                    ${statusBadge}
                </div>
                <div class="issue-card-actions">
                    <button class="btn-icon edit-issue-btn" title="Edit" data-issue-id="${issue.id}">
                        ✏️
                    </button>
                    <button class="btn-icon delete-issue-btn" title="Delete" data-issue-id="${issue.id}">
                        🗑️
                    </button>
                </div>
            </div>
            <h4 class="issue-title">${this.escapeHtml(issue.title)}</h4>
            ${description}
            ${tagsHTML}
            ${dueDateHTML}
            <div class="issue-metadata">
                <small>Created: ${this.formatDate(issue.createdDate)}</small>
            </div>
        `;

        // Add event listeners
        card.querySelector('.delete-issue-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm('Are you sure you want to delete this issue?')) {
                const cmd = new IssueCommand(IssueCommands.DELETE, { issueId: issue.id });
                IssueCommandExecutor.execute(cmd);
            }
        });

        card.querySelector('.edit-issue-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            const cmd = new IssueCommand(IssueCommands.OPEN_EDIT, { issueId: issue.id });
            IssueCommandExecutor.execute(cmd);
        });

        // Make card draggable for board view
        if (viewType === 'board') {
            card.draggable = true;
            card.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('issueId', issue.id);
                card.classList.add('dragging');
            });
            card.addEventListener('dragend', () => {
                card.classList.remove('dragging');
            });
        }

        return card;
    },

    // Create a status column for board view
    createStatusColumn(status, issues) {
        const column = document.createElement('div');
        column.className = 'status-column';
        column.dataset.status = status;
        
        const statusLabel = status.split('-').map(w => 
            w.charAt(0).toUpperCase() + w.slice(1)
        ).join(' ');
        
        column.innerHTML = `
            <div class="status-column-header">
                <h3>${statusLabel}</h3>
                <span class="issue-count">${issues.length}</span>
            </div>
            <div class="status-column-content" data-status="${status}">
                ${issues.length === 0 ? '<p class="empty-state">No issues</p>' : ''}
            </div>
        `;

        const content = column.querySelector('.status-column-content');
        
        // Add drop zone functionality
        content.addEventListener('dragover', (e) => {
            e.preventDefault();
            content.classList.add('drag-over');
        });
        
        content.addEventListener('dragleave', () => {
            content.classList.remove('drag-over');
        });
        
        content.addEventListener('drop', (e) => {
            e.preventDefault();
            content.classList.remove('drag-over');
            
            const issueId = e.dataTransfer.getData('issueId');
            if (issueId) {
                const cmd = new IssueCommand(IssueCommands.CHANGE_STATUS, {
                    issueId: issueId,
                    newStatus: status
                });
                IssueCommandExecutor.execute(cmd);
            }
        });

        // Add issue cards
        issues.forEach(issue => {
            content.appendChild(this.createIssueCard(issue, 'board'));
        });

        return column;
    },

    // Create a badge
    createBadge(text, type = 'default') {
        return `<span class="badge badge-${type} badge-${text.toLowerCase()}">${this.escapeHtml(text)}</span>`;
    },

    // Create filter bar
    createFilterBar(allTags) {
        return `
            <div class="filter-bar">
                <div class="filter-group">
                    <input type="text" 
                           id="search-input" 
                           class="form-control" 
                           placeholder="🔍 Search issues..." />
                </div>
                <div class="filter-group">
                    <select id="status-filter" class="form-control">
                        <option value="">All Statuses</option>
                        ${Object.values(IssueStatus).map(status => 
                            `<option value="${status}">${this.formatStatus(status)}</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="filter-group">
                    <select id="priority-filter" class="form-control">
                        <option value="">All Priorities</option>
                        ${Object.values(IssuePriority).map(priority => 
                            `<option value="${priority}">${this.capitalize(priority)}</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="filter-group">
                    <select id="tag-filter" class="form-control">
                        <option value="">All Tags</option>
                        ${allTags.map(tag => 
                            `<option value="${tag}">${this.escapeHtml(tag)}</option>`
                        ).join('')}
                    </select>
                </div>
                <button id="clear-filters-btn" class="btn btn-secondary">Clear Filters</button>
            </div>
        `;
    },

    // Utility methods
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    },

    formatStatus(status) {
        return status.split('-').map(w => 
            w.charAt(0).toUpperCase() + w.slice(1)
        ).join(' ');
    },

    capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
};
