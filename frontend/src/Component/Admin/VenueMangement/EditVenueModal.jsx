import React from "react";

const EditVenueModal = ({ editingItem, setEditingItem, venueTypes, onSubmit, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Edit Venue</h2>
      <form onSubmit={onSubmit}>
        <div className="space-y-4">
          <input
            type="text"
            value={editingItem.name}
            onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
          <input
            type="text"
            value={editingItem.location}
            onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
          <input
            type="number"
            value={editingItem.capacity}
            onChange={(e) => setEditingItem({ ...editingItem, capacity: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
          <select
            value={editingItem.type}
            onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          >
            {venueTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-3 mt-6">
          <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
            Update Venue
          </button>
          <button type="button" onClick={onClose} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded-lg">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default EditVenueModal;
