const Database = require('better-sqlite3');
const db = new Database('./task_tracker.db', { verbose: console.log });

// Create tasks table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT CHECK(priority IN ('Low', 'Medium', 'High')) NOT NULL DEFAULT 'Medium',
    due_date TEXT NOT NULL,  -- ISO date string (YYYY-MM-DD)
    status TEXT CHECK(status IN ('Open', 'In Progress', 'Done')) NOT NULL DEFAULT 'Open',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

module.exports = db;