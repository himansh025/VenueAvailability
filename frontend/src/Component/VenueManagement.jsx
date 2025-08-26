import  {  useState } from "react";
import VenuesList from "./VenuesList";
import { useSelector } from "react-redux";
import { days,timeSlots } from '../utils/dayTimeSlot';
import SearchComponent from "./SearchComponent";
import { useVacantVenues } from '../utils/useVacantVenues'
export default function VenueManagement() {
  const { user } = useSelector((state) => state.auth)
  const { venues } = useSelector((state) => state.venue)
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
