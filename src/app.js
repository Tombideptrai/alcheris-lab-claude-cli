const express = require('express');

// Builds the API. Tests create a fresh app each time, so every test starts
// with an empty to-do list.
function createApp() {
  const app = express();
  app.use(express.json());

  // The to-dos live in memory: restart the server and they are gone.
  const todos = [];

  app.get('/', (req, res) => {
    res.json({ name: 'todo-api', message: 'Hello from your API' });
  });

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/todos', (req, res) => {
    res.json(todos);
  });

  app.post('/todos', (req, res) => {
    const title = req.body?.title;
    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'A to-do needs a title.' });
    }
    const todo = { id: todos.length + 1, title: title.trim(), done: false };
    todos.push(todo);
    res.status(201).json(todo);
  });

  return app;
}

module.exports = { createApp };
