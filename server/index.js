const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors()); // Allow frontend to talk to backend
app.use(express.json()); // Allow JSON request body

let tasks = [];

// ✅ Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// ✅ Add a task with dueDate and createdAt
app.post('/api/tasks', (req, res) => {
  const { task, dueDate } = req.body;
  if (!task) {
    return res.status(400).json({ error: 'Task is required' });
  }

  const newTask = {
    id: Date.now(),
    text: task,
    dueDate,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// ✅ Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== id);
  res.status(200).json({ message: 'Task deleted' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
