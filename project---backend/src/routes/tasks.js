const express = require('express');
const db = require('../db/database');
const router = express.Router();

// POST /tasks - Create a new task
router.post('/', (req, res) => {
  const { title, description, priority, due_date } = req.body;
  if (!title || !priority || !due_date) {
    return res.status(400).json({ error: 'Title, priority, and due_date are required.' });
  }
  const stmt = db.prepare('INSERT INTO tasks (title, description, priority, due_date) VALUES (?, ?, ?, ?)');
  const result = stmt.run(title, description || '', priority, due_date);
  res.status(201).json({ id: result.lastInsertRowid });
});

// GET /tasks - List tasks with optional filtering and sorting
router.get('/', (req, res) => {
  const { status, priority, sort_by = 'due_date' } = req.query;
  let query = 'SELECT * FROM tasks';
  const params = [];
  const conditions = [];

  if (status) {
    conditions.push('status = ?');
    params.push(status);
  }
  if (priority) {
    conditions.push('priority = ?');
    params.push(priority);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ` ORDER BY ${sort_by} ASC`;
  const stmt = db.prepare(query);
  const tasks = stmt.all(...params);
  res.json(tasks);
});

// PATCH /tasks/:id - Update task status or priority
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { status, priority } = req.body;
  if (!status && !priority) {
    return res.status(400).json({ error: 'Status or priority must be provided.' });
  }

  const updates = [];
  const params = [];
  if (status) {
    updates.push('status = ?');
    params.push(status);
  }
  if (priority) {
    updates.push('priority = ?');
    params.push(priority);
  }
  params.push(id);

  const stmt = db.prepare(`UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`);
  const result = stmt.run(...params);
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Task not found.' });
  }
  res.json({ message: 'Task updated successfully.' });
});

module.exports = router;