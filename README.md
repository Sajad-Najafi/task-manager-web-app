# React Frontend Developer - Technical Assessment

Welcome to the DecryptCode React Frontend Developer technical assessment! This repository contains a task management application with a partially implemented backend and a frontend that needs to be completed.

## 📋 Overview

This assessment is designed to evaluate your React.js skills, understanding of modern frontend development practices, and ability to work with APIs. The backend is already implemented, so you can focus entirely on the frontend development.

**Estimated Time:** 4-5 hours

## 🏗️ Project Structure

```
.
├── backend/          # Node.js backend (already implemented)
├── frontend/         # React + Vite frontend (your work area)
└── README.md         # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```

   The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

## 📝 Assessment Tasks

Please complete the following tasks in order. Each task builds upon the previous one.

### Task 1: Create Task List Component
**Estimated Time: 1-1.5 hours**

Create a component that displays a list of tasks fetched from the backend API.

**Requirements:**
- Fetch tasks from `GET /api/tasks`
- Display tasks in a clean, organized list
- Show task title, description, status, and due date
- Handle loading and error states
- Use modern React patterns (hooks, functional components)

**API Endpoint:**
- `GET http://localhost:3001/api/tasks` - Returns an array of tasks

### Task 2: Implement Task Creation Form
**Estimated Time: 1.5-2 hours**

Create a form component that allows users to create new tasks.

**Requirements:**
- Form fields: title (required), description, due date, priority (low/medium/high)
- Form validation (show error messages for invalid inputs)
- Submit the form to `POST /api/tasks`
- After successful creation, refresh the task list
- Reset form after successful submission
- Use controlled components

**API Endpoint:**
- `POST http://localhost:3001/api/tasks`
  - Body: `{ title: string, description?: string, dueDate?: string, priority?: 'low' | 'medium' | 'high' }`

### Task 3: Add Task Filtering and Status Management
**Estimated Time: 1.5-2 hours**

Implement filtering and status update functionality.

**Requirements:**
- Add filter buttons/dropdown to filter tasks by:
  - Status (all, pending, in-progress, completed)
  - Priority (all, low, medium, high)
- Add ability to update task status (click to toggle between pending → in-progress → completed)
- Update task status via `PATCH /api/tasks/:id`
- Ensure filtered view updates in real-time
- Add visual indicators for different statuses and priorities

**API Endpoints:**
- `PATCH http://localhost:3001/api/tasks/:id`
  - Body: `{ status?: 'pending' | 'in-progress' | 'completed' }`

## 🎨 Design Guidelines

- Use a modern, clean UI design
- Ensure the application is responsive (works on mobile and desktop)
- Use appropriate colors and spacing
- Add loading states and error handling
- Make the UI intuitive and user-friendly

## 📚 Available Libraries

The following libraries are already installed in the frontend:
- React 18
- Axios (for API calls)
- You may install additional UI libraries if needed (e.g., ShadCN, Material-UI, etc.)

## ✅ Submission Guidelines

1. Complete all three tasks
2. Ensure your code is clean, well-organized, and follows React best practices
3. Add comments where necessary to explain complex logic
4. Test your implementation thoroughly
5. Create a brief summary document explaining:
   - Your approach to each task
   - Any design decisions you made
   - Challenges you encountered and how you solved them
   - Any additional features you added (if any)

## 🧪 Testing Your Work

Make sure to test:
- All API integrations work correctly
- Forms validate properly
- Filtering and status updates function as expected
- The UI is responsive
- Error states are handled gracefully

## 📞 Questions?

If you have any questions about the assessment, please reach out to the hiring team.

Good luck! 🚀
