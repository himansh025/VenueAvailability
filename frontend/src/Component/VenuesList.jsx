import VenueCard from './VenueCard';
import { useEffect, useState } from 'react';
import axiosInstance from '../Config/apiconfig';
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
        b.day.toLowerCase() === selectedDay.toLowerCase() &&
        backendDate === frontendDate
      );
    });
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

    return matchesSearch && matchesCategory && matchesAvailability;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Vacant Venues
        </h2>
        {filteredVenues.length > 0 && (
          <div className="text-sm text-gray-600">
            Showing venues for selected day and time
          </div>
        )}
      </div>

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