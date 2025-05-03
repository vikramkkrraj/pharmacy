import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(input.trim().toLowerCase());
    }, 300); // debounce delay

    return () => clearTimeout(delay);
  }, [input, onSearch]);

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search medicines..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
