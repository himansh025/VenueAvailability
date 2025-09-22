import {useState} from 'react';
import SearchComponent from '../Component/SearchComponent';
import VenuesList from '../Component/VenuesList';
import BookingModal from '../Component/BookingModal';
import {useSelector} from 'react-redux';
import Loader from '../Component/Loader';
import {dayName, days, timeSlots} from '../utils/dayTimeSlot';
import {useVacantVenues} from '../utils/useVacantVenues';
import {format} from 'date-fns';

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
        updatedFilters.selectedDay = days[newDate.getDay()];
        updatedFilters.selectedDate = format(filters.selectedDate, "yyyy-MM-dd");
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


        {/* Enhanced Venue List Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
         
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