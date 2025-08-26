import { useState, useEffect } from 'react';
import SearchComponent from '../Component/SearchComponent';
import VenuesList from '../Component/VenuesList';
import BookingModal from '../Component/BookingModal';
import { useSelector } from 'react-redux';
import Loader from '../Component/Loader';

import { days, timeSlots } from '../utils/dayTimeSlot';
import { useVacantVenues } from '../utils/useVacantVenues'
const HomePage = ({ loader }) => {
  const [searchFilters, setSearchFilters] = useState({
    search: '',
    category: 'all',
    availability: 'all',
    selectedDay: 'monday',
    selectedTimeIndex: '1'
  });
  const { vacantVenues, allDayVenues, loading } = useVacantVenues(
    searchFilters.selectedDay,
    searchFilters.selectedTimeIndex,
    timeSlots
  );
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);


  // Handle search & filter changes
  const handleSearchChange = (filters) => {
    setSearchFilters(prev => ({
      ...prev,
      ...filters
    }));
  };

  const handleBookVenue = (venue) => {
    setSelectedVenue(venue);
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
    setSelectedVenue(null);
  };

  if (loader || loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-1 py-8">
        {/* Search Section (Day, Time, Filters) */}

        <SearchComponent
          onSearchChange={handleSearchChange}
          filters={searchFilters}
          days={days}
          timeSlots={timeSlots}
        />

        {/* Info box */}
        <div className="mt-2 p-3 bg-blue-50 rounded-md">
          <div className="flex justify-between items-center">
            <p className="text-sm text-blue-800">
              <span className="font-medium">Selected:</span>{" "}
              {searchFilters.selectedDay.charAt(0).toUpperCase() + searchFilters.selectedDay.slice(1)} -{" "}
              {timeSlots.find(slot => slot.index === searchFilters.selectedTimeIndex)?.label}
            </p>
            <div className="text-xs text-blue-600">
              <span className="font-medium">Available:</span> {vacantVenues.length} venues
            </div>
          </div>
        </div>

        {/* Venue List */}
        <VenuesList
          filters={searchFilters}
          onBookVenue={handleBookVenue}
          venues={vacantVenues}
        />
      </main>

      {/* Booking Modal */}
      {isBookingModalOpen && selectedVenue && (
        <BookingModal
          venue={selectedVenue}
          isOpen={isBookingModalOpen}
          onClose={handleCloseBooking}
          selectedDay={searchFilters.selectedDay}
          selectedTime={searchFilters.selectedTimeIndex}
        />
      )}
    </div>
  );
};

export default HomePage;
