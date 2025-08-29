import { useSelector } from 'react-redux';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../Config/apiconfig';
// import UnavailableSlotsModal from './UnavailableSlotsModal';

const VenueCard = ({ venue, onBookVenue }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // console.log(venue);

  const getCategoryColor = (category) => {
    const colors = {
      lab: 'bg-blue-100 text-blue-800',
      complab: 'bg-gray-100 text-blue-800',
      classroom: 'bg-yellow-100 text-yellow-800',
      seminar: 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getAvailabilityStatus = () => {
    if (venue.isAvailable) {
      return {
        text: 'Available',
        className: 'bg-success text-white',
        dotClass: 'bg-green-400'
      };
    }
    return {
      text: 'Limited Availability',
      className: 'bg-warning text-white',
      dotClass: 'bg-yellow-400'
    };
  };

  const handleDeleteVenue = () => {
    // Implementation for delete venue
  };

  const handleUpdateVenue = () => {
    // Implementation for update venue
  };

  const handleCancelBooking = async (id) => {
    // console.log(id);
    try {
      const res = await axiosInstance.delete(`/bookings/${id}`, {
        data: {
          date: venue.selectedDay,
          timeSlot: venue.timeSlot,
          venueId: venue.id
        }
      });
      // console.log(res.data);
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  const status = getAvailabilityStatus();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-48 object-cover"
        />
        
        {user && user.role === "superAdmin" && (
          <div className='absolute top-3 right-1 rounded-full text-xs font-medium'>
            <div className='flex gap-1 items-center'>
              <MdEdit 
                onClick={handleUpdateVenue} 
                className='h-5 w-5 bg-amber-50 cursor-pointer hover:bg-amber-100 rounded p-0.5' 
              />
              <MdDelete 
                onClick={handleDeleteVenue} 
                className='h-5 w-5 bg-amber-50 cursor-pointer hover:bg-amber-100 rounded p-0.5' 
              />
            </div>
          </div>
        )}

        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${status.className}`}>
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${status.dotClass}`}></div>
            {status.text}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-lg font-semibold text-gray-900">{venue.name}</h2>
          <span className={`px-2 py-1 rounded-full text-xs font-small ${getCategoryColor(venue.category)}`}>
            {venue.category.toUpperCase()}
          </span>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          <p>Capacity: {venue.capacity} people</p>
          {venue.selectedDay && (
            <p>Day: <span className="capitalize font-medium">{venue.selectedDay}</span></p>
          )}
        </div>

        {/* Available Times */}
        <div className="mb-2 h-15">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Available Time</h4>
         
            {venue?.availableTimes && (
              <span
                className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-md"
              >
                {venue.availableTimes}
              </span>
            )}
        </div>

        {/* Venue Status Badge */}
        <div className="mb-4">
          <div className="flex gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              📍 Vacant Now
            </span>
            {venue.venueType && (
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                venue.venueType === 'lab' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {venue.venueType === 'lab' ? '🔬 Lab' : '📚 Theory'}
              </span>
            )}
          </div>
        </div>

        {/* Unavailable Times Modal - Only show if there are booked slots */}
        {venue.bookedSlots && venue.bookedSlots.length > 0 && (
          <div className="mb-6">
            <UnavailableSlotsModal
              venue={venue}
              user={user}
              onCancel={(venue, slot) => handleCancelBooking(venue.id, slot)}
            />
          </div>
        )}

        <div className='flex w-full relative gap-1'>
          {user ? (
            <button
              onClick={() => onBookVenue(venue)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-small py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={venue.availableTimes.length === 0}
            >
              {venue.availableTimes.length === 0 ? 'No Times Available' : 'Book Venue'}
            </button>
          ) : (
            <button 
              className="text-center w-full bg-red-500 hover:bg-red-600 py-2 px-4 rounded-md text-white text-sm transition-colors" 
              onClick={(e) => navigate('/login')}
            >
              Login required to book
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VenueCard;