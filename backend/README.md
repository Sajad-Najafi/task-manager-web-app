# Backend API

This is the backend API for the task management application. It's already implemented and ready to use.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:3001`

## API Endpoints

### GET /api/tasks
Get all tasks with optional filtering and sorting.

**Query Parameters:**
- `status` (optional): Filter by status (`pending`, `in-progress`, `completed`)
- `priority` (optional): Filter by priority (`low`, `medium`, `high`)
- `sortBy` (optional): Sort by field (`title`, `status`, `priority`, `dueDate`, `createdAt`, `updatedAt`)
- `order` (optional): Sort order (`asc` or `desc`, default: `asc`)

**Examples:**
- `GET /api/tasks?status=pending`
- `GET /api/tasks?priority=high&sortBy=dueDate&order=asc`
- `GET /api/tasks?status=in-progress&priority=medium`

**Response:**
```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Task title",
      "description": "Task description",
      "status": "pending",
      "priority": "high",
      "dueDate": "2024-12-31",
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ],
  "total": 1,
  "filters": {
    "status": "pending",
    "priority": null,
    "sortBy": null,
    "order": null
  }
}
```

### GET /api/tasks/:id
Get a single task by ID.

### POST /api/tasks
Create a new task.

**Request Body:**
```json
{
  "title": "Task title (required)",
  "description": "Task description (optional)",
  "dueDate": "2024-12-31 (optional)",
  "priority": "low|medium|high (optional, default: medium)"
}
```

**Response:** Created task object

### PATCH /api/tasks/:id
Update a task.

**Request Body:**
```json
{
  "title": "Updated title (optional)",
  "description": "Updated description (optional)",
  "status": "pending|in-progress|completed (optional)",
  "priority": "low|medium|high (optional)",
  "dueDate": "2024-12-31 (optional)"
}
```

**Response:** Updated task object

### DELETE /api/tasks/:id
Delete a task.

**Response:**
```json
{
  "message": "Task deleted successfully",
  "task": { ... }
}
```

### GET /api/tasks/stats
Get task statistics.

**Response:**
```json
{
  "total": 6,
  "byStatus": {
    "pending": 2,
    "in-progress": 2,
    "completed": 2
  },
  "byPriority": {
    "low": 1,
    "medium": 2,
    "high": 3
  },
  "overdue": 0
}
```

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Backend server is running",
  "timestamp": "2024-01-15T10:00:00.000Z",
  "uptime": 123.456
}
```

## Data Model

- **id**: Number (auto-generated)
- **title**: String (required, cannot be empty)
- **description**: String (optional)
- **status**: "pending" | "in-progress" | "completed" (default: "pending")
- **priority**: "low" | "medium" | "high" (default: "medium")
- **dueDate**: String (ISO date format YYYY-MM-DD, optional)
- **createdAt**: String (ISO timestamp, auto-generated)
- **updatedAt**: String (ISO timestamp, auto-updated on modifications)

## Features

- ✅ Request logging middleware
- ✅ Input validation and sanitization
- ✅ Query parameter filtering and sorting
- ✅ Comprehensive error handling
- ✅ Task statistics endpoint
- ✅ Health check endpoint
- ✅ Network delay simulation (300ms) for realistic API behavior
- ✅ More sample data (6 tasks)

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": "Error type",
  "message": "Detailed error message"
}
```

Common HTTP status codes:
- `400` - Bad Request (validation errors)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error
