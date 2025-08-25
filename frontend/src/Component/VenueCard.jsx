import { useSelector } from 'react-redux';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../Config/apiconfig';
import UnavailableSlotsModal from './UnavailableSlotsModal';
const VenueCard = ({ venue, onBookVenue, }) => {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
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

  const hadnleDeleteVenue = () => {

  }
  const hadnleUpdateVenue = () => {

  }
  const handleCancleBooking = async (id) => {
    console.log(id)
    try {
      //  const bookingId = req.params.id;
      const user = req.user.id
      const { date, timeSlot, venueId } = req.body;
      const res = await axiosInstance.get(`/bookings/${id}`, { date, timeSlot, venueId });
      console.log(res.data)
    } catch (error) {
      console.error("Error fetching venues:", error);
    }


  }


  const status = getAvailabilityStatus();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-48 object-cover"
        />
        {user && user.role == "superAdmin" && (
          <div className='absolute top-3 right-1   rounded-full text-xs font-medium'>

            <div className='flex gap-1 items-center'>
              <MdEdit onClick={hadnleUpdateVenue} className='h-5 w-5 bg-amber-50 ' />
              <MdDelete onClick={hadnleDeleteVenue} className='h-5 w-5 bg-amber-50' />

            </div>
          </div>
        )}

        <div className={`absolute top-3 left-3 bg-slate-500 px-2 py-1 rounded-full text-xs font-medium ${status.className}`}>
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
            {venue.category}
          </span>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          <p>Capacity: {venue.capacity} people</p>
        </div>

        {/* Available Times */}
        <div className="mb-4 h-25">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Available Time</h4>
          <div className="flex flex-wrap gap-1">
            {venue?.availableTimes.map((time, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-md"
              >
                {time}
              </span>
            ))}
          </div>
        </div>

        {/* Unavailable Times */}

        <div className="mb-6 ">
      
          <UnavailableSlotsModal
            venue={venue}
            user={user}
            onCancel={(venue, slot) => handleCancleBooking(venue.id, slot)}
          />
          {/* <div className="flex flex-wrap">
            {venue.bookingDetials
              ?.slice(0, showAll ? venue.bookingDetials.length : 1) // show 2 or all
              .map((slot, index) => (
                <div
                  key={index}
                  className="flex gap-2 justify-between my-1 w-max"
                >
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-md">
                    {slot?.timeSlot} : {slot?.bookedBy.bookingName}
                  </span>

                  {slot?.bookedBy?.bookingId === user?.id && (
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white text-xs py-0 px-2 rounded-md"
                      onClick={() => handleCancleBooking(venue.id)}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              ))}

            {venue.bookingDetials?.length > 1 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-blue-500 text-xs ml-2"
              >
                {showAll ? "See Less" : "See More"}
              </button>
            )}
          </div> */}
        </div>

        <div className='flex w-full relative  gap-1 '>

          {user ? (
            <button
              onClick={() => onBookVenue(venue)}
              className=" bg-blue-500  hover:bg-blue-600 text-white font-small py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={venue.availableTimes.length === 0}
            >
              {venue.availableTimes.length === 0 ? 'No Times Available' : 'Book Venue'}
            </button>
          ) : (
            <button className="text-center w-full  bg-red-500 py-2 px-4 rounded-md text-gray-900 text-sm" onClick={(e) => navigate('/login')}>
              Login required to book

            </button>
          )}


        </div>

      </div>
    </div>
  );
};

export default VenueCard;