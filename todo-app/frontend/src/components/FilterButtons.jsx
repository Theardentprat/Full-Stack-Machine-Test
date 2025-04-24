import React from 'react';

export default function FilterButtons({ filter, onChange }) {
  return (
    <div className="flex justify-center mb-4 space-x-2">
      {['all','completed','incomplete'].map(f => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`px-3 py-1 rounded ${filter === f ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}