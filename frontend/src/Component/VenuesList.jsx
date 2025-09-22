import VenueCard from './VenueCard';
import { useEffect, useState } from 'react';
import axiosInstance from '../Config/apiconfig';
<<<<<<< HEAD
import { timeSlots } from '../utils/dayTimeSlot';

const VenuesList = ({ filters, onBookVenue, venues, date, selectedDay, selectedTime, refreshVenues }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Combine venues with booking information
  const venuesWithBooking = venues.map(venue => {
    const frontendDate = new Date(date).toISOString().split("T")[0];

    const booking = bookings.find(b => {
      const backendDate = new Date(b.date).toISOString().split("T")[0];
      
      return (
        b.venue === venue.name &&
        b.timeSlot === timeSlots[selectedTime]?.label &&
=======
import { timeSlots } from '../utils/dayTimeSlot'
const VenuesList = ({ filters, onBookVenue, venues, date, selectedDay, selectedTime,refreshVenues }) => {

  const [bookings, setBookings] = useState([]);
  const venuesWithBooking = venues.map(venue => {
  const frontendDate = new Date(date).toISOString().split("T")[0];

    const booking = bookings.find(b => {
      const backendDate = new Date(b.date).toISOString().split("T")[0];
      // console.log(frontendDate,backendDate)
      // console.log(selectedTime)
      // console.log(timeSlots)
      // console.log("timeslot",b.timeSlot,timeSlots[selectedTime].label )
      return (
        b.venue === venue.name &&
        b.timeSlot === timeSlots[selectedTime].label &&
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc
        b.day.toLowerCase() === selectedDay.toLowerCase() &&
        backendDate === frontendDate
      );
    });
<<<<<<< HEAD

    return {
      ...venue,
      isBooked: !!booking,
      booking,
      selectedDay: selectedDay,
      availableTimes: venue.availableTimes || timeSlots[selectedTime]?.label || 'Not Available'
    };
  });

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/bookings");
        setBookings(res.data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [selectedDay, selectedTime, date]);

  // Filter venues based on search criteria
  const filteredVenues = venuesWithBooking.filter((venue) => {
    const matchesSearch =
      !filters.search ||
      venue.name.toLowerCase().includes(filters.search.toLowerCase());

    const matchesCategory =
      filters.category === "all" || 
      venue.category?.toLowerCase() === filters.category.toLowerCase();

    const matchesAvailability =
      filters.availability === "all" ||
      (filters.availability === "available" && !venue.isBooked) ||
      (filters.availability === "unavailable" && venue.isBooked);
=======
    return {
      ...venue,
      isBooked: !!booking,
      booking
    };
  });
  // console.log("venueswithbookings", venuesWithBooking)
  useEffect(() => {
    const bookedVenues = async () => {
      // console.log("1")
      try {
        const res = await axiosInstance.get("/bookings");
        // console.log("ref", res.data)
        setBookings(res.data)
      }
      catch (error) {
        console.error(error);
      } 
    }
    bookedVenues()
  }, []);
  // console.log("",venues)
  const filteredVenues = venuesWithBooking.filter((venue) => {
    const matchesSearch =
      filters.search === "" ||
      venue.name.toLowerCase().includes(filters.search.toLowerCase());

    const matchesCategory =
      filters.category === "all" || venue.category === filters.category;

    const matchesAvailability =
      filters.availability === "all" ||
      (filters.availability === "available" && venue.availableTimes.length > 0) ||
      (filters.availability === "unavailable" && venue.availableTimes.length === 0);
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc

    return matchesSearch && matchesCategory && matchesAvailability;
  });

<<<<<<< HEAD
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Loading Venues...</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="bg-gray-300 h-48"></div>
              <div className="p-5 space-y-3">
                <div className="bg-gray-300 h-6 rounded"></div>
                <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                <div className="bg-gray-300 h-10 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Available Venues
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {selectedDay && selectedTime && timeSlots[selectedTime] 
              ? `${selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)} - ${timeSlots[selectedTime].label}`
              : 'Select day and time to see available venues'
            }
          </p>
        </div>
        
        {filteredVenues.length > 0 && (
          <div className="flex items-center gap-4 text-sm">
            <div className="text-gray-600">
              <span className="font-medium text-gray-800">{filteredVenues.length}</span> venues found
            </div>
            <button
              onClick={refreshVenues}
              className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
=======
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Vacant Venues
        </h2>
        {filteredVenues.length > 0 && (
          <div className="text-sm text-gray-600">
            Showing venues for selected day and time
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc
          </div>
        )}
      </div>

<<<<<<< HEAD
      {/* Venues Grid or Empty State */}
      {filteredVenues.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H7m2 0v-5a2 2 0 012-2h2a2 2 0 012 2v5m-6 0V9a2 2 0 012-2h2a2 2 0 012 2v11M7 7h10" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No venues found</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            {!selectedDay || !selectedTime 
              ? "Please select a day and time slot to view available venues."
              : "No venues match your current search criteria. Try adjusting your filters or selecting a different time slot."
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVenues.map(venue => (
            <VenueCard
              key={venue.id || venue.name}
              venue={venue}
              date={date}
=======
      {filteredVenues.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No vacant venues found for selected day and time.</div>
          <p className="text-gray-400 mt-2">Try selecting a different day or time slot.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVenues?.map(venue => (
            <VenueCard
              key={venue.id}
              venue={venue}
              date={new Date(date).toISOString().split("T")[0]}
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc
              onBookVenue={onBookVenue}
              refreshVenues={refreshVenues}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VenuesList;