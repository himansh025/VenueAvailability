import { useState, useEffect } from "react";

const SearchComponent = ({ onSearchChange, filters, days, timeSlots }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  // Whenever localFilters change, notify parent
  useEffect(() => {
    onSearchChange(localFilters);
  }, [localFilters]);

  const handleChange = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search input */}
        <input
          type="text"
          value={localFilters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          placeholder="Search venues..."
          className="px-3 py-2 border border-gray-300 rounded-md"
        />

        {/* Category */}
        <select
          value={localFilters.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="all">All Categories</option>
          <option value="classroom">Classroom</option>
          <option value="lab">Lab</option>
        </select>

        {/* Day selection */}
        <select
          value={localFilters.selectedDay}
          onChange={(e) => handleChange("selectedDay", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          {days.map((day) => (
            <option key={day} value={day}>
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </option>
          ))}
        </select>

        {/* Time slot selection */}
        <select
          value={localFilters.selectedTimeIndex}
          onChange={(e) => handleChange("selectedTimeIndex", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          {timeSlots.map((slot) => (
            <option key={slot.index} value={slot.index}>
              {slot.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchComponent;
