# Issue Tracker Application

## Overview
A personal issue tracking application built using JavaScript design patterns and ASP.NET Core. The application demonstrates practical implementation of Creational, Structural, and Behavioral design patterns.

## Features

### Core Functionality
- ✅ Create, Read, Update, Delete (CRUD) operations for issues
- ✅ Issue status workflow: New → Open → In Progress → Review → Closed
- ✅ Priority levels: Low, Medium, High, Critical
- ✅ Tag-based categorization
- ✅ Search and filter capabilities
- ✅ Undo/Redo functionality
- ✅ Local storage persistence (no database required)
- ✅ Responsive design for mobile and desktop

### Views
1. **Board View** (Kanban-style)
   - Drag and drop issues between status columns
   - Visual organization by status
   - Issue count per column

2. **List View**
   - Compact list display
   - All issues in a single scrollable view
   - Status badges visible

## Design Patterns Implemented

### Creational Patterns
- **Singleton Pattern**: `IssueManager` class ensures only one instance manages all issues
- **Factory Pattern**: `IssueFactory` provides consistent issue creation from various data sources

### Structural Patterns
- **Mixin Pattern**: `observerMixin` adds observer capabilities to classes without inheritance

### Behavioral Patterns
- **Observer Pattern**: Automatic UI updates when issues change
- **Command Pattern**: All user actions (create, update, delete) are encapsulated as commands
- **Memento Pattern**: Undo functionality via state snapshots

## Architecture

### File Structure
```
wwwroot/js/
├── issueTracker.js           # Main application logic
└── utils/
    ├── issues.js              # Issue and IssueManager classes
    ├── issueFactory.js        # Factory for creating issues
    ├── issueCommands.js       # Command pattern implementation
    ├── issueMemento.js        # Memento pattern for undo
    ├── issueStorage.js        # LocalStorage persistence
    ├── components.js          # Reusable UI components
    ├── mixins.js              # Observer mixin
    └── debug.js               # Logging utilities

Views/Home/
└── Issues.cshtml              # Main view template

wwwroot/css/
└── issueTracker.css           # Application styles
```

### Component Architecture

#### IssueManager (Singleton + Observer)
Central hub for all issue operations. Notifies observers when state changes.

#### IssueFactory
Creates Issue objects from:
- Form data
- JSON (localStorage)
- Raw data objects

#### Command System
All actions are commands:
- `CREATE` - Add new issue
- `UPDATE` - Modify existing issue
- `DELETE` - Remove issue
- `CHANGE_STATUS` - Update issue status
- `UNDO` - Revert last change
- `FILTER` - Apply filters
- `SEARCH` - Search issues
- `TOGGLE_VIEW` - Switch between board/list view

#### UI Components
Reusable component factory creates:
- Issue cards (draggable in board view)
- Status columns (drop zones)
- Badges (priority, status, tags)
- Filter bar

## Storage Strategy

### LocalStorage
- **Key**: `issueTracker`
- **Purpose**: Persistent storage of all issues
- **Auto-save**: Triggered on every issue change via Observer pattern

### SessionStorage
- **Keys**: 
  - `issueTrackerView` - Current view preference (board/list)
  - `issueSearchQuery` - Current search query
- **Purpose**: Temporary UI state that resets per session

## Usage

### Accessing the Application
1. Navigate to `http://localhost:5043/Home/Issues`
2. Or click "📋 Issue Tracker" in the navigation menu

### Creating an Issue
- Click "+ New Issue" button
- Or press `Ctrl+N`
- Fill in the form:
  - Title (required)
  - Description
  - Status
  - Priority
  - Tags (comma-separated)
  - Due Date

### Managing Issues
- **Edit**: Click the ✏️ icon on any issue card
- **Delete**: Click the 🗑️ icon (with confirmation)
- **Change Status**: Drag and drop to different columns (board view only)
- **Undo**: Press `Ctrl+Z` or use undo button

### Filtering & Search
- **Search**: Type in search box to filter by title, description, or tags
- **Status Filter**: Select from dropdown
- **Priority Filter**: Select from dropdown
- **Tag Filter**: Select from available tags
- **Clear Filters**: Reset all filters

### Keyboard Shortcuts
- `Ctrl+N` - Create new issue
- `Ctrl+B` - Toggle between board and list view
- `Ctrl+Z` - Undo last action
- `Esc` - Close dialog/form

## Technical Details

### Pattern Benefits

1. **Singleton (IssueManager)**
   - Single source of truth for all issues
   - Prevents data inconsistency
   - Easy access from anywhere

2. **Observer**
   - Automatic UI updates
   - Decoupled components
   - Multiple subscribers (storage, history, UI)

3. **Command**
   - Undo/redo capabilities
   - Action logging
   - Testable operations
   - Easy to extend

4. **Memento**
   - State history
   - Undo functionality
   - No complex state management

5. **Factory**
   - Consistent object creation
   - Validation in one place
   - Easy to modify creation logic

6. **Mixin**
   - Reusable observer functionality
   - No inheritance hierarchy
   - Composition over inheritance

### Reusable Components

The `UIComponents` utility provides methods to create:
- `createIssueCard()` - Issue card with actions
- `createStatusColumn()` - Kanban column with drag/drop
- `createBadge()` - Styled badge component
- `createFilterBar()` - Complete filter interface

Benefits:
- Consistent UI
- DRY principle
- Easy to maintain
- Unit testable

## Future Enhancements

Potential additions:
- [ ] Multiple users/assignees
- [ ] Comments on issues
- [ ] File attachments
- [ ] Time tracking
- [ ] Email notifications
- [ ] Export to CSV/JSON
- [ ] Import from other systems
- [ ] Custom status workflows
- [ ] Issue relationships (blocks, relates to)
- [ ] Sprint/milestone management
- [ ] Analytics dashboard
- [ ] Dark mode
- [ ] PWA support for offline use

## Learning Objectives Demonstrated

✅ Practical application of design patterns
✅ Separation of concerns
✅ Component-based architecture
✅ State management
✅ Event-driven programming
✅ Browser storage APIs
✅ Drag and drop API
✅ Responsive design
✅ Accessibility considerations
✅ Clean code principles

## Notes

- All data is stored locally in the browser (localStorage)
- No backend database required
- Data persists across page refreshes
- Clearing browser data will delete all issues
- Session preferences (view mode, search) reset when browser closes
