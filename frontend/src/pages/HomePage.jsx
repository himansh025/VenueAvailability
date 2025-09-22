import { useState } from 'react';
import SearchComponent from '../Component/SearchComponent';
import VenuesList from '../Component/VenuesList';
import BookingModal from '../Component/BookingModal';
import { useSelector } from 'react-redux';
import Loader from '../Component/Loader';
import { days, timeSlots, dayName } from '../utils/dayTimeSlot';
import { useVacantVenues } from '../utils/useVacantVenues';
import { format } from 'date-fns';

const HomePage = () => {
  const [searchFilters, setSearchFilters] = useState({
    search: '',
    category: 'all',
    availability: 'all',
    selectedDate: new Date(),
    selectedDay: dayName,
    selectedTimeIndex: '1'
  });

  const { vacantVenues, allDayVenues, loading, fetchVacantVenues } = useVacantVenues(
    searchFilters.selectedDay,
    searchFilters.selectedTimeIndex,
    timeSlots
  );

  const [selectedVenue, setSelectedVenue] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const handleSearchChange = (filters) => {
    let updatedFilters = { ...searchFilters, ...filters };

    if (filters.selectedDate) {
      const newDate = new Date(filters.selectedDate);
      const newDayName = days[newDate.getDay()];
      updatedFilters.selectedDay = newDayName;
      const newformattedDate = format(filters.selectedDate, "yyyy-MM-dd");
      updatedFilters.selectedDate = newformattedDate;
    }

    setSearchFilters(updatedFilters);
  };

  const handleBookVenue = (venue) => {
    setSelectedVenue(venue);
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
    setSelectedVenue(null);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Availability Overview
              </h1>
              <p className="text-gray-600 mt-1">
                {format(new Date(searchFilters.selectedDate), 'EEEE, MMMM dd, yyyy')}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Available</span>
                <div className="w-3 h-3 bg-red-500 rounded-full ml-4"></div>
                <span>Booked</span>
                <div className="w-3 h-3 bg-yellow-500 rounded-full ml-4"></div>
                <span>Upcoming</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Search Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Search & Filters</h2>
            <p className="text-sm text-gray-600">Find the perfect venue for your needs</p>
          </div>
          
          <SearchComponent
            onSearchChange={handleSearchChange}
            filters={searchFilters}
            days={days}
            timeSlots={timeSlots}
          />
        </div>

        {/* Enhanced Info Box */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-6 mb-8 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-sm font-medium opacity-90">Currently Selected</span>
              </div>
              <p className="text-lg font-semibold">
                {searchFilters?.selectedDay?.charAt(0).toUpperCase() + searchFilters?.selectedDay?.slice(1)} 
                <span className="mx-2">•</span>
                {timeSlots?.find(slot => slot.index === searchFilters?.selectedTimeIndex)?.label}
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{vacantVenues.length}</div>
                <div className="text-sm opacity-90">Available Venues</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{allDayVenues?.length || 0}</div>
                <div className="text-sm opacity-90">All Day Available</div>
              </div>
            </div>
          </div>
          
          {/* Progress bar showing availability */}
          <div className="mt-4">
            <div className="flex justify-between text-xs opacity-75 mb-2">
              <span>Venue Availability</span>
              <span>{Math.round((vacantVenues.length / Math.max(vacantVenues.length + 10, 20)) * 100)}% Available</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ 
                  width: `${Math.min((vacantVenues.length / Math.max(vacantVenues.length + 10, 20)) * 100, 100)}%` 
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Enhanced Venue List Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100 px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Available Venues</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {vacantVenues.length > 0 
                    ? `${vacantVenues.length} venue${vacantVenues.length > 1 ? 's' : ''} match your criteria`
                    : 'No venues available for the selected time slot'
                  }
                </p>
              </div>
              
              {vacantVenues.length > 0 && (
                <button
                  onClick={() => fetchVacantVenues()}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-sm font-medium">Refresh</span>
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            {vacantVenues.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H7m2 0v-5a2 2 0 012-2h2a2 2 0 012 2v5m-6 0V9a2 2 0 012-2h2a2 2 0 012 2v11M7 7h10" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">No venues available</h4>
                <p className="text-gray-600 mb-4">Try selecting a different time slot or date to see available venues.</p>
                <button
                  onClick={() => handleSearchChange({ selectedTimeIndex: '2' })}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Try Next Time Slot
                </button>
              </div>
            ) : (
              <VenuesList
                filters={searchFilters}
                onBookVenue={handleBookVenue}
                venues={vacantVenues}
                date={searchFilters.selectedDate}
                selectedDay={searchFilters.selectedDay}
                selectedTime={searchFilters.selectedTimeIndex}
                refreshVenues={fetchVacantVenues}
              />
            )}
          </div>
        </div>
      </main>

      {/* Enhanced Booking Modal */}
      {isBookingModalOpen && selectedVenue && (
        <BookingModal
          venue={selectedVenue}
          date={searchFilters.selectedDate}
          isOpen={isBookingModalOpen}
          onClose={handleCloseBooking}
          selectedDay={searchFilters.selectedDay}
          selectedTime={searchFilters.selectedTimeIndex}
          refreshVenues={fetchVacantVenues}
        />
      )}
    </div>
  );
};

export default HomePage;