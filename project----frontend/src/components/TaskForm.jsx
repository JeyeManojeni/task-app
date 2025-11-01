import { useState } from 'react';

function TaskForm({ onAdd }) {
  const [task, setTask] = useState({ title: '', description: '', priority: 'Medium', due_date: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(task);
    setTask({ title: '', description: '', priority: 'Medium', due_date: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value })} required />
      <textarea placeholder="Description" value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })} />
      <select value={task.priority} onChange={(e) => setTask({ ...task, priority: e.target.value })}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input type="date" value={task.due_date} onChange={(e) => setTask({ ...task, due_date: e.target.value })} required />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;