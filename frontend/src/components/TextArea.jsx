// src/components/TextArea.jsx
import React from 'react';

export default function TextArea({ label, name, value, onChange, placeholder, rows = 3, required = false }) {
  return (
    <div className='w-full'>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
      />
    </div>
  );
}