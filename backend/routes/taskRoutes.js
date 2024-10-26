app.get('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    db.get('SELECT * FROM tasks WHERE id = ?', [taskId], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(row);
      }
    });
  });
  