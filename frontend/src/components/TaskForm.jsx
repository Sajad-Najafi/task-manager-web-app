import { useState } from 'react';

export default function TaskForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
  });

  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }

    onSubmit(form);
    setForm({ title: '', description: '', dueDate: '', priority: 'medium' });
    setError('');
  };

  return (
    <div>
      <h3>Add New Task</h3>

      <input
        name='title'
        placeholder='Title *'
        value={form.title}
        onChange={handleChange}
      />

      <textarea
        name='description'
        placeholder='Description'
        value={form.description}
        onChange={handleChange}
      />

      <input
        type='date'
        name='dueDate'
        value={form.dueDate}
        onChange={handleChange}
      />

      <select name='priority' value={form.priority} onChange={handleChange}>
        <option value='low'>Low</option>
        <option value='medium'>Medium</option>
        <option value='high'>High</option>
      </select>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={handleSubmit}>Create Task</button>
    </div>
  );
}
