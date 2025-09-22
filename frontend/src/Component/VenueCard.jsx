import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../Config/apiconfig';
import { useState } from 'react';
import Loader from './Loader';
<<<<<<< HEAD
import { LogInIcon } from 'lucide-react';
// Import the LoginModal component
import LoginModal from './LoginModal'; // Add this import

const VenueCard = ({ venue, onBookVenue, date, refreshVenues }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
    setMobileMenuOpen(false);
  };

  console.log(venue);

=======


const VenueCard = ({ venue, onBookVenue,date,refreshVenues }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false)
console.log(venue)
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc
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
<<<<<<< HEAD

=======
// console.log(bookedBy)
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc
  const getAvailabilityStatus = () => {
    if (!bookingDetails) {
      return {
        text: 'Available',
<<<<<<< HEAD
        className: 'bg-green-600 text-white',
=======
        className: 'bg-success text-white',
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc
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
<<<<<<< HEAD
    try {
      setLoading(true);
      const res = await axiosInstance.delete(`/bookings`, {
        data: {
          day: venue.selectedDay,
          date: date,
=======
    // console.log(id)
    // console.log(venue)
    try {
      setLoding(true)
      const res = await axiosInstance.delete(`/bookings`, {
        data: {
          day: venue.selectedDay,
          date:date,
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc
          timeSlot: venue.availableTimes,
          venue: venueName
        }
      });
<<<<<<< HEAD
      console.log(res.data.message);
      refreshVenues();
    } catch (error) {
      console.error("Error canceling booking:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden p-8 flex items-center justify-center h-64">
        <Loader />
      </div>
    );
=======
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
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc
  }

  const status = getAvailabilityStatus();

  return (
<<<<<<< HEAD
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
        {/* Venue Image + Status */}
        <div className="relative">
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop';
            }}
          />

          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${status.className} shadow-sm`}>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${status.dotClass}`}></div>
              {status.text}
            </div>
          </div>

          {/* Category badge */}
          {venue.category && (
            <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(venue.category)} shadow-sm`}>
              {venue.category.toUpperCase()}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Venue Name */}
          <div className="mb-3">
            <h2 className="text-lg font-bold text-gray-900 mb-1">{venue.name}</h2>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Capacity: {venue?.capacity || '65'}
              </span>
              {venue.selectedDay && (
                <span className="capitalize font-medium text-blue-600">
                  {venue.selectedDay}
                </span>
              )}
            </div>
          </div>

          {/* Time Slot Info */}
          <div className="mb-4">
            {!bookingDetails ? (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-700">Available Time</span>
                {venue?.availableTimes && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                    {venue.availableTimes}
                  </span>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-red-700">Booked Time</span>
                <span className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">
                  {bookedTime}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col gap-3'>
            {user ? (
              !bookingDetails ? (
                <button
                  onClick={() => onBookVenue(venue)}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-md"
                >
                  Book Now
                </button>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => handleCancelBooking(venue?.booking?.venue)}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                  >
                    {loading ? 'Canceling...' : 'Cancel Booking'}
                  </button>
                  
                  {/* Show who booked */}
                  {bookedBy && (
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-600 mb-1">Booked By</p>
                      <p className="text-sm font-bold text-blue-800">
                        {(bookedBy?.username || bookedBy?.name || 'Unknown User').toUpperCase()}
                      </p>
                    </div>
                  )}
                </div>
              )
            ) : (
              <button
                onClick={openLoginModal}
                className="w-full flex items-center justify-center space-x-3 py-3 px-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <LogInIcon className="h-5 w-5" />
                <span>Login Required to Book</span>
              </button>
            )}
=======
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
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Login Modal - moved outside the card */}
      {loginModalOpen && (
        <LoginModal 
          isOpen={loginModalOpen} 
          onClose={() => setLoginModalOpen(false)} 
        />
      )}
    </>
  );
};

export default VenueCard;
=======
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
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc
