import React, { useState } from 'react';
import EditTaskModal from './EditTaskModal';

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);

  return (
    <li className="flex items-center mb-2 p-2 rounded hover:bg-gray-50">
      <input
        type="checkbox"
        checked={!!task.is_completed}
        onChange={() => onToggle(task)}
        className="mr-2"
      />
      <span className={`flex-grow ${task.is_completed ? 'line-through text-gray-500' : ''}`}>
        {task.title}
      </span>
      <button onClick={() => setEditing(true)} className="mx-1 text-blue-600">
        Edit
      </button>
      <button onClick={() => onDelete(task.id)} className="mx-1 text-red-600">
        Delete
      </button>
      {editing && (
        <EditTaskModal
          initialTitle={task.title}
          onClose={() => setEditing(false)}
          onSave={newTitle => {
            onEdit(task.id, newTitle);
            setEditing(false);
          }}
        />
      )}
    </li>
  );
}