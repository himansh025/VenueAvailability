import React, { useState } from 'react';

const SearchComponent = ({ onSearchChange, filters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleInputChange = (field, value) => {
    const newFilters = { ...localFilters, [field]: value };
    setLocalFilters(newFilters);
    onSearchChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      search: '',
      category: 'all',
      // sortBy: 'name',
      availability: 'all'
    };
    setLocalFilters(resetFilters);
    onSearchChange(resetFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Search & Filter</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Search Input */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Venues
          </label>
          <input
            type="text"
            id="search"
            value={localFilters.search}
            onChange={(e) => handleInputChange('search', e.target.value)}
            placeholder="Search by name..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={localFilters.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="classroom">Classroom</option>
            <option value="complab">Computer Lab</option>
            <option value="lab"> Lab</option>
            <option value="seminar">Seminar Hall</option>
          </select>
        </div>

        {/* Availability Filter */}
        <div>
          <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
            Availability
          </label>
          <select
            id="availability"
            value={localFilters.availability}
            onChange={(e) => handleInputChange('availability', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>

        {/* Sort By */}
        {/* <div>
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            id="sortBy"
            value={localFilters.sortBy}
            onChange={(e) => handleInputChange('sortBy', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="name">Name</option>
            <option value="capacity">Capacity</option>
            <option value="category">Category</option>
            <option value="availability">Availability</option>
          </select>
        </div> */}
      {/* Action Buttons */}
      <div className="flex mt-5  justify-center items-center gap-3">
        <button
          onClick={() => handleInputChange('search', localFilters.search)}
          className="px-6 py-2 bg-blue-900 hover:bg-secondary text-white font-medium rounded-md transition-colors"
        >
          Search
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md transition-colors"
        >
          Reset
        </button>
        {/* <button
          onClick={() => handleInputChange('availability', 'available')}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
        >
          Show Available
        </button> */}
        {/* <button
          onClick={() => handleInputChange('category', 'classroom')}
          className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-md transition-colors"
        >
          Classrooms Only
        </button> */}
      </div>
      </div>

    </div>
  );
};

export default SearchComponent;