import React, { useState } from "react";

const UnavailableSlotsModal = ({ venue, user, onCancel }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="text-sm text-blue-500 ml-2 mt-7 md:mt-0 underline"
      >
        View Unavailable Slots
      </button>

      {/* Popup Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-xl shadow-lg w-96 max-h-[70vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-3">
              Unavailable Slots
            </h3>

            {venue.bookingDetials?.length > 0 ? (
              venue.bookingDetials.map((slot, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-2"
                >
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-md">
                    {slot?.timeSlot} : {slot?.bookedBy.bookingName}
                  </span>

                  {slot?.bookedBy?.bookingId === user?.id && (
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white text-xs py-0 px-2 rounded-md"
                      onClick={() => onCancel(venue?.id, slot?.timeSlot)}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                No unavailable slots 🚀
              </p>
            )}

            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnavailableSlotsModal;
