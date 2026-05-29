# Kanban Board

A responsive Kanban board for managing IT tasks. The project is built with React, Vite, Material UI, React Router, and React Context for global state management.

## Tech Stack

- React 19
- Vite
- Material UI v9
- MUI Icons
- React Router v6
- React Context
- date-fns
- Fixel Text font

## Features

- Kanban board with Todo, In Progress, and Done columns.
- Status filter with an additional All Tasks view.
- Task cards with title, description, tags, priority, deadline, subtask progress, and assignee.
- Task status updates through a card action menu.
- Task details page available at `/task/:id`.
- Editable task title, description, status, priority, and assignee.
- Subtask checklist, tags, and comments.
- Mock-only data with task persistence in `localStorage`.
- Light and dark themes.
- Ukrainian and English UI language switcher.
- Responsive mobile and desktop layouts.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Vite will print the local app URL in the terminal.

## Available Scripts

```bash
npm run dev
```

Starts the local development server.

```bash
npm run build
```

Builds the production version.

```bash
npm run preview
```

Serves the production build locally.

```bash
npm run lint
```

Runs ESLint checks.

## Data

All application data is mock data stored in `src/data/mockData.js`. After the first run, tasks are persisted in `localStorage`, so board changes remain after a page refresh.

To reset the board to the initial mock data, run this in the browser console:

```js
localStorage.removeItem('kanban_tasks')
location.reload()
```

## AI Usage

I used Codex as an AI coding assistant during the implementation of this project. It helped with project structure, mock data generation, React Context logic, Material UI styling, responsive layout refinements, and final checks against the technical requirements.
