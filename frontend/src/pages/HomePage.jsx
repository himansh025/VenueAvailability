import { useState } from 'react';
import SearchComponent from '../Component/SearchComponent';
import VenuesList from '../Component/VenuesList';
import BookingModal from '../Component/BookingModal';
import { useSelector } from 'react-redux';
import Loader from '../Component/Loader';
import { days, timeSlots,dayName } from '../utils/dayTimeSlot';
import { useVacantVenues } from '../utils/useVacantVenues'
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
// console.log(searchFilters)
 const { vacantVenues, allDayVenues, loading,fetchVacantVenues } = useVacantVenues(
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
       const newDate= new Date(filters.selectedDate)
      // console.log("selcted",newDate)
      const newDayName = days[newDate.getDay()];
      updatedFilters.selectedDay = newDayName;
      const newformattedDate= format(filters.selectedDate, "yyyy-MM-dd");
      updatedFilters.selectedDate = newformattedDate;
    }

    // console.log('Updated filters:', updatedFilters);
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

  if ( loading) {
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
              {searchFilters?.selectedDay?.charAt(0).toUpperCase() + searchFilters?.selectedDay?.slice(1)} -{" "}
              {timeSlots?.find(slot => slot.index === searchFilters?.selectedTimeIndex)?.label}
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
          date={searchFilters.selectedDate}
          selectedDay={searchFilters.selectedDay}
          selectedTime={searchFilters.selectedTimeIndex}
          refreshVenues={fetchVacantVenues}
        />
      </main>

      {/* Booking Modal */}
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
