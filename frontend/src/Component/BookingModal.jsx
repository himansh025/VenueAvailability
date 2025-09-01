import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../Config/apiconfig'
import Loader from './Loader';

const BookingModal = ({ venue, date, isOpen, onClose,refreshVenues }) => {
  // console.log(date)
  const [purpose, setPurpose] = useState('');
  const [filteredVenue, setFilteredVenue] = useState(venue); // State for filtered venue
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    setFilteredVenue(venue);
  }, [venue]);


  const handleBooking = async () => {
    if (!venue && !venue.availableTimes || !venue.selectedDay || !venue.name) {
      alert('venue details should not be empty');
      return;
    }
    if (!purpose) {
      alert('purpose should not pe empty')
      return;
    }
    const data = {
      venue:venue.name,
      bookedBy: user.name,
      date: date,
      day: venue.selectedDay,
      timeSlot: venue.availableTimes,
      purpose: purpose
    }
    // console.log(data)

    try {
      setLoading(true)
      const res = await axiosInstance.post(`/bookings`, data);
      // console.log(res.data)
      if (res.data) {
        alert("successfully booked the venue")
        onClose();
      }
      refreshVenues()
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
    finally{
      setLoading(false)

    }
  };

  if (!isOpen) return null;

  if(loading){
    return (
      <Loader/>
    )
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b p-2">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">Book {venue.name}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-2 space-y-3">
          {/* Venue Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold  text-gray-900 mb-2">Venue Details</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Category:</strong> {filteredVenue?.category}</p>
              <p><strong>Capacity:</strong> {filteredVenue?.capacity} people</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Available Times</h3>
            <div className="col-span-full text-center py-2">
              <p className="text-green-500">
                {venue?.availableTimes[0]}
              </p>
            </div>
          </div>
          <div>
            <label htmlFor="purpose" className="block font-semibold text-gray-900 mb-2">
              Purpose of Booking
            </label>
            <textarea
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Please describe the purpose of your booking..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={3}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-3 flex gap-2">

          <button
            onClick={handleBooking}
            className="flex-1 px-4 py-2 bg-blue-400 hover:bg-blue-600 text-white rounded-md transition-colors"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;