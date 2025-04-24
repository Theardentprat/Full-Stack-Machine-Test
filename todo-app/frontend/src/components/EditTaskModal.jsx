import React, { useState } from 'react';

export default function EditTaskModal({ initialTitle, onClose, onSave }) {
  const [title, setTitle] = useState(initialTitle);

  const handleSave = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    onSave(trimmed);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg w-11/12 max-w-sm">
        <input
          type="text"
          className="border p-2 w-full mb-3"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-3 py-1">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-green-500 text-white rounded disabled:opacity-50"
            disabled={!title.trim()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}