
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useState, useRef } from 'react';
import Loader from './Loader';
import { LogInIcon, Calendar, FileText, Share2, MapPin, Clock, Users, ChevronDown } from 'lucide-react';
import html2canvas from 'html2canvas';
import LoginModal from './LoginModal';

const VenueCard = ({ venue, onBookVenue, date, refreshVenues }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState('');

  const cardRef = useRef(null);
  const shareCardRef = useRef(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
    setMobileMenuOpen(false);
  };

  const getCategoryColor = (category) => {
    const colors = {
      lab: 'bg-blue-100 text-blue-800',
      complab: 'bg-gray-100 text-blue-800',
      classroom: 'bg-yellow-100 text-yellow-800',
      seminar: 'bg-red-100 text-red-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const bookingDetails = venue?.booking;
  const bookedBy = bookingDetails?.bookedBy;
  const bookedTime = bookingDetails?.timeSlot;
  const bookingPurpose = bookingDetails?.purpose;

  const getAvailabilityStatus = () => {
    if (!bookingDetails) {
      return {
        text: 'Available',
        className: 'bg-green-600 text-white',
        dotClass: 'bg-green-400',
      };
    }
    return {
      text: 'Booked',
      className: 'bg-red-600 text-white',
      dotClass: 'bg-red-400',
    };
  };

  const handleAddToCalendar = () => {
    try {
      if (!bookingDetails) return;

      const eventTitle = `${venue.name} - ${bookingPurpose || 'Venue Booking'}`;
      const eventDetails = `Venue: ${venue.name}\nCapacity: ${venue?.capacity || '65'}\nBooked by: ${bookedBy?.username || bookedBy?.name || 'Unknown User'}\nPurpose: ${bookingPurpose || 'N/A'}`;
      
      let startTime = '09:00';
      let endTime = '10:00';
      
      if (bookedTime && bookedTime.includes('-')) {
        const times = bookedTime.split('-');
        if (times.length === 2) {
          startTime = times[0].trim();
          endTime = times[1].trim();
        }
      }
      
      const eventDate = date ? new Date(date) : new Date();
      const year = eventDate.getFullYear();
      const month = String(eventDate.getMonth() + 1).padStart(2, '0');
      const day = String(eventDate.getDate()).padStart(2, '0');
      const startTimeFormatted = startTime.replace(':', '');
      const endTimeFormatted = endTime.replace(':', '');
      
      const startDateTime = `${year}${month}${day}T${startTimeFormatted}00`;
      const endDateTime = `${year}${month}${day}T${endTimeFormatted}00`;
      
      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDateTime}/${endDateTime}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(venue.name)}`;
      
      window.open(googleCalendarUrl, '_blank');
    } catch (error) {
      console.error('Error creating calendar event:', error);
      alert('Unable to create calendar event. Please try again.');
    }
  };

  const handleShareVenue = async () => {
    if (!bookingDetails) {
      alert('Only booked venues can be shared');
      return;
    }

    setShareLoading(true);
    try {
      const shareTitle = `${venue.name} - Venue Booking`;
      const shareText = `🏢 Venue: ${venue.name}
 
🏗️ Building: ${venue?.building || 'Main Campus'}
📅 Date: ${new Date(date).toLocaleDateString()}
⏰ Time: ${bookedTime}
🎯 Purpose: ${bookingPurpose || 'Booking'}
👤 Booked By: ${bookedBy?.username || bookedBy?.name ? (bookedBy?.username || bookedBy?.name).toUpperCase() : 'Unknown'}
👥 Capacity: ${venue?.capacity}`;

      // Try native Web Share API first
      if (navigator.share) {
        try {
          await navigator.share({
            title: shareTitle,
            text: shareText
          });
          alert('Venue details shared successfully!');
          setShareLoading(false);
          return;
        } catch (err) {
          if (err.name !== 'AbortError') {
            console.log('Share API failed, trying clipboard...');
          }
        }
      }

      // Fallback: Copy to clipboard
      const textToCopy = `${shareTitle}\n\n${shareText}`;
      try {
        await navigator.clipboard.writeText(textToCopy);
        alert('Venue details copied to clipboard! You can paste and share it anywhere.');
        setShareLoading(false);
        return;
      } catch (err) {
        console.error('Clipboard copy failed:', err);
      }

      // Final fallback
      alert('Share via:\n\n1. WhatsApp\n2. Email\n3. Copy text manually\n\n' + shareText);
      
    } catch (error) {
      console.error('Error in share:', error);
      alert('Error sharing. Please try again.');
    } finally {
      setShareLoading(false);
    }
  };

 const handleCancelBooking = async (venueName) => {
  try {
    setLoading(true);
    
    if (!bookingDetails?._id) {
      alert('Booking information not found');
      return;
    }

    const res = await axiosInstance.delete(`/bookings/${bookingDetails._id}`);
    refreshVenues();
    alert('Booking cancelled successfully');
  } catch (error) {
    console.error('Error canceling booking:', error);
    alert(error.response?.data?.message || 'Cancellation failed');
  } finally {
    setLoading(false);
  }
};

  const handleBookWithPurpose = () => {
    if (selectedPurpose && onBookVenue) {
      onBookVenue(venue, selectedPurpose);
      setShowModal(false);
      setSelectedPurpose('');
    }
  };

  const purposeOptions = [
    'Class',
    'Meeting',
    'Workshop',
    'Seminar',
    'Presentation',
    'Training',
    'Exam',
    'Interview',
    'Conference',
    'Other'
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden p-8 flex items-center justify-center h-64">
        <Loader />
      </div>
    );
  }

  const status = getAvailabilityStatus();

  return (
    <>
      <div ref={cardRef} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
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

          {venue.category && (
            <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(venue.category)} shadow-sm`}>
              {venue.category.toUpperCase()}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 max-h-96 overflow-y-auto">
          {/* Venue Name */}
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900 mb-2">{venue.name}</h2>
            
            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {/* Capacity */}
              <div className="flex items-center gap-2 bg-blue-50 p-2 rounded-lg border border-blue-200">
                <Users className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-600">Capacity</p>
                  <p className="text-sm font-semibold text-blue-800">{venue?.capacity || '65'}</p>
                </div>
              </div>

              {/* Day */}
              {venue.selectedDay && (
                <div className="flex items-center gap-2 bg-purple-50 p-2 rounded-lg border border-purple-200">
                  <Calendar className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-600">Day</p>
                    <p className="text-sm font-semibold text-purple-800 capitalize truncate">{venue.selectedDay}</p>
                  </div>
                </div>
              )}

              {/* Date */}
              {date && (
                <div className="flex items-center gap-2 bg-green-50 p-2 rounded-lg border border-green-200">
                  <Calendar className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-600">Date</p>
                    <p className="text-sm font-semibold text-green-800">{new Date(date).toLocaleDateString()}</p>
                  </div>
                </div>
              )}

              {/* Time Slot */}
              <div className="flex items-center gap-2 bg-orange-50 p-2 rounded-lg border border-orange-200">
                <Clock className="w-4 h-4 text-orange-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-600">Time</p>
                  <p className="text-sm font-semibold text-orange-800 truncate">{venue?.availableTimes}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Purpose Selection Section - Only for available venues when logged in */}
          {!bookingDetails && user && (
            <div className="mb-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-lg p-4">
              <p className="text-sm font-bold text-gray-900 mb-3">Select Purpose:</p>
              <div className="grid grid-cols-2 gap-2 mb-3 max-h-36 overflow-y-auto">
                {purposeOptions.map((purpose) => (
                  <button
                    key={purpose}
                    onClick={() => setSelectedPurpose(purpose)}
                    className={`p-2 rounded-lg font-medium transition-all duration-200 text-xs whitespace-nowrap overflow-hidden text-ellipsis ${
                      selectedPurpose === purpose
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white text-gray-800 hover:bg-blue-100 border border-blue-200'
                    }`}
                  >
                    {purpose}
                  </button>
                ))}
              </div>

              {/* Calendar & Share Buttons */}
              {selectedPurpose && (
                <div className="flex gap-2 pt-3 border-t border-blue-200">
                  <button
                    onClick={handleAddToCalendar}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-3 rounded-lg transition-all transform hover:scale-105 shadow-md text-sm"
                  >
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    Calendar
                  </button>

                  <button
                    onClick={handleShareVenue}
                    disabled={shareLoading}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-2 px-3 rounded-lg transition-all transform hover:scale-105 shadow-md text-sm disabled:cursor-not-allowed"
                  >
                    <Share2 className="w-4 h-4 flex-shrink-0" />
                    {shareLoading ? 'Sharing...' : 'Share'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Dropdown Menu */}
          <div className="relative mb-4">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between py-3 px-4 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 border-2 border-gray-400 text-gray-900 font-medium rounded-lg transition-all duration-200"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-600" />
                More Details
              </span>
              <ChevronDown 
                className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown Content */}
            {dropdownOpen && (
              <div className="mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg p-4 space-y-3">
                
                {/* Building & Room */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-3">
                  <p className="text-xs text-gray-600 font-semibold mb-1">Building & Room</p>
                  <p className="text-sm font-bold text-red-800">{venue?.building || 'Main Campus'} - {venue?.roomNo || '1'}</p>
                </div>

                {/* Purpose Display */}
                {selectedPurpose && (
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-gray-600 font-semibold mb-1">Purpose</p>
                    <p className="text-sm font-bold text-blue-800">{selectedPurpose}</p>
                  </div>
                )}

                {/* Booking Status */}
                {!bookingDetails ? (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm font-bold text-green-700">✓ Available for booking</p>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg p-3 space-y-2">
                    <div>
                      <p className="text-xs text-gray-600 font-semibold">Booked Time</p>
                      <p className="text-sm font-bold text-red-800">{bookedTime}</p>
                    </div>
                    {bookedBy && (
                      <div>
                        <p className="text-xs text-gray-600 font-semibold">Booked By</p>
                        <p className="text-sm font-bold text-red-700">{typeof bookedBy === 'string' ? bookedBy.toUpperCase() : bookedBy.username?.toUpperCase() || bookedBy.name?.toUpperCase()}</p>
                      </div>
                    )}
                    <div className="flex gap-2 pt-3 border-t border-blue-200">
                      <button
                        onClick={handleAddToCalendar}
                        className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-3 rounded-lg transition-all transform hover:scale-105 shadow-md text-sm"
                      >
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        Calendar
                      </button>

                      <button
                        onClick={handleShareVenue}
                        disabled={shareLoading}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-2 px-3 rounded-lg transition-all transform hover:scale-105 shadow-md text-sm disabled:cursor-not-allowed"
                      >
                        <Share2 className="w-4 h-4 flex-shrink-0" />
                        {shareLoading ? 'Sharing...' : 'Share'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Main Action Buttons */}
          <div className="flex flex-col gap-2">
            {user ? (
              !bookingDetails ? (
                <>
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-md"
                  >
                    Book Now
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleCancelBooking(venue?.booking?.venue)}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  {loading ? 'Canceling...' : 'Cancel Booking'}
                </button>
              )
            ) : (
              <button
                onClick={openLoginModal}
                className="w-full flex items-center justify-center space-x-3 py-3 px-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <LogInIcon className="h-5 w-5" />
                <span>Login to Book</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Share Card Screenshot Reference */}
      <div 
        ref={shareCardRef}
        className="hidden bg-white rounded-lg overflow-hidden"
        style={{ width: '600px', height: 'auto' }}
      >
        <div className="p-6 bg-white">
          {/* Header */}
          <div className="mb-4 border-b-2 border-blue-300 pb-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{venue.name}</h1>
            <p className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${status.className}`}>
              {status.text}
            </p>
          </div>

          {/* Venue Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <p className="text-xs text-gray-600 mb-1">Capacity</p>
              <p className="text-lg font-bold text-blue-800">{venue?.capacity}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <p className="text-xs text-gray-600 mb-1">Date</p>
              <p className="text-lg font-bold text-green-800">{new Date(date).toLocaleDateString()}</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
              <p className="text-xs text-gray-600 mb-1">Time</p>
              <p className="text-lg font-bold text-orange-800">{venue?.availableTimes}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
              <p className="text-xs text-gray-600 mb-1">Day</p>
              <p className="text-lg font-bold text-purple-800 capitalize">{venue?.selectedDay}</p>
            </div>
          </div>

          {/* Building & Room */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg border-2 border-red-300 mb-6">
            <p className="text-xs text-gray-600 font-semibold mb-1">📍 Location</p>
            <p className="text-lg font-bold text-red-800">{venue?.building || 'Main Campus'} - Room {venue?.roomNo || 'N/A'}</p>
          </div>

          {/* Purpose */}
          {selectedPurpose && (
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border-2 border-blue-300 mb-6">
              <p className="text-xs text-gray-600 font-semibold mb-1">🎯 Purpose</p>
              <p className="text-lg font-bold text-blue-800">{selectedPurpose}</p>
            </div>
          )}

          {/* Booking Info */}
          {bookingDetails && bookedBy && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg border-2 border-red-300">
              <p className="text-xs text-gray-600 font-semibold mb-2">📋 Booking Details</p>
              <p className="text-sm mb-2"><span className="font-bold">Time:</span> {bookedTime}</p>
              <p className="text-sm"><span className="font-bold">Booked By:</span> {typeof bookedBy === 'string' ? bookedBy.toUpperCase() : bookedBy.username?.toUpperCase() || bookedBy.name?.toUpperCase()}</p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-300 text-center">
            <p className="text-xs text-gray-500">Generated on {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && user && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-in">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Select Purpose for {venue.name}</h3>
            
            {/* Purpose Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4 max-h-64 overflow-y-auto">
              {purposeOptions.map((purpose) => (
                <button
                  key={purpose}
                  onClick={() => setSelectedPurpose(purpose)}
                  className={`p-3 rounded-lg font-medium transition-all duration-200 text-sm ${
                    selectedPurpose === purpose
                      ? 'bg-blue-600 text-white shadow-md scale-105'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {purpose}
                </button>
              ))}
            </div>

            {/* Selected Purpose Display */}
            {selectedPurpose && (
              <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Selected Purpose:</p>
                <p className="text-sm font-bold text-blue-800">{selectedPurpose}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedPurpose('');
                }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
              
              {selectedPurpose && (
                <button
                  onClick={handleBookWithPurpose}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all transform hover:scale-105"
                >
                  Book
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
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