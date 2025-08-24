import VenueCard from './VenueCard';
import { useSelector } from 'react-redux';

const VenuesList = ({ filters, onBookVenue }) => {
  const { venues } = useSelector(state => state.venue);



  const filteredVenues  = venues.filter((venue) => {
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
          Available Venues ({filteredVenues.length})
        </h2>
      </div>

      {filteredVenues.length == 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No venues found matching your criteria.</div>
          <p className="text-gray-400 mt-2">Try adjusting your search filters.</p>
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