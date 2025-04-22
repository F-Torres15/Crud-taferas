const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

async function loadTasks() {
  const res = await fetch('http://localhost:3000/api/tasks');
  const tasks = await res.json();
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span style="text-decoration:${task.completed ? 'line-through' : 'none'}">
        ${task.title}
      </span>
      <div>
        <button onclick="toggleTask(${task.id}, ${task.completed})">✔</button>
        <button onclick="deleteTask(${task.id})">🗑</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  await fetch('http://localhost:3000/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: taskInput.value }),
  });
  taskInput.value = '';
  loadTasks();
});

async function toggleTask(id, currentStatus) {
  await fetch(`http://localhost:3000/api/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: !currentStatus }),
  });
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`http://localhost:3000/api/tasks/${id}`, {
    method: 'DELETE',
  });
  loadTasks();
}

loadTasks();
