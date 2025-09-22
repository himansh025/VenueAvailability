<<<<<<< HEAD
import { useState } from "react";
import VenuesList from "./VenuesList";
import { useSelector } from "react-redux";
import { days, timeSlots, dayName } from '../utils/dayTimeSlot';
import SearchComponent from "./SearchComponent";
import { useVacantVenues } from '../utils/useVacantVenues';
import { format } from 'date-fns';
import BookingModal from './BookingModal';

export default function VenueManagement() {
  const { user } = useSelector((state) => state.auth);
  
=======
import  {  useState } from "react";
import VenuesList from "./VenuesList";
import { useSelector } from "react-redux";
import { days,timeSlots } from '../utils/dayTimeSlot';
import SearchComponent from "./SearchComponent";
import { useVacantVenues } from '../utils/useVacantVenues'
export default function VenueManagement() {
  const { user } = useSelector((state) => state.auth)
  const { venues } = useSelector((state) => state.venue)
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc
  const [searchFilters, setSearchFilters] = useState({
    search: '',
    category: 'all',
    availability: 'all',
<<<<<<< HEAD
    selectedDate: new Date(),
    selectedDay: dayName,
    selectedTimeIndex: '1'
  });

  const [selectedVenue, setSelectedVenue] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const { vacantVenues, allDayVenues, loading, fetchVacantVenues } = useVacantVenues(
    searchFilters.selectedDay,
    searchFilters.selectedTimeIndex,
    timeSlots
  );

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

  return (
    <div className="space-y-6">
      {/* Search Component */}
      <SearchComponent
        onSearchChange={handleSearchChange}
        filters={searchFilters}
        days={days}
        timeSlots={timeSlots}
      />

      {/* Venues List */}
      <VenuesList
        filters={searchFilters}
        venues={vacantVenues}
        onBookVenue={handleBookVenue}
        date={searchFilters.selectedDate}
        selectedDay={searchFilters.selectedDay}
        selectedTime={searchFilters.selectedTimeIndex}
        refreshVenues={fetchVacantVenues}
      />

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
}
=======
    selectedDay: 'monday',
    selectedTimeIndex: '1'
  });
  const { vacantVenues, allDayVenues, loading } = useVacantVenues(
      searchFilters.selectedDay,
      searchFilters.selectedTimeIndex,
      timeSlots
    );

   const handleSearchChange = (filters) => {
    setSearchFilters(prev => ({
      ...prev,
      ...filters
    }));
  };

  const handleBookVenue = (allvenue) => {
    setSelectedVenue(allvenue);
    setIsBookingModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-around">
      </div>
 
         <SearchComponent
          onSearchChange={handleSearchChange}
          filters={searchFilters}
          days={days}
          timeSlots={timeSlots}
        />

      <VenuesList
        filters={searchFilters}
        venues={venues}
        onBookVenue={handleBookVenue}
      />


    </div>
  );
}
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc
