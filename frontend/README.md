# Frontend - Task Manager

This is the React + Vite frontend application for the task management assessment.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

The application will run on `http://localhost:5173`

## Project Structure

```
src/
├── api/
│   └── tasks.js          # API utility functions (you can use these or create your own)
├── components/           # Create your components here
├── App.jsx              # Main app component
├── App.css              # App styles
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## API Helper Functions

The `src/api/tasks.js` file contains helper functions for API calls:
- `fetchTasks()` - Get all tasks
- `fetchTask(id)` - Get a single task
- `createTask(taskData)` - Create a new task
- `updateTask(id, updates)` - Update a task
- `deleteTask(id)` - Delete a task

You can use these functions or create your own API calls using axios.

## Getting Started

1. Make sure the backend is running on `http://localhost:3001`
2. Start the frontend development server
3. Begin implementing the tasks as described in the main README.md

Good luck! 🚀
