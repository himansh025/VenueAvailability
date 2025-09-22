import { useState, useEffect } from "react";
import MyCalendar from "./MyCalender";
import { Calendar, Search, Filter, Clock } from "lucide-react";

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
    console.log(day, date);
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
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            value={localFilters.search}
            onChange={(e) => handleChange("search", e.target.value)}
            placeholder="Search venues..."
            className="pl-10 pr-3 py-2 h-11 border border-gray-300 rounded-md text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Category */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <select
            value={localFilters.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="pl-10 pr-3 py-2 h-11 border border-gray-300 rounded-md text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
          >
            <option value="all">All Categories</option>
            <option value="classroom">Classroom</option>
            <option value="lab">Lab</option>
          </select>
        </div>

        {/* Date picker with popup */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setCalendarOpen(!calendarOpen)}
            className="flex items-center px-3 py-2 h-11 border border-gray-300 rounded-md text-sm w-full text-left hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            {localFilters.selectedDate
              ? `${localFilters.selectedDate}`
              : "Select Date"}
          </button>
              
          {calendarOpen && (
            <div className="absolute z-50 bg-white shadow-lg rounded-md p-2 mt-2 border">
              <MyCalendar onDateChange={handleDateDaySelect} />
            </div>
          )}
        </div>

        {/* Time slot selection */}
        <div className="relative">
          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <select
            value={localFilters.selectedTimeIndex}
            onChange={(e) => handleChange("selectedTimeIndex", e.target.value)}
            className="pl-10 pr-3 py-2 h-11 border border-gray-300 rounded-md text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
          >
            {timeSlots.map((slot) => (
              <option key={slot.index} value={slot.index}>
                {slot.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;