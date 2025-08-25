import React, { useEffect, useState } from "react";
import VenuesList from "./VenuesList";
import SearchComponent from "./SearchComponent";
import { useSelector } from "react-redux";
import AddVenueModal from "./Admin/VenueMangement/AddVenueModal";
import Button from "./Button";

export default function VenueManagement() {
  const [allvenues, setallVenues] = useState([""]);
  const [addVenueModal, setAddVenueModal] = useState(false);
  const venueType = ["Seminar", "Lab"]; // Fixed typo: "Seminaar" → "Seminar"
  const [newVenue, setNewVenue] = useState({
    name: '',
    location: '',
    capacity: '',
    type: ''
  }); const { user } = useSelector((state) => state.auth)
  const { venues } = useSelector((state) => state.venue)
  console.log(user)
  const [searchFilters, setSearchFilters] = useState({
    search: '',
    category: 'all',
    availability: 'all'
  });

  const handleSearchChange = (filters) => {
    setSearchFilters(filters);
  };

  const handleBookVenue = (allvenue) => {
    setSelectedVenue(allvenue);
    setIsBookingModalOpen(true);
  };

  const handleAddVenue = async (venueData) => {
    // Your venue creation logic
    try {
      // API call
      console.log('Adding venue:', venueData);
      // Close modal on success
      setAddVenueModal(false);
      // Reset form
      setNewVenue({
        name: '',
        location: '',
        capacity: '',
        type: ''
      });
    } catch (error) {
      console.error('Error adding venue:', error);
    }
  };

  useEffect(() => {
    setallVenues(venues);
  }, []);

  console.log(allvenues)


  {
    addVenueModal && (
      <AddVenueModal 
      venueTypes={venueType}
      newVenue={newVenue}
      setNewVenue={setNewVenue}
      onSubmit={handleAddVenue}
      onClose={() => setAddVenueModal(false)}
      />
    )}

  return (
    <div>
      <div className="flex justify-around">
        <h2 className="text-xl font-semibold mb-4">Venue Management</h2>
        {/* <AddVenueModal/> */}
      </div>
      <SearchComponent
        onSearchChange={handleSearchChange}
        filters={searchFilters}
      />
      <div className=" flex flex-col mb-12 md:mb-0 md:flex-row relative">
        <Button
          children={"Add Venue"}
          flex={"absolute right-0 md:right-5 "}
          onClick={()=>setAddVenueModal(true)}
        />
      </div>

      <VenuesList
        filters={searchFilters}
        isLoggedIn={true}
        onBookVenue={handleBookVenue}
      />


    </div>
  );
}
