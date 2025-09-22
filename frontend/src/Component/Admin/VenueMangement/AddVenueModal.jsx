import React from 'react';
import axiosInstance from "../../../Config/apiconfig";
import { useDispatch } from 'react-redux';
import { setVenues } from '../../../Store/slicer';

const AddVenueModal = ({ venueTypes, newVenue, setNewVenue, onSubmit, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Add New Venue</h2>
      <form onSubmit={onSubmit}>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Venue Name"
            value={newVenue.name}
            onChange={(e) => setNewVenue({ ...newVenue, name: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={newVenue.location}
            onChange={(e) => setNewVenue({ ...newVenue, location: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
          <input
            type="number"
            placeholder="Capacity"
            value={newVenue.capacity}
            onChange={(e) => setNewVenue({ ...newVenue, capacity: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
          <select
            value={newVenue.type}
            onChange={(e) => setNewVenue({ ...newVenue, type: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          >
            <option value="">Select Type</option>
            {venueTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-3 mt-6">
          <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
            Add Venue
          </button>
          <button type="button" onClick={onClose} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded-lg">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default AddVenueModal;
