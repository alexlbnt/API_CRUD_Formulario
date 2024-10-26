const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT CHECK(status IN ('pendente', 'concluída')) NOT NULL
    )
  `);
});

const Task = {
  getAll: (callback) => {
    db.all('SELECT * FROM tasks', callback);
  },
  create: (task, callback) => {
    const { title, description, status } = task;
    db.run(
      'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
      [title, description, status],
      callback
    );
  },
  update: (id, task, callback) => {
    const { title, description, status } = task;
    db.run(
      'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
      [title, description, status, id],
      callback
    );
  },
  delete: (id, callback) => {
    db.run('DELETE FROM tasks WHERE id = ?', [id], callback);
  }
};

module.exports = Task;
