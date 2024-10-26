const apiUrl = 'http://localhost:3000/tasks';

document.addEventListener('DOMContentLoaded', () => {
  loadTasks();

  const form = document.getElementById('task-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').value;
    const id = document.getElementById('task-id').value;

    const task = { title, description, status };

    if (id) {
      await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
    } else {
      await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
    }

    form.reset();
    document.getElementById('task-id').value = '';
    loadTasks();
  });
});

async function loadTasks() {
  const response = await fetch(apiUrl);
  const tasks = await response.json();

  const taskTableBody = document.querySelector('#task-table tbody');
  taskTableBody.innerHTML = '';

  tasks.forEach(task => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${task.title}</td>
      <td>${task.description}</td>
      <td>${task.status === 'concluída' ? '<i class="fas fa-check-circle"></i> Concluída' : '<i class="fas fa-hourglass-half"></i> Pendente'}</td>
      <td class="task-actions">
        <button class="edit" onclick="editTask(${task.id})"><i class="fas fa-edit"></i></button>
        <button class="delete" onclick="deleteTask(${task.id})"><i class="fas fa-trash-alt"></i></button>
      </td>
    `;
    taskTableBody.appendChild(row);
  });
}

function editTask(id) {
  fetch(`${apiUrl}/${id}`)
    .then(response => response.json())
    .then(task => {
      document.getElementById('title').value = task.title;
      document.getElementById('description').value = task.description;
      document.getElementById('status').value = task.status;
      document.getElementById('task-id').value = task.id;
    });
}

async function deleteTask(id) {
  await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  });
  loadTasks();
}
