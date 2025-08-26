import VenueCard from './VenueCard';

const VenuesList = ({ filters, onBookVenue, venues }) => {
  // Use passed venues prop instead of redux state
  // console.log("",venues)
  const filteredVenues = venues.filter((venue) => {
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
              onBookVenue={onBookVenue}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VenuesList;