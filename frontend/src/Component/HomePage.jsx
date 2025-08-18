import React, { useState } from 'react';
import SearchComponent from './SearchComponent';
import VenuesList from './VenuesList';
import BookingModal from './BookingModal';

const HomePage = () => {
  const [searchFilters, setSearchFilters] = useState({
    search: '',
    category: 'all',
    // sortBy: 'name',
    availability: 'all'
  });
  
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate login state

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

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Venue Booking</h1>
            <button
              onClick={toggleLogin}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                isLoggedIn 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-primary hover:bg-secondary text-white'
              }`}
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchComponent 
          onSearchChange={handleSearchChange}
          filters={searchFilters}
        />
        
        <VenuesList 
          filters={searchFilters}
          isLoggedIn={isLoggedIn}
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