import React, { useState } from 'react';

interface SearchProps {
  onSearch: (location: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center mb-8">
      <input
        type="text"
        value={location}
        onChange={handleChange}
        placeholder="Search Location"
        className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-3/4 focus:outline-none focus:ring focus:border-blue-300"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-md px-4 py-2 ml-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
      >
        Search
      </button>
    </form>
  );
};

export default Search;