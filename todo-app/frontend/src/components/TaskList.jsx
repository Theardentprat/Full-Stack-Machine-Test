import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  if (!tasks.length) return <p className="text-center">No tasks found.</p>;

  return (
    <ul>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}