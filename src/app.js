const express = require('express');

// Builds the API. Tests create a fresh app each time, so every test starts
// with an empty to-do list.
function createApp() {
  const app = express();
  app.use(express.json());

  // The to-dos live in memory: restart the server and they are gone.
  const todos = [];
  // Ids only ever go up, so a deleted to-do's id is never handed out again.
  let nextId = 1;

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
    const todo = { id: nextId++, title: title.trim(), done: false };
    todos.push(todo);
    res.status(201).json(todo);
  });

  app.patch('/todos/:id', (req, res) => {
    const todo = todos.find(item => item.id === Number(req.params.id));
    if (!todo) {
      return res.status(404).json({ error: 'No to-do with that id.' });
    }
    const done = req.body?.done;
    if (typeof done !== 'boolean') {
      return res.status(400).json({ error: 'done must be true or false.' });
    }
    todo.done = done;
    res.json(todo);
  });

  app.delete('/todos/:id', (req, res) => {
    const index = todos.findIndex(item => item.id === Number(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: 'No to-do with that id.' });
    }
    todos.splice(index, 1);
    res.status(204).end();
  });

  return app;
}

module.exports = { createApp };
