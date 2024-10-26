const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Task = require('./models/taskModel');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/tasks', (req, res) => {
  Task.getAll((err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/tasks', (req, res) => {
  const newTask = req.body;
  Task.create(newTask, function(err) {
    if (err) res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
});

app.put('/tasks/:id', (req, res) => {
  const updatedTask = req.body;
  Task.update(req.params.id, updatedTask, (err) => {
    if (err) res.status(500).json({ error: err.message });
    res.status(200).send();
  });
});

app.delete('/tasks/:id', (req, res) => {
  Task.delete(req.params.id, (err) => {
    if (err) res.status(500).json({ error: err.message });
    res.status(204).send();
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
