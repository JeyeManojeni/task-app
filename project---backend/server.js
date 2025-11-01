const express = require('express');
const cors = require('cors');
const tasksRouter = require('./src/routes/tasks');
const { getInsights } = require('./src/services/insights');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/tasks', tasksRouter);

// GET /insights
app.get('/insights', (req, res) => {
  const insights = getInsights();
  res.json(insights);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});