const BASE = 'http://localhost/todo-app/backend/tasks';

export const fetchTasks = () => fetch(BASE).then(r => r.json());
export const addTask = title =>
  fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  }).then(r => r.json());
export const updateTask = (id, data) =>
  fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
export const deleteTask = id =>
  fetch(`${BASE}/${id}`, { method: 'DELETE' });