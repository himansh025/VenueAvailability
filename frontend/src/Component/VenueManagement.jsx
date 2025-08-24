import React, { useEffect, useState } from "react";
import VenuesList from "./VenuesList";
import SearchComponent from "./SearchComponent";
import { useSelector } from "react-redux";

export default function VenueManagement() {
  const [allvenues, setallVenues] = useState([""]);
  const {user}= useSelector((state)=>state.auth)
   const {venues}= useSelector((state)=>state.venue)
  console.log(user)
  const [searchFilters, setSearchFilters] = useState({
    search: '',
    category: 'all',
    availability: 'all'
  });
  
     const handleSearchChange = (filters) => {
    setSearchFilters(filters);
  };

  const handleBookVenue = (allsvenue) => {
    setSelectedVenue(allvenue);
    setIsBookingModalOpen(true);
  };


useEffect(() => {
      setallVenues(venues);
}, []);




console.log(allvenues)


  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Venue Management</h2>

      <SearchComponent 
         onSearchChange={handleSearchChange}
         filters={searchFilters}
         />     
    
    <VenuesList 
          filters={searchFilters}
          isLoggedIn={true}
          onBookVenue={handleBookVenue}
        />


    </div>
  );
}
