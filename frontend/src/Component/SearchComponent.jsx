// SearchComponent.jsx
import { useState, useEffect } from "react";
import MyCalendar from "./MyCalender";

const SearchComponent = ({ onSearchChange, filters, timeSlots }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [calendarOpen, setCalendarOpen] = useState(false);

  useEffect(() => {
    onSearchChange(localFilters);
  }, [localFilters]);

  const handleChange = (key, value) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleDateDaySelect = (date, day) => {
    console.log(day,date)
     setLocalFilters((prev) => ({
      ...prev,
      selectedDate: date, // For booking (exact date)
      selectedDay: day,   // For fetching backend data
    }));
    
    setCalendarOpen(false); 
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
          className="px-3 py-2 h-11 border border-gray-300 rounded-md text-sm w-full"
        />

        {/* Category */}
        <select
          value={localFilters.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="px-3 py-2 h-11 border border-gray-300 rounded-md text-sm w-full"
        >
          <option value="all">All Categories</option>
          <option value="classroom">Classroom</option>
          <option value="lab">Lab</option>
        </select>

        {/* Date picker with popup */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setCalendarOpen(!calendarOpen)}
            className="px-3 py-2 h-11 border border-gray-300 rounded-md text-sm w-full text-left"
          >
            {localFilters.selectedDate
              ? `📅 ${localFilters.selectedDate}`
              : "Select Date"}
          </button>
              
          {calendarOpen && (
            <div className="absolute z-50 bg-white shadow-lg rounded-md p-2 mt-2">
              <MyCalendar onDateChange={handleDateDaySelect} />
            </div>
          )}
        </div>

        {/* Time slot selection */}
        <select
          value={localFilters.selectedTimeIndex}
          onChange={(e) => handleChange("selectedTimeIndex", e.target.value)}
          className="px-3 py-2 h-11 border border-gray-300 rounded-md text-sm w-full"
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
