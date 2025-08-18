import React, { useState } from 'react';
import MyCalendar from './MyCalender';

const BookingModal = ({ venue, isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [purpose, setPurpose] = useState('');
  console.log(selectedDate)

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !purpose) {
      alert('Please fill in all fields');
      return;
    }

    alert(`Venue booked successfully!\n\nVenue: ${venue.name}\nDate: ${selectedDate}\nTime: ${selectedTime}\nPurpose: ${purpose}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Book {venue.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Venue Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Venue Details</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Category:</strong> {venue.category}</p>
              <p><strong>Capacity:</strong> {venue.capacity} people</p>
            </div>
          </div>

          {/* Calendar */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Select Date</h3>
        <MyCalendar onDateChange={handleDateChange} />
            <div className="grid grid-cols-7 gap-2">
            
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Available Times</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {venue.availableTimes.map((time, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 text-sm font-medium rounded-md border transition-colors ${
                    selectedTime === time
                      ? 'bg-success text-white border-success'
                      : 'bg-green-50 hover:bg-green-100 border-green-200 text-green-800'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Purpose */}
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

          {/* Booking Summary */}
          {selectedDate && selectedTime && (
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Booking Summary</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Venue:</strong> {venue.name}</p>
                <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {selectedTime}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleBooking}
            className="flex-1 px-4 py-2 bg-primary hover:bg-secondary text-white rounded-md transition-colors"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;