import React,{ useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';
import InsightsPanel from './components/InsightsPanel';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ status: '', priority: '', sortBy: '' });

  const fetchTasks = async () => {
    const params = new URLSearchParams();
    if (filter.status) params.append('status', filter.status);
    if (filter.priority) params.append('priority', filter.priority);
    if (filter.sortBy) params.append('sortBy', filter.sortBy);

    try {
      const res = await fetch(`http://localhost:3000/tasks?${params.toString()}`);
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const addTask = async (task) => {
    try {
      await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (id, updates) => {
    try {
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="app">
      <h1>Task Tracker</h1>
      <TaskForm onAdd={addTask} />
      <div className="filters">
        <select value={filter.status} onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
          <option value=""> All Status</option>
          <option value="Open">Open</option>
          <option value="In Progress"> In Progress</option>
          <option value="Done">Done</option>
        </select>
        <select value={filter.priority} onChange={(e) => setFilter({ ...filter, priority: e.target.value })}>
          <option value="">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={() => setFilter({ ...filter, sortBy: 'due_date' })}>Sort by Due Date</button>
      </div>
      <TaskList tasks={tasks} onUpdate={updateTask} />
      <InsightsPanel />
    </div>
  );
}

export default App;