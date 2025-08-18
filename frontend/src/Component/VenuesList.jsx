import React, { useEffect } from 'react';
import VenueCard from './VenueCard';
import axiosInstance from '../config/apiconfig';
import { useState } from 'react';
import { format } from 'date-fns';

const VenuesList = ({ filters, isLoggedIn, onBookVenue }) => {

  const [venues, setVenues] = useState([]);

  // Fetch API data
useEffect(() => {
  const today = new Date();
  const formattedDate = format(today, "yyyy-MM-dd");

  const fetchVenues = async () => {
    try {
      const res = await axiosInstance.get(`/venues?date=${formattedDate}`);
      setVenues(transformApiDataToSampleFormat(res.data.data));
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };

  fetchVenues();
}, []);


  // Transform API data to UI-friendly format
  const transformApiDataToSampleFormat = (apiData) => {
    return apiData.map((venue) => ({
      id: venue._id,
      name: venue.name,
      category: venue.type?.toLowerCase() || "other", // normalize type
      capacity: venue.capacity,
      isAvailable: venue.isAvailable,
      location: venue.location,
      availableTimes: venue.availableTimes || [],
      unavailableTimes: venue.unavailableTimes || [],
      image: getDefaultImage(venue.type),
    }));
  };

  // Default images per category
  const getDefaultImage = (type) => {
    const imageMap = {
      "Seminar Hall":
        "https://images.pexels.com/photos/1708936/pexels-photo-1708936.jpeg?auto=compress&cs=tinysrgb&w=400",
      Classroom:
        "https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=400",
    };
    return (
      imageMap[type] ||
      "https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=400"
    );
  };

  // Apply filters to venues
  const filterVenues = () => {
    let filteredVenues = [...venues];

    // Search filter
    if (filters.search) {
      filteredVenues = filteredVenues.filter((venue) =>
        venue.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category filter
    if (filters.category !== "all") {
      filteredVenues = filteredVenues.filter(
        (venue) => venue.category === filters.category.toLowerCase()
      );
    }

    // Availability filter
    if (filters.availability !== "all") {
      filteredVenues = filteredVenues.filter((venue) =>
        filters.availability === "available"
          ? venue.isAvailable
          : !venue.isAvailable
      );
    }

    // Sorting
    filteredVenues.sort((a, b) => {
      switch (filters.sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "capacity":
          return b.capacity - a.capacity;
        case "category":
          return a.category.localeCompare(b.category);
        case "availability":
          return b.isAvailable - a.isAvailable;
        default:
          return 0;
      }
    });

    return filteredVenues;
  };

  const filteredVenues = filterVenues();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Available Venues ({filteredVenues.length})
        </h2>
      </div>

      {filteredVenues.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No venues found matching your criteria.</div>
          <p className="text-gray-400 mt-2">Try adjusting your search filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map(venue => (
            <VenueCard
              key={venue.id}
              venue={venue}
              isLoggedIn={isLoggedIn}
              onBookVenue={onBookVenue}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VenuesList;