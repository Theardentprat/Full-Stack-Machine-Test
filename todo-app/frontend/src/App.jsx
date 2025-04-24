import React, { useState, useEffect } from 'react';
import AddTaskForm from './components/AddTaskForm';
import FilterButtons from './components/FilterButtons';
import TaskList from './components/TaskList';
import { fetchTasks, addTask, updateTask, deleteTask } from './api';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const filteredTasks = tasks.filter(t =>
    filter === 'all' ? true : filter === 'completed' ? t.is_completed : !t.is_completed
  );

  const handleAdd = async title => {
    const newTask = await addTask(title);
    setTasks([newTask, ...tasks]);
  };

  const handleToggle = async task => {
    await updateTask(task.id, { is_completed: !task.is_completed });
    setTasks(
      tasks.map(t =>
        t.id === task.id ? { ...t, is_completed: !t.is_completed } : t
      )
    );
  };

  const handleEdit = async (id, title) => {
    await updateTask(id, { title });
    setTasks(
      tasks.map(t => (t.id === id ? { ...t, title } : t))
    );
  };

  const handleDelete = async id => {
    await deleteTask(id);
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">TODO Application</h1>
      <AddTaskForm onAdd={handleAdd} />
      <FilterButtons filter={filter} onChange={setFilter} />
      <TaskList
        tasks={filteredTasks}
        onToggle={handleToggle}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}