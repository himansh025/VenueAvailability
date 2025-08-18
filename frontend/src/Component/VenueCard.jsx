import React from 'react';

const VenueCard = ({ venue, isLoggedIn, onBookVenue }) => {
  // console.log(isLoggedIn)
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

  const status = getAvailabilityStatus();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-48 object-cover"
        />
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${status.className}`}>
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${status.dotClass}`}></div>
            {status.text}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-900">{venue.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(venue.category)}`}>
            {venue.category}
          </span>
        </div>
        
        <div className="text-sm text-gray-600 mb-4">
          <p>Capacity: {venue.capacity} people</p>
        </div>

        {/* Available Times */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Available Time</h4>
          <div className="flex flex-wrap gap-1">
            {venue.availableTimes.map((time, index) => (
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
        <div className="mb-6">
           {venue.unavailableTimes && venue.unavailableTimes.length > 0 && 
          <h4 className="text-sm font-medium text-gray-900 mb-2">Unavailable Time</h4>}
          <div className="flex flex-wrap gap-1">
         {venue.unavailableTimes && venue.unavailableTimes.length > 0 ? (
  venue.unavailableTimes.map((time, index) => (
    <span
      key={index}
      className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-md"
    >
      {time }
    </span>
  ))
) :null}

          </div>
        </div>

        {/* Book Button */}
        {isLoggedIn ? (
          <button
            onClick={() => onBookVenue(venue)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={venue.availableTimes.length === 0}
          >
            {venue.availableTimes.length === 0 ? 'No Times Available' : 'Book Venue'}
          </button>
        ) : (
          <div className="text-center py-2 px-4 bg-gray-100 rounded-md text-gray-600 text-sm">
            Login required to book
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueCard;