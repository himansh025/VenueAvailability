import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../Config/apiconfig';
import { useState } from 'react';
import Loader from './Loader';


const VenueCard = ({ venue, onBookVenue,date,refreshVenues }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false)
console.log(venue)
  const getCategoryColor = (category) => {
    const colors = {
      lab: 'bg-blue-100 text-blue-800',
      complab: 'bg-gray-100 text-blue-800',
      classroom: 'bg-yellow-100 text-yellow-800',
      seminar: 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  // booking info coming from backend
  const bookingDetails = venue?.booking;
  const bookedBy = bookingDetails?.bookedBy;
  const bookedTime = bookingDetails?.timeSlot;
// console.log(bookedBy)
  const getAvailabilityStatus = () => {
    if (!bookingDetails) {
      return {
        text: 'Available',
        className: 'bg-success text-white',
        dotClass: 'bg-green-400'
      };
    }
    return {
      text: 'Booked',
      className: 'bg-red-600 text-white',
      dotClass: 'bg-red-400'
    };
  };

  const handleCancelBooking = async (venueName) => {
    // console.log(id)
    // console.log(venue)
    try {
      setLoding(true)
      const res = await axiosInstance.delete(`/bookings`, {
        data: {
          day: venue.selectedDay,
          date:date,
          timeSlot: venue.availableTimes,
          venue: venueName
        }
      });
      console.log(res.data.message)
      refreshVenues()
    } catch (error) {
      console.error("Error canceling booking:", error);
    }finally{
      setLoding(false)
    }
  };

  if(loading){
    return(
      <Loader/>
    )
  }

  const status = getAvailabilityStatus();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Venue Image + Status */}
      <div className="relative">
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-48 object-cover"
        />

        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${status.className}`}>
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${status.dotClass}`}></div>
            {status.text}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-md font-semibold text-gray-900">{venue.name}</h2>
       
          {venue && (
            <span className={`px-2 py-1 rounded-full text-xs font-small ${getCategoryColor(venue.category)}`}>
              {venue.category.toUpperCase()}
            </span>
          )}
        </div>

        <div className="text-sm flex justify-between text-gray-600 mb-2">
          <p>Capacity: {venue.capacity} people</p>
          {venue.selectedDay && (
            <p>Day: <span className="capitalize font-medium">{venue.selectedDay}</span></p>
          )}
        </div>

        {/* Timeslot / Booking Info */}
        <div className="mb-2 flex justify-between h-5 lg:h-6">
          {!bookingDetails ? (
            <>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Available Time</h4>
              {venue?.availableTimes && (
                <span className="px-2 py-1  bg-green-100 text-green-800 text-xs rounded-md">
                  {venue.availableTimes}
                </span>
              )}
            </>
          ) : (
            <>
              <h4 className="text-sm font-medium text-gray-900 ">Unavailable Time</h4>
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-md">
                {bookedTime}
              </span>
            </>
          )}
        </div>

   

        {/* Action button */}
        <div className='flex flex-col text-sm md:flex-row w-full relative gap-1'>
          {user ? (
            !bookingDetails ? (
              <button
                onClick={() => onBookVenue(venue)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-small py-2 px-4 rounded-md transition-colors"
              >
                Book Now
              </button>
            ) : (
              <button
                onClick={() => handleCancelBooking(venue?.booking?.venue)}
                className=" w-full md:w-max h-12 bg-red-500 hover:bg-red-600 text-white   px-4 rounded-md transition-colors"
              >
                Cancel Booking
              </button>
            )
          ) : (
            <button
              className="text-center w-full bg-gray-500 hover:bg-gray-600 py-2 px-4 rounded-md text-white text-sm transition-colors"
              onClick={() => navigate('/login')}
            >
              Login required to book
            </button>
          )}
               {/* Show who booked */}
        {bookedBy && (
          <p className="flex flex-col w-full h-12 justify-center items-center bg-green-600 rounded-md px-4 text-center  text-gray-700 mb-2  transition-colors">
            <span>Booked By: </span>
            <span className="">{(bookedBy?.username).toUpperCase()}</span>
          </p>
        )}
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
