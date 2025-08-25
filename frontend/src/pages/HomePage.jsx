import {  useState } from 'react';
import SearchComponent from '../Component/SearchComponent';
import VenuesList from '../Component/VenuesList';
import BookingModal from '../Component/BookingModal';
import { useSelector } from 'react-redux';
import Loader from '../Component/Loader';

const HomePage = ({loader}) => {
  const [searchFilters, setSearchFilters] = useState({
    search: '',
    category: 'all',
    // sortBy: 'name',
    availability: 'all'
  });
    const { venues } = useSelector(state => state.venue);
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const {user}= useSelector((state)=>state.auth)

  const handleSearchChange = (filters) => {
    setSearchFilters(filters);
  };

  const handleBookVenue = (venue) => {
    setSelectedVenue(venue);
    setIsBookingModalOpen(true);
  };



  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
    setSelectedVenue(null);
  };

  
if(loader){
  return(
    <Loader/>
  )
}

  return (
    <div className="min-h-screen bg-gray-50">
    
      {/* Main Content */}
      <main className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-1 py-8">
        <SearchComponent 
          onSearchChange={handleSearchChange}
          filters={searchFilters}
        />
        
        <VenuesList 
          filters={searchFilters}
          onBookVenue={handleBookVenue}
        />
      </main>

      {/* Booking Modal */}
      {isBookingModalOpen && selectedVenue && (
        <BookingModal
          venue={selectedVenue}
          isOpen={isBookingModalOpen}
          onClose={handleCloseBooking}
        />
      )}
    </div>
  );
};

export default HomePage;
