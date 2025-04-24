import React, { useState } from 'react';

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        className="flex-grow p-2 border rounded-l focus:outline-none"
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="New task..."
      />
      <button
        type="submit"
        disabled={!title.trim()}
        className="p-2 bg-blue-500 text-white rounded-r disabled:opacity-50"
      >
        Add
      </button>
    </form>
  );
}