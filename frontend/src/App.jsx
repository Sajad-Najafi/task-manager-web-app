import React from 'react';
import './App.css';
import { fetchTasks, createTask } from './api/tasks';
import { useState } from 'react';
import { useEffect } from 'react';
import TaskList from './components/TaskList';
import Loading from './components/Loading';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [numFilterApplied, setNumFilterApplied] = useState(0);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const params = {};
      if (statusFilter !== 'all') params.status = statusFilter;
      if (priorityFilter !== 'all') params.priority = priorityFilter;
      params.sortBy = 'dueDate';

      const data = await fetchTasks(params);
      setTasks(data.tasks);
    } catch (e) {
      console.log('Error Loading Tasks!!!');
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = e => {
    if (e.target.dataset.filterByStatus) {
      setStatusFilter(e.target.dataset.filterByStatus);
      if (priorityFilter !== 'all') {
        setNumFilterApplied(2);
      } else {
        setNumFilterApplied(1);
      }
    } else {
      setPriorityFilter(e.target.dataset.filterByPriority);
      if (statusFilter !== 'all') {
        setNumFilterApplied(2);
      } else {
        setNumFilterApplied(1);
      }
    }

    setShowFilters(false);
  };

  const resetStatusFilter = () => {
    setShowFilters(false);
    setStatusFilter('all');
    if (priorityFilter !== 'all') {
      setNumFilterApplied(1);
    } else {
      setNumFilterApplied(0);
    }
  };

  const handleSaveTask = async formData => {
    try {
      await createTask(formData); // save to server.js
      setShowTaskForm(false); // hide form
      load(); // reload tasks
    } catch (error) {
      console.log('Error saving task', error);
      alert('Error saving task!');
    }
  };

  const resetPriorityFilter = () => {
    setShowFilters(false);
    setPriorityFilter('all');
    if (statusFilter !== 'all') {
      setNumFilterApplied(1);
    } else {
      setNumFilterApplied(0);
    }
  };

  useEffect(() => {
    load();
  }, [statusFilter, priorityFilter]);

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>Task Manager</h1>
        <p>React Frontend Developer Assessment</p>
        {/* NEW: Task Form appears below button */}
        {showTaskForm && (
          <div className=' app-main transition-all duration-300 max-h-96 opacity-100 ease-in-out  p-4 border rounded-xl bg-gray-50 shadow-sm'>
            <TaskForm
              onSubmit={handleSaveTask}
              onCancel={() => setShowTaskForm(false)} // ← this hides the form
            />
          </div>
        )}
      </header>

      <main className='app-main'>
        <div className='max-h-175 flex flex-col gap-5 bg-white p-8 rounded-xl ring ring-slate-100'>
          <div className='flex items-center justify-between gap-3 border-b p-5 border-b-gray-300'>
            <h1 className='font-semibold text-2xl'>Your Tasks</h1>
            <div className='flex items-center gap-5'>
              <button
                className='flex items-center justify-center gap-1 bg-blue-500 rounded-lg py-1 px-3 text-white cursor-pointer transition-colors hover:bg-blue-600'
                onClick={() => setShowTaskForm(!showTaskForm)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='w-4 h-4'
                >
                  <path d='M5 12h14' />
                  <path d='M12 5v14' />
                </svg>{' '}
                <span>Add new task</span>
              </button>
              <div className='relative'>
                <button
                  className='flex items-center justify-center gap-1 bg-gray-100 py-1 px-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-200'
                  onClick={() => {
                    setShowFilters(!showFilters);
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='w-4 h-4'
                  >
                    <path d='M14 17H5' />
                    <path d='M19 7h-9' />
                    <circle cx='17' cy='17' r='3' />
                    <circle cx='7' cy='7' r='3' />
                  </svg>
                  <span>Filter</span>
                  <span>{numFilterApplied != 0 && numFilterApplied}</span>
                </button>

                <div
                  className={`flex-col gap-3 absolute top-full -left-1/2 bg-white p-3 w-50 rounded-md ring ring-gray-200 shadow-lg ${showFilters ? `flex` : `hidden`}`}
                >
                  <span className='font-medium'>Filter by status</span>
                  <div className='flex flex-col items-start gap-1'>
                    <button
                      className={`w-full ${statusFilter === 'all' ? `bg-gray-300` : `bg-gray-100`} p-1 px-2 rounded-md transition-colors text-left cursor-pointer hover:bg-gray-300`}
                      onClick={resetStatusFilter}
                    >
                      All
                    </button>
                    <button
                      className={`w-full ${statusFilter === 'pending' ? `bg-gray-300` : `bg-gray-100`} p-1 px-2 rounded-md transition-colors text-left cursor-pointer hover:bg-gray-300`}
                      data-filter-by-status='pending'
                      onClick={applyFilter}
                    >
                      Pending
                    </button>
                    <button
                      className={`w-full ${statusFilter === 'in-progress' ? `bg-gray-300` : `bg-gray-100`} p-1 px-2 rounded-md transition-colors text-left cursor-pointer hover:bg-gray-300`}
                      data-filter-by-status='in-progress'
                      onClick={applyFilter}
                    >
                      Inprogress
                    </button>
                    <button
                      className={`w-full ${statusFilter === 'completed' ? `bg-gray-300` : `bg-gray-100`} p-1 px-2 rounded-md transition-colors text-left cursor-pointer hover:bg-gray-300`}
                      data-filter-by-status='completed'
                      onClick={applyFilter}
                    >
                      Completed
                    </button>
                    <div className='w-full h-px bg-gray-300 my-2'>&nbsp;</div>
                    <span className='font-medium'>Filter by status</span>
                    <button
                      className={`w-full ${priorityFilter === 'all' ? `bg-gray-300` : `bg-gray-100`} p-1 px-2 rounded-md transition-colors text-left cursor-pointer hover:bg-gray-300`}
                      onClick={resetPriorityFilter}
                    >
                      All
                    </button>
                    <button
                      className={`w-full ${priorityFilter === 'low' ? `bg-gray-300` : `bg-gray-100`} p-1 px-2 rounded-md transition-colors text-left cursor-pointer hover:bg-gray-300`}
                      data-filter-by-priority='low'
                      onClick={applyFilter}
                    >
                      Low
                    </button>
                    <button
                      className={`w-full ${priorityFilter === 'medium' ? `bg-gray-300` : `bg-gray-100`} p-1 px-2 rounded-md transition-colors text-left cursor-pointer hover:bg-gray-300`}
                      data-filter-by-priority='medium'
                      onClick={applyFilter}
                    >
                      Medium
                    </button>
                    <button
                      className={`w-full ${priorityFilter === 'high' ? `bg-gray-300` : `bg-gray-100`} p-1 px-2 rounded-md transition-colors text-left cursor-pointer hover:bg-gray-300`}
                      data-filter-by-priority='high'
                      onClick={applyFilter}
                    >
                      High
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {loading && <Loading />}
          {!loading &&
            tasks.length === 0 &&
            statusFilter === 'all' &&
            priorityFilter === 'all' && (
              <div className='text-center text-gray-500 py-10'>
                <p className='text-lg font-medium'>No tasks yet</p>
                <p className='text-sm'>Create your first task to get started</p>
              </div>
            )}
          {!loading &&
            tasks.length === 0 &&
            (statusFilter !== 'all' || priorityFilter !== 'all') && (
              <div className='text-center text-gray-500 py-10'>
                <p className='text-lg font-medium'>No matching tasks</p>
                <p className='text-sm'>Try changing or clearing the filters</p>
              </div>
            )}
          {!loading && <TaskList tasks={tasks} />}
        </div>
        {/* 
          TODO: Implement the following components:
          1. TaskList component (Task 1)
          2. TaskForm component (Task 2)
          3. Task filtering and status management (Task 3)
        */}

        {/* <div className='placeholder'>
          <h2>Welcome to the Assessment!</h2>
          <p>Please refer to the README.md for task instructions.</p>
          <p>
            Start by implementing the TaskList component to display tasks from
            the API.
          </p>
        </div> */}
      </main>
    </div>
  );
}

export default App;
