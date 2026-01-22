// API utility functions for tasks
// You can use these helper functions or create your own API calls

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch all tasks with optional filtering and sorting
 * @param {Object} options - Query options
 * @param {string} options.status - Filter by status (pending, in-progress, completed)
 * @param {string} options.priority - Filter by priority (low, medium, high)
 * @param {string} options.sortBy - Sort by field (title, status, priority, dueDate, createdAt, updatedAt)
 * @param {string} options.order - Sort order (asc, desc)
 * @returns {Promise} Promise that resolves to object with tasks array and metadata
 */
export const fetchTasks = async (options = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (options.status) params.append('status', options.status);
    if (options.priority) params.append('priority', options.priority);
    if (options.sortBy) params.append('sortBy', options.sortBy);
    if (options.order) params.append('order', options.order);
    
    const queryString = params.toString();
    const url = `/tasks${queryString ? `?${queryString}` : ''}`;
    
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

/**
 * Fetch a single task by ID
 * @param {number} id - Task ID
 * @returns {Promise} Promise that resolves to task object
 */
export const fetchTask = async (id) => {
  try {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching task:', error);
    throw error;
  }
};

/**
 * Create a new task
 * @param {Object} taskData - Task data (title, description, dueDate, priority)
 * @returns {Promise} Promise that resolves to created task
 */
export const createTask = async (taskData) => {
  try {
    const response = await api.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

/**
 * Update a task
 * @param {number} id - Task ID
 * @param {Object} updates - Fields to update (status, priority, etc.)
 * @returns {Promise} Promise that resolves to updated task
 */
export const updateTask = async (id, updates) => {
  try {
    const response = await api.patch(`/tasks/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

/**
 * Delete a task
 * @param {number} id - Task ID
 * @returns {Promise} Promise that resolves to deletion response
 */
export const deleteTask = async (id) => {
  try {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

/**
 * Fetch task statistics
 * @returns {Promise} Promise that resolves to statistics object
 */
export const fetchTaskStats = async () => {
  try {
    const response = await api.get('/tasks/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching task stats:', error);
    throw error;
  }
};
